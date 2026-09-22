# hebbs.py: all things having to do with hebbs

import dataTypes

# HARNESS: settle_hebb_activations appends its round count here
hebbs_settle_rounds = []

def create_hebbs(r_unit, data_type, phase_set, master_hebb_list):
    # creates hebbs for a newly-retrieved recip unit to all units of the same type
    # in the phase set, adds it to both units' hebb sets and adds it to the
    # master list of hebbs.  The method add_hebb(unit) on HebbSet already checks to see
    # whether the hebb already exists before creating it, so this function does not
    # need to do that.  When called, this function returns the hebb (in the r_unit's hebb set)
    # if it creates one or returns None if the hebb already existed

    # first order of business: figure out which set of units in the driver to iterate through
    # in aid of this create instance and init the proxy list

    unit_list = []
    if data_type == 'Group':
        # unit_list = phase_set['groups']
        for group in phase_set['groups']:
            unit_list.append(group)
    elif data_type == 'Prop':
        # unit_list == phase_set['props']
        for prop in phase_set['props']:
            unit_list.append(prop)
    elif data_type == 'SP':
        # unit_list == phase_set['sps']
        for sp in phase_set['sps']:
            unit_list.append(sp)
    elif data_type == 'Pred':
        for sp in phase_set['sps']:
            if not(sp.pred in unit_list):
                unit_list.append(sp.pred)
    elif data_type == 'Obj':
        for sp in phase_set['sps']:
            if not(sp.obj == None):
                if not(sp.obj in unit_list):
                    unit_list.append(sp.obj)
    elif data_type == 'Child':
        for sp in phase_set['sps']:
            if not(sp.child_prop == None):
                if not(sp.child_prop in unit_list):
                    unit_list.append(sp.child_prop)
    # at this point, unit_list should contain all and only those units for which it is
    # necessary to consider making a hebb for the r_unit.  And remember: if you need to
    # create a hebb for the r_unit, then you also need to create the hebb for the driver
    # unit and create one new master hebb linking the recipient and driver units.
    # So: Iterate through that unt_list and check:
    for d_unit in unit_list:
        # find the phase set on the r_unit that corresponds to the driver
        for r_hebb_set in r_unit.hebb_set:
            if r_hebb_set.target == d_unit.analog:
               # DIAG
               # print 'creatng hebb from',r_unit.name,'in',r_unit.analog.name,'to',d_unit.name,'in',d_unit.analog.name
               
               new_h_unit = r_hebb_set.add_hebb(d_unit, None) # none is for HebbUnit,
               # which does not yet exist.  It will be Returned by add_hebb() for use below.
               # Recall that if the hebb already exists, then new_hebb() will return None
               if not(new_h_unit == None):
                   # then make a new hebb for the d_unit pointing to the same new_h_unit.
                   # Iterate through the driver units' hebb sets till you find the
                   # one corresponding to the r_unit
                   for d_hebb_set in d_unit.hebb_set:
                       if d_hebb_set.target == r_unit.analog:
                           # DIAG
                           # print 'creatng hebb from',d_unit.name,'in',d_unit.analog.name,'to',r_unit.name,'in',r_unit.analog.name
                           d_hebb_set.add_hebb(r_unit, new_h_unit)

def update_hebb_buffers(master_hebb_list):
    # update hebb buffers based on the hebbs' owners' instantaneous activations
    # one virtue of this function is that it operates through the master hebb list,
    #   thereby bypassing the analogs altogether, making it Fast
    # it only updates the buffer if both its units are tagged as retrieved, so Make Sure
    #   units in the phase set are tagged as retrieved
    for h_unit in master_hebb_list:
        if h_unit.owners[0].retrieved and h_unit.owners[1].retrieved:
            h_unit.buffer += h_unit.owners[0].act * h_unit.owners[1].act

def find_these_inconsistent_hebbs(hebb_set):
    # for all the hebbs in a single phase set: lists each as inconsistent with the others
    for hebb1 in hebb_set.hebbs:
        for hebb2 in hebb_set.hebbs:
            if not(hebb1 == hebb2):
                # they are inconsistent: add hebb2 to hebb1's inconsistent list
                hebb1.h_unit.inconsistent_hebbs.append(hebb2.h_unit)

# NOTE: As of 4/29, these functions Appear to be working

