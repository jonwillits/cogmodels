# self-supervised learning module 5/16/07
import dataTypes
import graphics

# Functions for export:
#
# check_whether_analog_needs_infants(simuation, analog)
# update_infant_group(analog)
# update_infant_sp(analog)
# update_infant_op(analog, unit_class) (unit_class = 'Pred' or 'Obj')

def set_up_new_hebbs(infant_analog, driver, infant_unit, driver_unit):
    # internal function:
    # Creates the hebb sets on the infant, creates a hebb
    #   between the infant and driver unit that spawned it and sets the
    #   weight to 1
    #
    # This is step (5) in the function below, hence the numbering
    # (5.1) create the infant's hebb sets
    infant_unit.create_hebb_sets()
    # (5.2) find the hebb set that points to the driver
    for hebb_set in infant_unit.hebb_set:
        if hebb_set.target == driver:
            # (5.3) create a new hebb in this hebb set for the infant
            hebb_unit = hebb_set.add_hebb(driver_unit,None)
            hebb_unit.weight = 1.0  # set the weight to 1
            hebb_set.update_max_hebb()
    # (5.4) create a new hebb for the active driver unit
    for hebb_set2 in driver_unit.hebb_set: # find the right hebb set
        if hebb_set2.target == infant_analog:
            hebb_set2.add_hebb(infant_unit,hebb_unit)
            hebb_set2.update_max_hebb()
        
def create_infant(active_unit, driver, analog, infant_type):
    # internal function:
    # Creates an infant of type infant_type in analog.
    # active_unit is the active unit in the driver that spawned need for the infant
    #
    if infant_type == 'Group':
        # (1) create the new unit, naming it based on active_unit
        analog.group.append(dataTypes.GroupUnit('"'+active_unit.name+'"', analog))
        # (2) set the group to analog's list of inferred groups
        analog.inferred_groups.append(analog.group[-1])
        # (3) compute & set the infant's index
        analog.group[-1].get_index(analog.group)
        # (4) create mapping connection between infant and active_unit
        set_up_new_hebbs(analog,driver,analog.group[-1],active_unit)
        # (5) adopt the level of the group that spawned you
        analog.group[-1].level = active_unit.level
        # (6) tag the infant as inferred
        analog.group[-1].inferred = True
        # (7) tag infant as retrieved
        analog.group[-1].retrieved = True
        # (8) create potential connections to all group semantics AT SAME LEVEL (6/13/07)
        for sem in dataTypes.group_semantic:
            if sem.level == analog.group[-1].level:
                analog.group[-1].add_semantic(sem,0.0)
    elif infant_type == 'Prop':
        # (1) create the new unit, naming it based on the driver unit
        analog.prop.append(dataTypes.PropUnit('"'+active_unit.name+'"', analog))
        # (2) set the analog's infant pointer to this unit
        analog.infant_prop = analog.prop[-1]
        # (3) compute & set the infant's index
        analog.infant_prop.get_index(analog.prop)
        # (4) create mapping connection between infant and active_unit
        set_up_new_hebbs(analog,driver,analog.infant_prop,active_unit)
        # (5) set the mode of the inferred prop
        analog.infant_prop.mode = 1
        # (6) tag the infant as inferred
        analog.infant_prop.inferred = True        
        # (7) tag infant as retrieved
        analog.infant_prop.retrieved = True
    elif infant_type == 'SP':
        # (1) create the new unit, naming it based on the driver unit
        analog.sp.append(dataTypes.SPUnit('"'+active_unit.name+'"', analog))
        # (2) set the analog's infant pointer to this unit
        analog.infant_sp = analog.sp[-1]
        # (3) compute & set the infant's index
        analog.infant_sp.get_index(analog.sp)
        # (4) create mapping connection between infant and active_unit
        set_up_new_hebbs(analog,driver,analog.infant_sp,active_unit)
        # (5) tag the infant as inferred
        analog.infant_sp.inferred = True        
        # (6) tag infant as retrieved
        analog.infant_sp.retrieved = True
    elif infant_type == 'Pred':
        # (1) create the new unit, naming it based on the driver unit
        analog.pred.append(dataTypes.OPUnit('"'+active_unit.name+'"', analog,'Pred'))
        # (2) set the analog's infant pointer to this unit
        analog.infant_pred = analog.pred[-1]
        # (3) compute & set the infant's index
        analog.infant_pred.get_index(analog.pred)
        # (4) create mapping connection between infant and active_unit
        set_up_new_hebbs(analog,driver,analog.infant_pred,active_unit)
        # (5) create potential connections to all pred semantics
        for sem in dataTypes.pred_semantic:
            analog.infant_pred.add_semantic(sem,0.0)
        # (6) tag the infant as inferred
        analog.infant_pred.inferred = True        
        # (7) tag infant as retrieved
        analog.infant_pred.retrieved = True
    elif infant_type == 'Obj':
        # (1) create the new unit, naming it based on the driver unit
        analog.obj.append(dataTypes.OPUnit('"'+active_unit.name+'"', analog,'Obj'))
        # (2) set the analog's infant pointer to this unit
        analog.infant_obj = analog.obj[-1]
        # (3) compute & set the infant's index
        analog.infant_obj.get_index(analog.obj)
        # (4) create mapping connection between infant and active_unit
        set_up_new_hebbs(analog,driver,analog.infant_obj,active_unit)
        # (5) create potential connections to all obj semantics
        for sem in dataTypes.obj_semantic:
            analog.infant_obj.add_semantic(sem,0.0)
        # (6) tag the infant as inferred
        analog.infant_obj.inferred = True        
        # (7) tag infant as retrieved
        analog.infant_obj.retrieved = True
    elif infant_type == 'ChildProp':
        # (1) create the new unit, naming it based on the driver unit
        analog.prop.append(dataTypes.PropUnit('"'+active_unit.name+'"', analog))
        # (2) set the analog's infant pointer to this unit
        analog.infant_child = analog.prop[-1]
        # (3) compute & set the infant's index
        analog.infant_child.get_index(analog.prop)
        # (4) create mapping connection between infant and active_unit
        set_up_new_hebbs(analog,driver,analog.infant_child,active_unit)
        # (5) set the mode of the inferred prop
        analog.infant_child.mode = -1
        # (6) tag the infant as inferred
        analog.infant_child.inferred = True        
        # (7) tag infant as retrieved
        analog.infant_child.retrieved = True

