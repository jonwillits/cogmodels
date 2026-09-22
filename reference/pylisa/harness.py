"""
Headless driver around a Python 3 conversion of John Hummel's Python LISA 1.00
(spec §9.3). The six model modules here are his, converted with fissix and
patched in two marked places (grep HARNESS). This file reimplements the run
loop of his LISA.py without pygame, seeds the random stream, and writes JSON.

    python3 harness.py --sym DATA/lovetri/lovetri9.sym --preset Hummel2007 --runs 10 --seed 1

Presets mirror src/models/lisa/engine/presets.ts for the parameters his code
exposes. The random streams differ from the TypeScript engine's, so traces
never match draw for draw; distributions over runs should.
"""
import argparse
import io
import json
import os
import random
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import dataTypes  # noqa: E402
import build  # noqa: E402
import hebbs  # noqa: E402
import runLISA  # noqa: E402

PRESETS = {
    # The code as run for the 2007 batch outputs: default suite + pre-2015 dangerous defaults.
    'Hummel2007': dict(vers142_map_alg=True, hebb_learning_rate=1.0, recip_inhibition=1.0,
                       out_prop_prop_to_sp=-1.0, out_prop_sp_to_pred=-1.0, out_prop_sp_to_obj=-1.0),
    # His "H&H 03 Parameter Suite" (parameters.py option 50).
    'HummelSuite03': dict(vers142_map_alg=False, hebb_learning_rate=0.9, recip_inhibition=1.0,
                          out_prop_prop_to_sp=-1.0, out_prop_sp_to_pred=-1.0, out_prop_sp_to_obj=-1.0),
    # The defaults as the file reads today (changed 2/13/15).
    'Hummel2015': dict(vers142_map_alg=True, hebb_learning_rate=1.0, recip_inhibition=0.5,
                       out_prop_prop_to_sp=-0.5, out_prop_sp_to_pred=-0.5, out_prop_sp_to_obj=-0.5),
}


def apply_preset(name):
    dataTypes.god_like_wm = False
    dataTypes.semantic_noise = 0.0
    dataTypes.semantic_death = 0.0
    dataTypes.attention = 1.0
    dataTypes.driver_inhibition = 1.0
    dataTypes.bail_upon_settling = False
    dataTypes.min_sti = 1.0
    dataTypes.max_sti = 3.0
    dataTypes.dsti_dt = -0.0015
    for k, v in PRESETS[name].items():
        setattr(dataTypes, k, v)


def reset_memory():
    dataTypes.analog = []
    dataTypes.sequence = []
    dataTypes.pred_semantic = []
    dataTypes.obj_semantic = []
    dataTypes.group_semantic = []
    dataTypes.hebb_unit = []


def read_sym(path):
    """build.read_file wants data_directory + file_path + file_name + '.sym'."""
    d, f = os.path.split(os.path.abspath(path))
    assert f.endswith('.sym')
    dataTypes.data_directory = ''
    dataTypes.file_path = d + os.sep
    dataTypes.file_name = f[:-4]
    dataTypes.out_file = io.StringIO()
    dataTypes.out_file_open = True
    build.read_file(dataTypes.file_name, '1.00', 'harness')


def init_simulation():
    return {
        'analogs': dataTypes.analog, 'obj_sem': dataTypes.obj_semantic, 'pred_sem': dataTypes.pred_semantic,
        'group_sem': dataTypes.group_semantic, 'sequence': None, 'sequence_index': 0,
        'hebb_units': dataTypes.hebb_unit, 'iteration': 0, 'phase_iteration': 0, 'pause': False,
        'use_graphics': False, 'driver': [], 'recip': [], 'dormant': [],
        'phase_set': {'groups': [], 'props': [], 'sps': [], 'preds': [], 'objs': [], 'child_props': [], 'objs&childs': []},
        'global_inhibition': 0, 'simulation_complete': False, 'terminate_simulation': False,
        'top_down_ok': False, 'iterations_settled': 0, 'gr_refresh_rate': 1,
    }