def check_group_group_consistency(hebb1, hebb2):
    # checks to see whether group1 hebb is consistent with group2 hebb
    # the rule: group hebb 1 is consistent with group hebb 2 IFF:
    #  (1) the groups that own hebb1 are members of the groups that own the hebb2
    #      ('vertical' consistency)
    #   -- or --
    #  (2) their owners are owned by the same group AND they (the hebbs) are not owned by the same groups
    #      do the "not connected to the same groups" check first (outer)
    #      (SP-like 'horizontal' consistency)
    
    vertical_match = False # will be set to true if vertical consistency detected
    horizontal_match = False # will be set to trur=e if horizontal match detected
    consistent = False # will be set to true if either of the above is true
    
    if hebb1.owners[0] != hebb2.owners[0] and hebb1.owners[1] != hebb2.owners[0] \
       and hebb1.owners[0] != hebb2.owners[1] and hebb1.owners[1] != hebb2.owners[1]:
        # What is the above check for?  To make sure the two hebbs dont have
        #   a shared unit on either end.
        # horizontal match: connected units are children of common parents (i.e., siblings)
        
        # first check to see that all owners have parents...
        if hebb1.owners[0].parent and hebb1.owners[1].parent and hebb2.owners[0].parent and hebb2.owners[1].parent:
            if hebb1.owners[0].parent == hebb2.owners[0].parent and hebb1.owners[1].parent == hebb2.owners[1].parent:
                horizontal_match = True
            elif hebb1.owners[0].parent == hebb2.owners[1].parent and hebb1.owners[1].parent == hebb2.owners[0].parent:
                horizontal_match = True

        if hebb1.owners[0] in hebb2.owners[0].group and hebb1.owners[1] in hebb2.owners[1].group:
            vertical_match = True
        elif hebb1.owners[1] in hebb2.owners[0].group and hebb1.owners[0] in hebb2.owners[1].group:
            vertical_match = True
        elif hebb2.owners[0] in hebb1.owners[0].group and hebb2.owners[1] in hebb1.owners[1].group:
            vertical_match = True
        elif hebb2.owners[1] in hebb1.owners[0].group and hebb2.owners[0] in hebb1.owners[1].group:
            vertical_match = True

    # HERE 3/4/11: this is incomplete, as it only connects the hebbs of groups to those of their siblings (like SPs), not their parents
    # 3/29/11: I think it's now done!
    consistent = vertical_match or horizontal_match
    
    if consistent:
        # add each hebb to the other's consistent list
        hebb1.consistent_hebbs.append(hebb2)
        hebb2.consistent_hebbs.append(hebb1)
    
def check_group_prop_consistency(group_hebb, prop_hebb):
    # checks to see whether group hebb is consistent with prop hebb
    # the rule: a prop hebb is consistent with a group hebb IFF:
    #   the props that own the prop hebb are members of the groups that own the group hebb
    if prop_hebb.owners[0] in group_hebb.owners[0].prop and prop_hebb.owners[1] in group_hebb.owners[1].prop:
        consistent = True
    elif prop_hebb.owners[0] in group_hebb.owners[1].prop and prop_hebb.owners[1] in group_hebb.owners[0].prop:
        consistent = True
    else:
        consistent = False
    if consistent:
        # add each hebb to the other's consistent list
        group_hebb.consistent_hebbs.append(prop_hebb)
        prop_hebb.consistent_hebbs.append(group_hebb)

def check_prop_sp_consistency(prop_hebb, sp_hebb):
    # checks to see whether prop hebb consistent with sp hebb
    # the rule: an sp hebb is consistent with a prop hebb IFF:
    #   the sps that own the sp hebb are members of the props that own the prop hebb
    # OR: the prop is a child of the sp
    # check both cases
    # (1) the prop is the parent
    if sp_hebb.owners[0] in prop_hebb.owners[0].SPs and sp_hebb.owners[1] in prop_hebb.owners[1].SPs:
        consistent = True
    elif sp_hebb.owners[0] in prop_hebb.owners[1].SPs and sp_hebb.owners[1] in prop_hebb.owners[0].SPs:
        consistent = True
    # (2) the sp is the parent
    elif prop_hebb.owners[0] == sp_hebb.owners[0].child_prop and prop_hebb.owners[1] == sp_hebb.owners[1].child_prop:
        consistent = True
    elif prop_hebb.owners[0] == sp_hebb.owners[1].child_prop and prop_hebb.owners[1] == sp_hebb.owners[0].child_prop:
        consistent = True
    else:
        consistent = False
    if consistent:
        # add each hebb to the other's consistent list
        # NOTE: Following the Pascal LISA (vers142) sp-->prop has twice the influence of
        #       all other consistent hebbs...
        prop_hebb.consistent_hebbs.append(sp_hebb)
        prop_hebb.consistent_hebbs.append(sp_hebb) #...that's why we add two copies
        sp_hebb.consistent_hebbs.append(prop_hebb)