def get_active_driver_unit(unit_list):
    # returns the most active unit in the driver (or phase set, depending on how it's
    #   called) of a given kind.
    # if no unit of its kind has activation > 0.5, then it returns None
    #
    # if a prop mode is specified then it returns ONLY props of that mode
    max_unit = None
    max_act  = 0.5  # it is this act that a unit must exceed
    for unit in unit_list:
        if unit.act > max_act:
            max_unit = unit
            max_act  = unit.act
    return max_unit

def get_active_driver_groups(groups):
    # for version Beta 3, 6/13/07
    # returns the most active driver group unit at each level of the hierarchy (0...3 for now)
    # if no unit at a given level has activation > 0.5, then it returns None
    #
    most_active_groups = []
    for target_level in range(4):
        # go through all the groups.  For each group at the target level, check to see whether
        # (a) it is the most active and (b) whether its activation exceeds threshold
        max_unit = None
        max_act  = 0.5  # it is this act that a unit must exceed
        for unit in groups:
            if unit.act > max_act and unit.level == target_level:
                max_unit = unit
                max_act  = unit.act
        # if you found such a most-active unit at this level of the hierarchy, then add it to
        # the list of groups to return
        if max_unit != None:
            most_active_groups.append(max_unit)
    return most_active_groups

def these_units_need_infant(unit_list, prop_mode=0, group_level=-1):
    # internal function:
    # Checks to see whether a particular class of units in an analog
    #   (e.g., groups, props, etc.) needs an infant and returns the result
    # Prop_mode is an optional variable that takes a value (1 for parent,
    #   -1 for child) only if the unit_list passed in is a list of props
    #   In this case, and only this case, you need to look only at units
    #   in the right mode.
    #
    # 6/13/07: Here's my problem with group inference: You need to do the analogous
    #          thing (as mode check) with group level.  Harumph.
    #
    found_hebb_excitation = False
    need_an_infant        = False
    total_num    = 0  # total (importance-weighted) num recip units
    num_zero     = 0  # total num w/ no hebb input
    num_negative = 0  # total num w/ negative hebb input
    for unit in unit_list:
        if prop_mode == 0:  # don't bother with mode check: just look at hebb input
            mode_OK = True
        else:  # do a mode check
            mode_OK = (unit.mode == prop_mode) or (unit.mode == 0)  # YO "or..." 5/21/07
        if group_level == -1:
            level_OK = True
        else:  # do a level check
            level_OK = (unit.level == group_level)
        if mode_OK and level_OK:
            total_num += unit.importance
            if unit.hebb_input > 0.25:
                found_hebb_excitation = True # as soon as you find hebb excitation, 
                break                        # you know you don't need a new unit
            elif unit.hebb_input < 0:
                num_negative += unit.importance  # count as negative
            else:                
                num_zero += unit.importance      # count as zero
    # if you found hebb excitation, then you DON'T need an infant
    # if you didn't find hebb excitation then you need an infant iff
    # (a) total_num is 0 (i.e., we have an empty schema) or
    # (b) num_negative > num_zero/2
    # (from H&H 03; see Vers142, ULearn.inc, CreationCriterion())
    if found_hebb_excitation:
        need_an_infant = False
    elif total_num == 0:
        need_an_infant = True
    else:
        need_an_infant = (num_negative > num_zero/2)