def dispose_inferred(unit_list):
    while unit_list and unit_list[-1].inferred:
        unit_list.pop()


def dispose_inferred_structures():
    dataTypes.hebb_unit = []
    for analog in dataTypes.analog:
        for lst in (analog.group, analog.prop, analog.sp, analog.pred, analog.obj):
            for unit in lst:
                for hs in unit.hebb_set:
                    hs.hebbs = []
                    hs.max_hebb = 0
        for lst in (analog.group, analog.prop, analog.sp, analog.pred, analog.obj):
            dispose_inferred(lst)


def unit_type(u):
    return {dataTypes.PropUnit: 'P', dataTypes.SPUnit: 'SP', dataTypes.OPUnit: None, dataTypes.GroupUnit: 'Group'}[type(u)] or u.type


def mapping_table(simulation):
    """Every connection with weight > 0, from each analog to each other analog."""
    out = []
    for h in simulation['hebb_units']:
        if h.weight > 0:
            a, b = h.owners
            out.append({'from': a.analog.name, 'fromUnit': a.name, 'to': b.analog.name, 'toUnit': b.name,
                        'type': unit_type(a), 'weight': round(h.weight, 4)})
    return out


def inferred_units(simulation):
    out = []
    for analog in simulation['analogs']:
        for prop in analog.prop:
            if prop.inferred:
                sps = []
                for sp in prop.SPs:
                    arg = sp.obj.name if sp.obj is not None else (sp.child_prop.name if sp.child_prop is not None else None)
                    sps.append({'pred': sp.pred.name if sp.pred else None, 'arg': arg})
                out.append({'analog': analog.name, 'type': 'P', 'name': prop.name, 'sps': sps})
        for lst in (analog.pred, analog.obj):
            for u in lst:
                if u.inferred:
                    out.append({'analog': analog.name, 'type': u.type, 'name': u.name,
                                'semantics': {l.unit.name: round(l.weight, 3) for l in u.semantic if l.weight >= 0.1}})
    return out