def check_sp_sp_consistency(hebb1, hebb2):
    # checks to see whether sp hebbs are consistent
    # the rule: twp sp hebbs are consistent IFF:
    #   their owner's are owned by the same props AND.. (what?)...
    # 1.1 <-> 1.1 is consistent with 1.2 <-> 1.2 but not with 1.1 <-> 1.2
    # OH!  ...AND they (the hebbs) are not owned by the same sps
    # do the "not connected to the same SPs" check first (outer)
    if hebb1.owners[0] != hebb2.owners[0] and hebb1.owners[1] != hebb2.owners[0] and hebb1.owners[0] != hebb2.owners[1] and hebb1.owners[1] != hebb2.owners[1]:
        if hebb1.owners[0].parent_prop == hebb2.owners[0].parent_prop and hebb1.owners[1].parent_prop == hebb2.owners[1].parent_prop:
            consistent = True
        elif hebb1.owners[0].parent_prop == hebb2.owners[1].parent_prop and hebb1.owners[1].parent_prop == hebb2.owners[0].parent_prop:
            consistent = True
        else:
            consistent = False
    else:
        consistent = False
    if consistent:
        # add each hebb to the other's consistent list
        hebb1.consistent_hebbs.append(hebb2)
        hebb2.consistent_hebbs.append(hebb1)

def check_sp_op_consistency(sp_hebb, op_hebb):
    # checks to see whether sp hebb consistent with op hebb
    # the rule: an op hebb is consistent with an sp hebb IFF:
    #   the ops that own the op hebb are members of the sps that own the sp hebb
    # the op could be either a pred or an obj, so check both fields of the sp
    # (1) the pred field
    if op_hebb.owners[0] == sp_hebb.owners[0].pred and op_hebb.owners[1] == sp_hebb.owners[1].pred:
        consistent = True
    elif op_hebb.owners[0] == sp_hebb.owners[1].pred and op_hebb.owners[1] == sp_hebb.owners[0].pred:
        consistent = True
    # (2) the obj field
    elif op_hebb.owners[0] == sp_hebb.owners[0].obj and op_hebb.owners[1] == sp_hebb.owners[1].obj:
        consistent = True
    elif op_hebb.owners[0] == sp_hebb.owners[1].obj and op_hebb.owners[1] == sp_hebb.owners[0].obj:
        consistent = True
    else:
        consistent = False
    if consistent:
        # add each hebb to the other's consistent list
        # add the bottom up, op_hebb --> sp_hebb twice
        sp_hebb.consistent_hebbs.append(op_hebb)
        sp_hebb.consistent_hebbs.append(op_hebb)
        op_hebb.consistent_hebbs.append(sp_hebb)


def check_this_pair_of_hebbs(hebb1, hebb2):
    # checks to see whether hebb1 and hebb2 are consistent:
    # All hebbs exhibiting local parallel connectivity are consistent 
    #     (e.g., hebb from P1 to P1 consistent w/ hebb
    #     from sp1.1 to sp1.1, sp1.1 to sp1.2, sp1.2 to sp1.1, and sp1.2 to sp1.2)
    
    # (1) check to see that hebb1 and hebb2 reside at adjacent levels of the hierarchy:
    #     If they don't then just bail
    # consistent pairs include...
    # (1.01) groups & props
    if (type(hebb1.owners[0]) == dataTypes.GroupUnit) and (type(hebb2.owners[0]) == dataTypes.PropUnit):
        check_group_prop_consistency(hebb1, hebb2)
    elif (type(hebb2.owners[0]) == dataTypes.GroupUnit) and (type(hebb1.owners[0]) == dataTypes.PropUnit):
        check_group_prop_consistency(hebb2, hebb1)
    # (1.02) props & sps
    elif (type(hebb1.owners[0]) == dataTypes.PropUnit) and (type(hebb2.owners[0]) == dataTypes.SPUnit):
        check_prop_sp_consistency(hebb1, hebb2)
    elif (type(hebb2.owners[0]) == dataTypes.PropUnit) and (type(hebb1.owners[0]) == dataTypes.SPUnit):
        check_prop_sp_consistency(hebb2, hebb1)
    # (1.03) sps & sps (new (I think) 5/1/07
    elif (type(hebb1.owners[0]) == dataTypes.SPUnit) and (type(hebb2.owners[0]) == dataTypes.SPUnit):
        check_sp_sp_consistency(hebb1, hebb2)
    # (1.04) sps & ops
    elif (type(hebb1.owners[0]) == dataTypes.SPUnit) and (type(hebb2.owners[0]) == dataTypes.OPUnit):
        check_sp_op_consistency(hebb1, hebb2)
    elif (type(hebb2.owners[0]) == dataTypes.SPUnit) and (type(hebb1.owners[0]) == dataTypes.OPUnit):
        check_sp_op_consistency(hebb2, hebb1)
    # (1.05) groups and groups (NEW 3/4/11)
    elif (type(hebb1.owners[0]) == dataTypes.GroupUnit) and (type(hebb2.owners[0]) == dataTypes.GroupUnit):
        check_group_group_consistency(hebb1, hebb2)