##    # DIAG
##    if need_an_infant:
##        print
##        print 'Need an infant',type(unit_list[0])
##        print 'found hebb excitation = ',found_hebb_excitation
##        print 'total num    = ',total_num
##        print 'num negative = ',num_negative
##        print 'num zero     = ',num_zero
##        print
##        dummy = raw_input('waiting')
##        print
##    # end diag
    
    return need_an_infant

def already_maps(d_unit, r_analog):
    # Takes a unit and a target r_analog and returns True if the unit already maps
    #   to some unit in r_analog.
    # For use in deciding whether the r_analog needs a new unit
    already_maps = False
    for hebb_set in d_unit.hebb_set:
        if hebb_set.target == r_analog:
            for hebb in hebb_set.hebbs:
                if hebb.h_unit.weight > 0.5:  # YO implicit threshold!
                    already_maps = True
                    break
    return already_maps
        

def check_whether_analog_needs_infants(simulation, analog):
    # Checks whether an analog needs infants of any type and, if so, infers them
    # Need for an infant is inferred to be true when all units of a type
    #   have hebb-based inhibition and none have hebb-based excitation
    #
    # NOTE: This function operates on units' hebb_input fields, so you need to
    #   call it After inputs have been updated and before they are re-initialized
    #
    # the following is for graphics: if set to true, graphics updated at end
    units_inferred = False
    #
    # (1) groups
    # first check to see whether there is an active group in the driver.
    # Iff there is, then check to see whether analog needs a new group
    #   to correspond to it
    max_groups = get_active_driver_groups(simulation['driver'].group)
    # 
    # 6/13/07: You need to get a bunch of active driver groups: one at each level of the hierarchy
    #     (up to some limit; currently 4)
    #   Hence, your get_active_driver_unit() function will not work for
    #       groups.  You had to write a smarter one that returns a list
    #       of groups, each the max at its level of the hierarchy
    #
    # Note also that you changed your these_units_need_infant() function, above, so
    #    that it takes as a second optional argument the level of the groups to check
    #
    # The code below also had to change.  Recall the reason you did this:
    #   Because groups at one level were preventing the inference of groups at different levels.
    #
    # Holyfuckingshit: It worked the first time I ran it! (6/13/07)
    #
    for max_group in max_groups:
        if already_maps(max_group,analog):
            need_infant = False
            # if the active unit in the driver already maps to something in analog
            # then you don't need a new unit in analog
        else:
            need_infant = these_units_need_infant(analog.group,0,max_group.level)
        # no check for existing "infant" because a recip analog can have
        # multiple "infant" groups at once.  see noted of 5/19/07
        if need_infant:
            create_infant(max_group, simulation['driver'], analog, 'Group')
            units_inferred = True
    # (2) props
    # first look for an active prop in the phase set
    max_prop = get_active_driver_unit(simulation['phase_set']['props'])
    if max_prop != None:
        if analog.infant_prop != None:
            need_infant = False
        elif already_maps(max_prop,analog):
            need_infant = False
            # if the active unit in the driver already maps to something in analog
            # then you don't need a new unit in analog
        else:
            need_infant = these_units_need_infant(analog.prop, 1)
            # the 1 in the function call above specifies parent mode for props
        if need_infant:
            create_infant(max_prop, simulation['driver'], analog, 'Prop')
            units_inferred = True
    # (3) sps
    # first look for an active SP in the phase set
    max_sp = get_active_driver_unit(simulation['phase_set']['sps'])
    if max_sp != None:
        if analog.infant_sp != None:
            need_infant = False
        elif already_maps(max_sp,analog):
            need_infant = False
            # if the active unit in the driver already maps to something in analog
            # then you don't need a new unit in analog
        else:
            need_infant = these_units_need_infant(analog.sp)
        if need_infant:
            create_infant(max_sp, simulation['driver'], analog, 'SP')
            units_inferred = True
    # (4) preds
    # first look for an active pred in the phase set
    max_pred = get_active_driver_unit(simulation['phase_set']['preds'])
    if max_pred != None:
        if analog.infant_pred != None:
            need_infant = False
        elif already_maps(max_pred,analog):
            need_infant = False
            # if the active unit in the driver already maps to something in analog
            # then you don't need a new unit in analog
        else:
            need_infant = these_units_need_infant(analog.pred)
        if need_infant:
            create_infant(max_pred, simulation['driver'], analog, 'Pred')
            units_inferred = True
    # (5) objs
    # first look for an active obj in the driver
    max_obj = get_active_driver_unit(simulation['phase_set']['objs'])
    if max_obj != None:
        if analog.infant_obj != None:
            need_infant = False
        elif already_maps(max_obj,analog):
            need_infant = False
            # if the active unit in the driver already maps to something in analog
            # then you don't need a new unit in analog
        else:
            need_infant = these_units_need_infant(analog.obj)
        if need_infant:
            create_infant(max_obj, simulation['driver'], analog, 'Obj')
            units_inferred = True
    # (6) child prop
    # first look for an active child prop in the driver
    max_child = get_active_driver_unit(simulation['phase_set']['child_props'])
    if max_child != None:
        if analog.infant_child != None:
            need_infant = False
        elif already_maps(max_child,analog):
            need_infant = False
            # if the active unit in the driver already maps to something in analog
            # then you don't need a new unit in analog
        else:
            need_infant = these_units_need_infant(analog.prop,-1)
            # the -1 in the function call above specifies child mode for props
        if need_infant:
            create_infant(max_child, simulation['driver'], analog, 'ChildProp')
            units_inferred = True

    # finally, if any units were inferred, then update the graphics
    if units_inferred and simulation['use_graphics']:
        # update the graphics
        graphics.SetUnitLocations(dataTypes.analog, dataTypes.pred_semantic, dataTypes.obj_semantic, dataTypes.group_semantic)

    

