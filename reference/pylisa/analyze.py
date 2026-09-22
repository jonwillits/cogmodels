"""Summarize a harness JSON: best object/prop mappings per run from analog A to analog B, plus timing stats."""
import json, sys, statistics
path, A, B = sys.argv[1], sys.argv[2], sys.argv[3]
types = sys.argv[4].split(',') if len(sys.argv) > 4 else ['Obj']
d = json.load(open(path))
def best(r, t):
    out = {}
    for x in r['mappings']:
        if x['type'] != t: continue
        if x['from'] == A and x['to'] == B: u, v = x['fromUnit'], x['toUnit']
        elif x['from'] == B and x['to'] == A: u, v = x['toUnit'], x['fromUnit']
        else: continue
        if u not in out or x['weight'] > out[u][1]: out[u] = (v, x['weight'])
    return out
for r in d['results']:
    line = ' '.join(f"{t}:{{{', '.join(f'{u}->{v}({w:.3f})' for u,(v,w) in sorted(best(r,t).items()))}}}" for t in types)
    print(f"run {r['run']:2d}  {line}")
tds = [x['topDownAt'] for r in d['results'] for x in r['records']]
rounds = [x['settleRounds'] for r in d['results'] for x in r['records'] if x['settleRounds'] is not None]
print(f"topDownAt mean {statistics.mean(tds):.0f} min {min(tds)} max {max(tds)}; settle rounds mean {statistics.mean(rounds) if rounds else float('nan'):.0f}")
inf = [i for r in d['results'] for i in r['inferred']]
if inf: print("inferred (run 1):", json.dumps(d['results'][0]['inferred']))