def find_inconsistent_hebbs(simulation):    
    # (1) make a list, active_memory, of all analogs in active memory: driver and all recips
    #     it is this list of analogs you'll iterate through in all these operations
    active_memory = []
    active_memory.append(simulation['driver'])
    for analog in simulation['recip']:
        active_memory.append(analog)

    # (2) The easy part: The hebbs' inconsistent_hebbs lists: All hebbs in the same
    #     "row" or "column" of the matrix are inconsistent
    for analog in active_memory:
        # groups
        for group in analog.group:
            if group.retrieved:
                for hebb_set in group.hebb_set:
                    find_these_inconsistent_hebbs(hebb_set)
        # props
        for prop in analog.prop:
            if prop.retrieved:
                for hebb_set in prop.hebb_set:
                    find_these_inconsistent_hebbs(hebb_set)
        # sps
        for sp in analog.sp:
            if sp.retrieved:
                for hebb_set in sp.hebb_set:
                    find_these_inconsistent_hebbs(hebb_set)
        # preds
        for pred in analog.pred:
            if pred.retrieved:
                for hebb_set in pred.hebb_set:
                    find_these_inconsistent_hebbs(hebb_set)
        # objs
        for obj in analog.obj:
            if obj.retrieved:
                for hebb_set in obj.hebb_set:
                    find_these_inconsistent_hebbs(hebb_set)

def set_up_hebb_interconnections(simulation, retrieved_hebbs):
    # this function goes through all retrieved hebbs and adds them
    #   to one-anothers' consistent- and inconsistent-hebb lists in preparation
    #   for running the new(ish) (collin and john) hebb settlng algorithm (the one
    #   that distinguishes vers 142 from, sat, vers 120).
    # this is that very hairy function that, in the pascal code, uses "find consistent hebbs"
    # this function is called Once per updating of the mapping connections, at the beginning
    #   before the hebbs start passing excittion and inhibition to one another
    #
    # (1) Init all hebbs' consistent and inconsistent lists to empty
    #     (do this for all hebbs, retriebed or not)
    for hebb in simulation['hebb_units']:
        hebb.consistent_hebbs = []
        hebb.inconsistent_hebbs = []

    # (2) find inconsistent hebbs
    find_inconsistent_hebbs(simulation)
    

    # (3) The hard part: Find the hebbs' consistent_hebbs lists: All hebbs exhibiting local
    #     parallel connectivity are consistent (e.g., hebb from P1 to P1 consistent w/ hebb
    #     from sp1.1 to sp1.1, sp1.1 to sp1.2, sp1.2 to sp1.1, and sp1.2 to sp1.2)
    #  Do it from the master hebb list
    for hebb1 in retrieved_hebbs: # simulation['hebb_units']:
        for hebb2 in retrieved_hebbs:  # simulation['hebb_units']:
            if not(hebb1 == hebb2):
                if not(hebb1 in hebb2.consistent_hebbs or hebb2 in hebb1.consistent_hebbs):
                    check_this_pair_of_hebbs(hebb1, hebb2)
                    # the if statement above is to avoid getting duplicate entries