def update_inferred_groups(analog):
    # used to be update_INFANT_group()
    # changed to INFERRED on 5/19/07 (see notes) in response to realization that groups
    #   must integrate information over multiple props, i.e., multiple phase sets
    # As such, inferred groups in the recipient should Always be looking for props
    #   or lower-level groups to accept as members
    #
    # Oh fuck, this needs to be called (i.e., the group needs to remain an infant)
    #  as long as its corresponding driver group remains active... hmmm is thsi a more general
    #  principle on when infants of any type should grow up??
    # OK, some help... groups now have a (hierarchical) level, starting at 0 for groups
    #  with no groups as arguments, and equal to higest (group) argument's level +1
    #  for groups with arguments.
    # Inferred groups adopt the level of the group that spawned their inference and
    #  connect to (a) any active props (? or only if they're level 0)
    #  and (b) any active groups lower than themselves
    #
    for group in analog.inferred_groups:
        if group.act > 0.5:  # YO! Implicit threshold
            if group.level == 0:
                # attempt to connect to (parent) props
                for prop in analog.prop:
                    if prop.mode == 1 and prop.act > 0.5: # YO! Implicit threshold
                        if not prop in group.prop: # if the prop does not already belong to the group
                            group.prop.append(prop)
            else:
                # attempt to connect to active groups of lower level
                for group2 in analog.group:
                    if group2.level == group.level - 1:
                        if group2.act > 0.25:   # YO!  Implicit threshold
                            if not group2 in group.group: # not already included
                                # add group to infant's set of groups
                                group.group.append(group2)
            # for groups at all levels learn connections to active group semantics
            # (this is gonna pose a problem unless the group semantics are labeled
            #  according to the level of the source group that's activating them)
            # HERE 6/13/07: Group semantics are now labeled with level
            settled = True # set to false when falsified
            for sem_link in group.semantic:
                delta = sem_link.unit.act - sem_link.weight
                if delta > 0:
                    sem_link.weight += delta 
                    if delta > 0.01:        # YO! implicit settling threshold of 0.001!
                        settled = False
                elif delta < 0:
                    sem_link.weight += delta * 0.1  # slow weight decay
                    if abs(delta) > 0.01:
                        settled = False
    
            # now, if the unit has settled then prune its semantic weights
            if settled:
                # (1) purge weights < 0.1    # YO!  implicit purge threshold of 0.1!
                index = 0
                while index < len(group.semantic):
                    if group.semantic[index].weight < 0.1: # purge!
                        group.semantic.pop(index)  # I sure hope this works!  May cause problems.
                    else:
                        index += 1
                        # logic here is that index only advances if item not purged:
        