def run_once(simulation):
    """LISA.run() without graphics or file output, with per-phase-set instrumentation."""
    import ssLearn  # noqa: F401  (imported by runLISA)
    hebbs.set_up_mapping_lists(simulation)
    for analog in dataTypes.analog:
        for prop in analog.prop:
            prop.readiness = dataTypes.max_prop_readiness
        runLISA.update_prop_priorities(analog, None)

    records = []
    for sequence_element in dataTypes.sequence:
        simulation['sequence'] = sequence_element
        simulation['sequence_index'] = sequence_element.index
        simulation['driver'] = sequence_element.driver
        simulation['recip'] = sequence_element.recip
        simulation['dormant'] = [a for a in simulation['analogs']
                                 if not (a is simulation['driver'] or a in simulation['recip'])]
        ps = simulation['phase_set']
        for k in ps:
            ps[k] = []
        if sequence_element.control == 'random':
            n = int(sequence_element.phase_set[0])
            for _ in range(n):
                prop = runLISA.random_prop_select(simulation['driver'], None)
                ps['props'].append(prop)
                runLISA.update_prop_priorities(simulation['driver'], prop)
        elif sequence_element.control == 'props':
            for prop in sequence_element.phase_set:
                ps['props'].append(prop)
                runLISA.update_prop_priorities(simulation['driver'], prop)
        else:
            raise SystemExit('group-based firing is not supported by the harness')
        for prop in ps['props']:
            for sp in prop.SPs:
                ps['sps'].append(sp)
        for sp in ps['sps']:
            if sp.pred not in ps['preds']:
                ps['preds'].append(sp.pred)
        for sp in ps['sps']:
            if sp.obj is not None:
                if sp.obj not in ps['objs']:
                    ps['objs'].append(sp.obj)
                if sp.obj not in ps['objs&childs']:
                    ps['objs&childs'].append(sp.obj)
        for sp in ps['sps']:
            if sp.child_prop is not None:
                if sp.child_prop not in ps['child_props']:
                    ps['child_props'].append(sp.child_prop)
                if sp.child_prop not in ps['objs&childs']:
                    ps['objs&childs'].append(sp.child_prop)
        ps_duration = 0
        for sp in ps['sps']:
            ps_duration += dataTypes.phase_duration * 3 if dataTypes.god_like_wm else dataTypes.iterations_per_sp

        runLISA.init_network_state(simulation)
        for key in ('groups', 'props', 'sps', 'preds', 'objs', 'child_props'):
            for u in ps[key]:
                u.retrieved = True
        if not dataTypes.god_like_wm:
            for sp in ps['sps']:
                sp.sti = dataTypes.min_sti + random.random() * (dataTypes.max_sti - dataTypes.min_sti)

        simulation['phase_iteration'] = 0
        td_at = -1
        firings = {sp.name: 0 for sp in ps['sps']}
        was_on = {sp.name: False for sp in ps['sps']}
        for iteration in range(ps_duration):
            runLISA.update_network(simulation)
            simulation['iteration'] = iteration
            if td_at < 0 and simulation['top_down_ok']:
                td_at = iteration + 1
            for sp in ps['sps']:
                on = sp.act > 0.5
                if on and not was_on[sp.name]:
                    firings[sp.name] += 1
                was_on[sp.name] = on

        rounds_before = len(hebbs.hebbs_settle_rounds)
        if sequence_element.update_hebbs:
            if dataTypes.vers142_map_alg:
                hebbs.vers142_update_hebb_weights(simulation)
            else:
                hebbs.original_update_hebb_weights(simulation)
        rounds = hebbs.hebbs_settle_rounds[-1] if len(hebbs.hebbs_settle_rounds) > rounds_before else None
        runLISA.spread_support_to_recipients(ps['props'], simulation['recip'])
        quality = None
        if sequence_element.sslearn == 0:
            hebbs.assess_mapping_quality(simulation)
            quality = {}
            for analog in simulation['recip']:
                for mq in analog.mapping_quality:
                    if mq.unit == simulation['driver']:
                        analog.ready_to_learn = (mq.weight >= dataTypes.ssl_threshold)
                        quality[analog.name] = round(mq.weight, 4)
        records.append({
            'index': sequence_element.index,
            'driver': sequence_element.driver.name,
            'recips': [a.name for a in sequence_element.recip],
            'props': [p.name for p in ps['props']],
            'updateMapping': bool(sequence_element.update_hebbs),
            'topDownAt': td_at,
            'firings': firings,
            'timesFired': {sp.name: sp.times_fired for sp in ps['sps']},
            'settleRounds': rounds,
            'mappingQuality': quality,
        })
    return records


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--sym', required=True)
    ap.add_argument('--preset', default='Hummel2007', choices=sorted(PRESETS))
    ap.add_argument('--runs', type=int, default=10)
    ap.add_argument('--seed', type=int, default=1)
    ap.add_argument('--out', default='-')
    args = ap.parse_args()

    # Silence the model's own prints; keep ours.
    real_stdout = sys.stdout
    sys.stdout = io.StringIO()
    try:
        reset_memory()
        apply_preset(args.preset)
        read_sym(args.sym)  # may set parameters from the file's Parameters block
        results = []
        for i in range(args.runs):
            random.seed(args.seed + i)
            simulation = init_simulation()
            records = run_once(simulation)
            results.append({'run': i + 1, 'seed': args.seed + i, 'records': records,
                            'mappings': mapping_table(simulation), 'inferred': inferred_units(simulation)})
            dispose_inferred_structures()
            if dataTypes.semantic_death > 0:
                for analog in simulation['analogs']:
                    for lst in (analog.pred, analog.obj):
                        for u in lst:
                            for link in u.semantic:
                                link.weight = 1
    finally:
        sys.stdout = real_stdout
    doc = {'sym': args.sym, 'preset': args.preset, 'runs': args.runs, 'firstSeed': args.seed, 'results': results}
    text = json.dumps(doc, indent=1)
    if args.out == '-':
        print(text)
    else:
        with open(args.out, 'w') as f:
            f.write(text)
        print(f'wrote {args.out}')


if __name__ == '__main__':
    main()