# DIAG
def show_hebb_connections(simulation):
    # shows what LISA thinks each hebb is consistent and inconsistent with
    # first, jjust show what hebbs exist
    print('Here are the hebbs (be on the lookout for duplicates):')
    print('(recall that only the retrieved hebbs will have consistent or inconsistent hebbs)')
    for hebb in simulation['hebb_units']:
        print(hebb.owners[0].name,'in',hebb.owners[0].analog.name,'<->',hebb.owners[1].name,'in',hebb.owners[1].analog.name)
    print('')
    print('here are the consistencies:')
    for hebb in simulation['hebb_units']:
        print(hebb.owners[0].name,'in',hebb.owners[0].analog.name,'<->',hebb.owners[1].name,'in',hebb.owners[1].analog.name)
        print('  is consistent with...')
        for hebb2 in hebb.consistent_hebbs:
            print('    ',hebb2.owners[0].name,'in',hebb2.owners[0].analog.name,'<->',hebb2.owners[1].name,'in',hebb2.owners[1].analog.name)
        print('  is INconsistent with...')
        for hebb2 in hebb.inconsistent_hebbs:
            print('    ',hebb2.owners[0].name,'in',hebb2.owners[0].analog.name,'<->',hebb2.owners[1].name,'in',hebb2.owners[1].analog.name)
# end diag

def settle_hebb_activations(hebbs):
    # using the buffers as one source of input and the activations of consistent and inconsistent
    # hebbs as another, run the hebbs as a parallel constraint satisfaction network
    inhib_weight = 20 # 15 # 10 # 8
    excit_weight = 3
    tau   = 0.1 # 0.5 # 0.1  # time-step constant
    gamma = 0.8 # 0.5        # growth rate
    delta = 0.1 # 0.2          # decay rate (0 so that activations will asymptote to 1.0)

    # (0) normalize buffers divisively (by max in same row or column)
    for hebb in hebbs:
        if hebb.buffer > 1.0:
            hebb.normalizer = hebb.buffer
        else:
            hebb.normalizer = 1.0
        for hebb2 in hebb.inconsistent_hebbs:
            if hebb2.buffer > hebb.normalizer:
                hebb.normalizer = hebb2.buffer
    for hebb in hebbs:
        hebb.buffer /= hebb.normalizer
        hebb.input = hebb.buffer
        
    iteration = 0
    settled = False
    while (not settled) and (iteration < 500):
        iteration += 1
        # (1) init each hebb's input to the value of its buffer; & update nouts
        for hebb in hebbs:
            hebb.input = hebb.buffer

            # (2) collect inhibitory input from inconsistent hebbs
            #     This algorithm uses a Max rule, which may not be stringent enough
            #  NOTE: inhibition only starts after iteration 9 (5/3/07)
            #        This WORKED!  LISA now solves the love triangle!
            if iteration > 19:
                max_inhib = 0
                for hebb2 in hebb.inconsistent_hebbs:
                    if hebb2.act > max_inhib:
                        max_inhib = hebb2.act
                hebb.input -= max_inhib * inhib_weight

            # (3) collect excitation from consistent hebbs
            for hebb2 in hebb.consistent_hebbs:
                hebb.input += hebb2.act * excit_weight  

        # (4) update activation based on input
        settled = True   # falsify when falsified
        for hebb in hebbs:
            delta_act = gamma * hebb.input * (1 - hebb.act) - hebb.act * delta  # min act = 0
            old_act   = hebb.act
            hebb.act  += tau * delta_act
            if hebb.act > 1:
                hebb.act = 1
##            if hebb.act < -1:   # act can go to -1
##                hebb.act = -1
            if hebb.act < 0:     # act can go to 0
                hebb.act = 0
            real_delta = abs(hebb.act - old_act)
            if real_delta > 0.01 * tau:
                settled = False
    # HARNESS: report how many rounds the settling took (added for the cogmodels reference harness)
    hebbs_settle_rounds.append(iteration)

##    #DIAG
##    if settled:
##        settled_text = 'settled in '+str(iteration)+' iterations'
##    else:
##        settled_text = 'did not settle'
##    print 'the hebb units',settled_text
##    print 'their activations are:'
##    for hebb in hebbs:
##        print hebb.owners[0].name,'<->',hebb.owners[1].name,' act =',hebb.act,'[',hebb.buffer,']'
##    # end DIAG            