def update_infant_sp(analog):
    # Called iff analog has infant sp: tries to find a prop, a pred and an
    #   arg for the infant sp.  If all found, the sp grows up.
    #
    # (0) Init the booleans that tell whether the SP is fully conected
    has_prop = False
    has_pred = False
    has_arg  = False # arg can be either child prop or obj
    #
    # (1) Look up for an active prop to attach to
    if analog.infant_sp.parent_prop != None:
        has_prop = True
    else:  # no parent prop yet: look for one
        for prop in analog.prop:
            if prop.act > 0.5 and prop.mode == 1:   # YO! implicit activation threshold of 0.5
                # point SP up at prop...
                analog.infant_sp.parent_prop = prop
                # ... and point prop down at sp
                prop.SPs.append(analog.infant_sp)
                has_prop = True
                break # stop searching for a parent
    # (2) Look down for a pred
    if analog.infant_sp.pred != None:
        has_pred = True
    else:  # no pred yet: look for one
        for pred in analog.pred:
            if pred.act > 0.5: # YO! implicit threshold of 0.5!
                # point sp down to pred...
                analog.infant_sp.pred = pred
                # ... and pred up at sp
                pred.sps.append(analog.infant_sp)
                has_pred = True
                break # stop looking for a pred
    # (3) Look down for an argument
    if analog.infant_sp.obj != None or analog.infant_sp.child_prop != None:
        has_arg = True
    else:
        # (3.1) Look for an object first
        for obj in analog.obj:
            if obj.act > 0.5:   # YO! here's that implicit threshold again
                # point sp down at obj...
                analog.infant_sp.obj = obj
                # ... and obj up at sp
                obj.sps.append(analog.infant_sp)
                has_arg = True
                break # stop looking
    # (3.2) if it Still doesn't have an arg, then look for child prop second
    if not has_arg:
        for prop in analog.prop:
            if prop.mode == -1 and prop.act > 0.5:  # YO! implicit threshold again
                # point sp down at child...
                analog.infant_sp.child_prop = prop
                # ... and child up at sp
                prop.parent_sps.append(analog.infant_sp)
                has_arg = True
                break # stop looking
    # (4) if has_prop and has_pred and has_arg, then it's all grown up!
    if has_prop and has_pred and has_arg:
        analog.infant_sp = None

def update_infant_op(analog, unit_class):
    # Called iff an analog has an infant of unit_class (Pred or Obj)
    # Updates the semantic connections to an infant op unit
    # Unit_class ('Pred' or 'Obj') tells the function which infant op to update
    #   and which semantics to learn connections to
    if unit_class == 'Pred':
        infant = analog.infant_pred
    elif unit_class == 'Obj':
        infant = analog.infant_obj
    else:
        print('Error in selfSupLearning: update_infant_op got a non-unit class')
    #
    # Now, go through the links and update weights to approximate activations,
    #  paying much more attention to rising weights than falling ones
    # Once the weights cease to change (by some threshold), declare the infant
    #  grown-up
    #
    settled = True # set to false when falsified
    for sem_link in infant.semantic:
        delta = sem_link.unit.act - sem_link.weight
        if delta > 0:
            sem_link.weight += delta 
            if delta > 0.01:        # YO! implicit settling threshold of 0.001!
                settled = False
        elif delta < 0:
            sem_link.weight += delta * 0.1  # slow weight decay
            if abs(delta) > 0.01:
                settled = False
    # now, if the unit has settled then prune its semantic weights
    #  and set the analog's infant pointer to None
    if settled:
        # DIAG: Annunce that infant settled
        print(infant.name,'settled')
        # (1) purge weights < 0.1    # YO!  implicit purge threshold of 0.1!
        index = 0
        while index < len(infant.semantic):
            if infant.semantic[index].weight < 0.1: # purge!
                infant.semantic.pop(index)  # I sure hope this works!  May cause problems.
            else:
                index += 1
                # logic here is that index only advances if item not purged:
                # I sure hope this works!
        # (2) declare that the infant is all gwown up
        if unit_class == 'Pred':
            analog.infant_pred = None
        else:
            analog.infant_obj = None
    
    
    
    