def update_max_hebbs(driver, recip):
    # goes through all units in driver and recip and updates max_hebb on their hebb sets
    # (1) make a list, active memory, of all analogs in active memory
    #     then iterate through this list to update units' hebb sets' max_hebbs
    active_memory = []
    active_memory.append(driver)
    for analog in recip:
        active_memory.append(analog)
    # (2) go through the analogs, units & hebb sets & update
    for analog in active_memory:
        for group in analog.group:
            for hebb_set in group.hebb_set:
                hebb_set.update_max_hebb()
        for prop in analog.prop:
            for hebb_set in prop.hebb_set:
                hebb_set.update_max_hebb()
        for sp in analog.sp:
            for hebb_set in sp.hebb_set:
                hebb_set.update_max_hebb()
        for pred in analog.pred:
            for hebb_set in pred.hebb_set:
                hebb_set.update_max_hebb()
        for obj in analog.obj:
            for hebb_set in obj.hebb_set:
                hebb_set.update_max_hebb()

def vers142_update_hebb_weights(simulation):
    # This function implements te mapping algorithm developed by Hummel and Green and used
    #   by Pascal LISA Vers 142 and 143: It treats mapping connections (hebbs) as units
    #   that excite and inhibit one another, and then sets the mapping weights to the
    #   settled (final) hebb activations
    #
    #(0) All these operations should be performed ONLY on retrieved hebbs:
    #    Hebbs whose owners are both retrieved
    #    Therefore, step 0 is to make a list of retrieved hebbs
    retrieved_hebbs = []
    for hebb in simulation['hebb_units']:
        if hebb.owners[0].retrieved and hebb.owners[1].retrieved:
            # the hebb is retrieved: add it to the list
            retrieved_hebbs.append(hebb)

    # DIAG: Show the list of retrieved hebbs
##    print 'The retrieved hebbs are:'
##    for hebb in retrieved_hebbs:
##        print hebb.owners[0].name,'<->',hebb.owners[1].name

    # (1) first, create the network of inter-hebb connections that the hebbs will use to settle
    #   their activations
    set_up_hebb_interconnections(simulation, retrieved_hebbs)

    # DIAG
    # show_hebb_connections(simulation)

    # (2) now run the hebbs as a parallel-constraint network til the hebb activations settle
    settle_hebb_activations(retrieved_hebbs)  #simulation['hebb_units'])

    # DIAG: print line for showng weights, below
    print('')
    # (3) next convert the hebb activations to weights
    for hebb in retrieved_hebbs:  #simulation['hebb_units']:
        # note: the following assumes a hebb decay rate (i.e., weights going
        #       equal to the hebb learning rate down to low activations) of 1.0
        hebb.weight += dataTypes.hebb_learning_rate * (hebb.act - hebb.weight)
        # or, to follow H&H 03, you would do:
        # hebb.weight += (1.1 - hebb.weight) * hebb.act * dataTypes.hebb_learning_rate
        # except that this won't allow hebbs to decline unless hebb.act can be < 0
        #   which explains why act can go < 0 in the other code implementing this
        #   (Hummel & Green) algorithm!
##        if hebb.act > 0:
##            hebb.weight = hebb.act
##        else:
##            hebb.weight = 0

    # DIAG: show all hebb weights
##    for hebb in simulation['hebb_units']:
##        if hebb.weight > 0.0:
##            #print hebb.owners[0].name,'<->',hebb.owners[1].name,'wt =',hebb.weight
##            print hebb.owners[0].name,'<->',hebb.owners[1].name,'wt = %.3f' % hebb.weight
    
    # (4) finally, init the buffers, consistent & inconsistent lists, etc.
    #     do this for all hebbs, not just retrieved
    for hebb in simulation['hebb_units']:
        hebb.buffer = 0
        hebb.consistent_hebbs = []
        hebb.inconsistent_hebbs = []

    # (5) And REALLY finally: Update max_hebb on ALL units' hebb sets
    #     (I suspect this is why hebb-based inhibition is not working)
    #     (But I suspected wrong: Fixing (I think) max_hebbs didn't
    #      fix the problem of 'jealous' not getting inhibited.)
    update_max_hebbs(simulation['driver'],simulation['recip'])

def original_update_hebb_weights(simulation):
    # This function implements the orignal (Hummel & Holyoak, 1997, 2003) mapping algorithm
    #   that treats mapping connections as connections and the only competition between them
    #   is in the form of divisive and then subtractive normalization

##    #(0) All these operations should be performed ONLY on retrieved hebbs:
##    #    Hebbs whose owners are both retrieved
##    #    Therefore, step 0 is to make a list of retrieved hebbs
##    retrieved_hebbs = []
##    for hebb in simulation['hebb_units']:
##        if hebb.owners[0].retrieved and hebb.owners[1].retrieved:
##            # the hebb is retrieved: add it to the list
##            retrieved_hebbs.append(hebb)
##
##    # DIAG: Show the list of retrieved hebbs
##    print 'The retrieved hebbs are:'
##    for hebb in retrieved_hebbs:
##        print hebb.owners[0].name,'<->',hebb.owners[1].name

    #(1) Find inconsistent hebbs
    find_inconsistent_hebbs(simulation)

    #(2) normalize buffers divisively (by max in same row or column)
    for hebb in simulation['hebb_units']:
        if hebb.buffer > 1.0:
            hebb.normalizer = hebb.buffer
        else:
            hebb.normalizer = 1.0
        for hebb2 in hebb.inconsistent_hebbs:
            if hebb2.buffer > hebb.normalizer:
                hebb.normalizer = hebb2.buffer
    for hebb in simulation['hebb_units']:
        hebb.buffer /= hebb.normalizer

    #(3) normalize buffers subtractively
    #(3.1) get the normalizer as the max buffer of teh other hebbs in your row & column
    for hebb in simulation['hebb_units']:
        hebb.normalizer = 0
        for hebb2 in hebb.inconsistent_hebbs:
            if hebb2.buffer > hebb.normalizer:
                hebb.normalizer = hebb2.buffer
    #(3.2) subtract the normalizer from the buffer
    for hebb in simulation['hebb_units']:
        hebb.buffer -= hebb.normalizer

    #(4) update the hebbs' weights in proportion to their buffers
    for hebb in simulation['hebb_units']:
        hebb.weight += (1.1 - hebb.weight) * hebb.buffer * dataTypes.hebb_learning_rate
        if hebb.weight > 1:
            hebb.weight = 1
        if hebb.weight < 0:
            hebb.weight = 0
        # DIAG: show hebb weights
##        if hebb.weight > 0.0:
##            print hebb.owners[0].name,'<->',hebb.owners[1].name,'wt =',hebb.weight
               
    #(5) finally, init the buffers, consistent & inconsistent lists, etc.
    for hebb in simulation['hebb_units']:
        hebb.buffer = 0
        hebb.consistent_hebbs = []
        hebb.inconsistent_hebbs = []

    #(6) And REALLY finally: Update max_hebb on ALL units' hebb sets
    #     (I suspect this is why hebb-based inhibition is not working)
    update_max_hebbs(simulation['driver'],simulation['recip'])


# * * * * * * * * * * * * * * * * * * * * * *
# * Mapping quality and similarity routines *
# * * * * * * * * * * * * * * * * * * * * * *

def set_up_mapping_lists(simulation):
    # call this once at the beginning of a run:
    # sets up every analog's mapping_quality, MIP_similarity and MOP_similarity lists
    #   to every other analog
    for analog1 in simulation['analogs']:
        for analog2 in simulation['analogs']:
            if analog1 != analog2:
                # add analog 2 to analog1's lists
                analog1.add_mapping_link(analog2)
                analog1.add_MIP_link(analog2)
                analog1.add_MOP_link(analog2)

def semantic_cosine(unit1, unit2):
    # computes the cosine of the angle between two units' vectors of semantic units
    # init cosine to 1 in case you get an error and bail
    cosine = 1
    if type(unit1) == dataTypes.OPUnit and type(unit2) == dataTypes.OPUnit:
        # proceed
        # (1) compute the dot product of the units' semantic vectors
        dot_product = 0
        for link1 in unit1.semantic:
            for link2 in unit2.semantic:
                # if the two semantic lniks are connected to the same unit, then
                #   increment the dot product by the product of their weights
                if link1.unit == link2.unit:
                    dot_product += link1.weight * link2.weight
        # (2) compute the cosine as the dot product divided by the product of the lengths
        if unit1.weight_length > 0 and unit2.weight_length > 0:
            cosine = dot_product/(unit1.weight_length * unit2.weight_length)
    else:
        print('ERROR!  You are trying to compute a semantic cosine between units sans semantics')
        print('unit1 is a',type(unit1))
        print('unit2 is a',type(unit2))
    return cosine


def local_mapping_quality(unit, target_analog, use_cosine=False):
    # computes and returns the mapping quality of one unit to the units
    #   in the target analog
    # if use_cosine = True, then it multiplies that quality by the cosine
    #   if the angle between unit and the best mapping target unit
    for hebb_set in unit.hebb_set:
        if hebb_set.target == target_analog:
            # find max and second max hebbs in this hebb set
            max_hebb = None
            max_hebb_weight = 0
            second_max_hebb_weight = 0
            for hebb in hebb_set.hebbs:
                if hebb.h_unit.weight >= max_hebb_weight:
                    # update max and second max everything
                    second_max_hebb_weight = max_hebb_weight
                    max_hebb = hebb
                    max_hebb_weight = hebb.h_unit.weight

    mapping_quality = max_hebb_weight - second_max_hebb_weight
    if use_cosine:
        if max_hebb != None:
            mapping_quality *= semantic_cosine(unit, max_hebb.recip)

    return mapping_quality                   

def assess_mapping_quality(simulation):
    # computes the mapping quality of every analog to every other analog
    # and stores them in the analogs' mapping_quality lists
    # mapping quality of analog to target_analog (stored in analog's list)
    #  is what fraction of analog maps to target_analog
    for analog in simulation['analogs']:
        for mapping_link in analog.mapping_quality:
            target_analog = mapping_link.unit # this is the analog to which we're computing quality
            numerator = 0       # sum of unit importances * their local mapping quality
            denominator = 0     # sum of unit importances
            # increment from groups
            for group in analog.group:
                numerator += group.importance * local_mapping_quality(group, target_analog)
                denominator += group.importance
            # increment from props
            for prop in analog.prop:
                numerator += prop.importance * local_mapping_quality(prop, target_analog)
                denominator += prop.importance
            # increment from sps
            for sp in analog.sp:
                numerator += sp.importance * local_mapping_quality(sp, target_analog)
                denominator += sp.importance
            # increment from preds
            for pred in analog.pred:
                numerator += pred.importance * local_mapping_quality(pred, target_analog)
                denominator += pred.importance
            # increment from objs
            for obj in analog.obj:
                numerator += obj.importance * local_mapping_quality(obj, target_analog)
                denominator += obj.importance
            # now, mapping quality is just numerator/denominator
            if denominator > 0:
                mapping_link.weight = numerator/denominator
            
def compute_mip_similarity(simulation): 
    # computes the MIP similarity of every analog to every other analog
    # and stores them in the analogs' MIP_similarity lists
    # MIP similarity of analog to target_analog (stored in analog's list)
    #  is the same as mapping quality (above) except that (a) for preds & objs,
    #  max = 2nd_max mapping is multiplied by the semantic cosine with max, and (2)
    #  the denominator is a Weber fraction
    for analog in simulation['analogs']:
        for sim_link in analog.MIP_similarity:
            target_analog = sim_link.unit # this is the analog to which we're computing similarity
            numerator = 0       # sum of unit importances * their local mapping quality
            denominator = 1     # Weber constant = 1
            # increment from groups
            for group in analog.group:
                numerator += group.importance * local_mapping_quality(group, target_analog)
                denominator += group.importance
            # increment from props
            for prop in analog.prop:
                numerator += prop.importance * local_mapping_quality(prop, target_analog)
                denominator += prop.importance
            # increment from sps
            for sp in analog.sp:
                numerator += sp.importance * local_mapping_quality(sp, target_analog)
                denominator += sp.importance
            # increment from preds
            for pred in analog.pred:
                numerator += pred.importance * local_mapping_quality(pred, target_analog, True)
                # the 'True' in the above function call means "use semantic cosine"
                denominator += pred.importance
##            # increment from objs
##            for obj in analog.obj:
##                numerator += obj.importance * local_mapping_quality(obj, target_analog, True)
##                # the 'True' in the above function call means "use semantic cosine"
##                denominator += obj.importance
            # now, mapping quality is just numerator/denominator
            if denominator > 0:
                sim_link.weight = numerator/denominator

def compute_mop_similarity(simulation):
    # computes the MOP similarity of every aalog to every other
    # MOP similarity is just the weber fraction (almost the mean)
    # semantic cosine for all pairs of roles and objs
    for analog in simulation['analogs']:
        for sim_link in analog.MOP_similarity:
            target_analog = sim_link.unit # this is the analog to which we're computing similarity
            numerator = 0       # sum of unit importances * their local mapping quality
            denominator = 1     # Weber constant = 1
            # increment from preds
            for pred in analog.pred:
                for pred2 in target_analog.pred:
                    numerator += semantic_cosine(pred, pred2)
                    denominator += pred.importance
            # increment from objs
            for obj in analog.obj:
                for obj2 in target_analog.obj:
                    numerator += semantic_cosine(obj, obj2)
                    denominator += obj.importance
            # now, mapping quality is just numerator/denominator
            if denominator > 0:
                sim_link.weight = numerator/denominator
    
