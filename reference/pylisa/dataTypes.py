# dataTypes.py

# gamma = 0.5 # activation function growth rate # set these separately for driver, recip & dormant
# delta = 0.3 # activation function decay rate
tau   = 0.2 # 0.5 activation function time constant
            # default for finite WM capacity; for unlimited WM, we use 0.2

# init the master hebb variables here so they cab be used in HebbSet.add_hebb()
hebb_unit = []

# init global parameters
#    file-saving parameters
save_group_hebbs = True
save_prop_hebbs  = True
save_sp_hebbs    = True
save_op_hebbs    = True
min_vertical_wt  = 0.1
diagnostics      = False # diagnostics during file reading

#    sym and output files
data_directory   = 'DATA/'
file_path        = ''    # directory path, within Data/, for .sym and .run files
file_name        = ''
sym_file_name    = ''
out_file_name    = ''
sym_file         = None
out_file         = None
out_file_open    = False
file_in_memory   = False

#    run parameters
god_like_wm        = False    # false by default during ths phase of code development
semantic_noise     = 0.0      # none by default
semantic_death     = 0.0      # none by default
attention          = 1.0      # full by default
driver_inhibition  = 1.0      # full by default
recip_inhibition   = 0.5 # 2/13/15   1.0      # full by default
hebb_learning_rate = 1.0      # full by default (used to be 0.9)
bail_upon_settling = False    # when true, LISA will quit updatng when recip settles
vers142_map_alg    = True     # when true, use the versioon 142 mapping algorithm; whan false, use H&H'97 and '03 (i.e., vers120)
within_group_support = 1.0    # the amount that propos with the same group support one another
ssl_threshold        = 0.7    # the proportion of an analog that must map to the driver to license ssl

#    dangerous run parameters
prop_to_prop_inhib    = -1.0  # -0.5 # -1.0
sp_to_sp_inhib        = -1.0  # -0.5 # -1.0  # -2.0
out_prop_prop_to_sp   = -0.5 # 2/13/15  -1.0  # -0.5  # -1.0
out_prop_sp_to_pred   = -0.5 # 2/13/15  -1.0  # -0.5  # -1
out_prop_sp_to_obj    = -0.5 # 2/13/15  -1.0  # -0.5  # -1
pred_to_sp            = 1.0   # 1.5
obj_to_sp             = 1.0   # 0.5
sem_to_pred           = 1.5
sem_to_obj            = 0.5
hebb_bias             = 2.0   # effect of hebbs relative to other sources of input
retrieval_threshold   = 0.4   # activation for recip unit to get retrieved into WM
iterations_per_sp     = 330   # 300 # 3 * phase_duration! this is the old LISA value
phase_duration        = 100 # 75    # this is how long a single sp in the phase set fires once (twill fire three times)
# dangerous SP parameters (these, unlike some others, taken from vers 142)
inhibitor_to_excitor  = -3.0    # sp inhibitor to own excitor
inhibitor_to_yoked    = -1.0    # sp inhibitor to sp's pred & argument
min_sti               = 1.0     # minimum sensitivity to inhibition
max_sti               = 3.0 #2.0     # maximum sensitivity to inhibition
dsti_dt               = -0.0015 # change in sti per iteration
inhibitor_threshold   = 0.5     # how active an SP must be to excite its inhibitor
slow_inh_growth       = 0.001   # 0.001: 100 iterations to go from 0 to lower threshold (0.1)
fast_inh_growth       = 1.0     # jump immediately to max inhibitor activation
slow_inh_decay        = 0.01    # 10 iterations to decay from 1.0 to upper thresh (0.9)
fast_inh_decay        = 1.0     # fall immediately from upper thresh to 0
# dangerous prop priority parameters
max_prop_readiness    = 1.0
d_readiness_dt        = 0.1  # how fast readiness recovers (from 0 to max)

class HebbUnit(object):  # this is the unit shared by the two hebb sets
    def __init__(self, owner1, owner2):
        self.weight = 0.0
        self.act = 0.0
        self.input = 0.0
        self.buffer = 0.0
        self.normalizer = 1.0
        self.owners = []
        # the owners field is so the HebbUnit will know whom it connects...
        #   this is more for the convenience of the programmer (and debugger)
        #   than out of strict necessity
        self.owners.append(owner1)
        self.owners.append(owner2)
        # the fields below are for the updating of hebb weights:
        # at the beginning of said process, go through all the hebbs Once and figure out
        # who is consistent and inconsistent with whom.  Then just iterate through these lists for
        # the purposes of updating hebb activations.
        # Then, at the end of the updatng process, init these fields back to blank (cause the population
        # of hebbs is wont to change phase set by phase set)
        self.consistent_hebbs = []
        self.inconsistent_hebbs = []

    def init_state(self): # init everything *except* the weight
        self.act = 0.0
        self.input = 0.0
        self.buffer = 0.0


class Hebb(object):
    def __init__(self, h_unit, recip):
        self.h_unit = h_unit  # this is a pointer to the (shared) HebbUnit
        self.recip = recip # this is a pointer to the unit on the receiving end of the hebb

class HebbSet(object):
    def __init__(self, my_owner):
        self.owner = my_owner
        target = None     # the analog to which this hebb set refers
        self.hebbs = [] 
        self.max_hebb = 0.0 # for hebb-based inhibition

    def add_hebb(self, token_unit, h_unit):
        # adds a hebb to unit IFF that hebb does not already exist!
        # token_unit is the TokenUnit on the receiving end of this new hebb;
        # h_unit is the master HebbUnit (global hebb_unit) conneceted to this new hebb
        add_the_hebb = True  # will be set to false if the hebb already exists
        # check to see whether the hebb already exists in the list
        for hebb in self.hebbs:
            if hebb.recip == token_unit:  # i.e., if the hebb exists
                add_the_hebb = False
                break
        if add_the_hebb:
            if h_unit == None:
                # if there is no master hebb to add, then add to the master list and use
                # hebb_unit[-1], i.e., the last master hebb created
                hebb_unit.append(HebbUnit(self.owner, token_unit))
                # hebb_unit[-1] should now point to the newly created hebb_unit
                h_unit = hebb_unit[-1]
                # DIAG
                # print 'new master hebb:',h_unit.owners[0].name,'<-->',h_unit.owners[1].name
            # so, make the new hebb in this HebbSet
            self.hebbs.append(Hebb(h_unit, token_unit))
            # DIAG
            # print '    new hebb from',self.owner.name,'in',self.owner.analog.name,'to',self.hebbs[-1].recip.name,'in',self.hebbs[-1].recip.analog.name

        # if you created a new hebb, then return it's master hebb so that it can
        # be used as an argument (h_unit) in the construction
        # of the complementaty hebb (i.e., the one from token_unit
        # to self).  (It has already been added to the master list of hebbs.)
        # if you did not create a new hebb, then return None
        if add_the_hebb:  # i.e., if you created a new hebb
            return_val = self.hebbs[-1].h_unit
        else:
            return_val = None

        # now return the return val (either the new hebb or one)
        return return_val

    def update_max_hebb(self):
        self.max_hebb = 0.0
        for hebb in self.hebbs:
            if hebb.h_unit.weight > self.max_hebb:
                self.max_hebb = hebb.h_unit.weight

    def has_hebbs(self):
        # boolean function: returns true if hebb set has hebbs, false otherwise
        if len(self.hebbs) > 0:
            result = True
        else:
            result = False
        return result

class Link(object):     # this is a connection between OP and semantic or suport link 'tween props
    def __init__(self, unit, weight):
        self.unit   = unit  # unit is the guy on the other end of the link
        self.weight = weight

class TokenUnit(object):
    def __init__(self, my_name, my_analog):
        self.name = my_name
        self.index = None
        self.analog = my_analog
        self.hebb_set = []
        self.act = 0.0
        self.retrieved = False
        self.bu_input = 0.0
        self.td_input = 0.0
        self.lat_input = 0.0
        self.hebb_input = 0.0

        self.importance = 1.0   # default importance for all units is 1.0

        self.is_infant = False  # an infant token unit is newly inferred & still learning
        self.inferred  = False  # mark whether unit was inferred

    def get_index(self, all_tokens):
        self.index = all_tokens.index(self)

    def init_input(self, refresh):
        self.bu_input = 0.0
        self.td_input = refresh
        self.lat_input = 0.0
        self.hebb_input = 0.0

    def init_state(self):  # init input, activation and retrieval status
        self.init_input(0.0) # NOTE: Assumes a refresh value of 0
        self.act = 0.0
        self.retrieved = False

    def update_activation(self, gamma, delta):
        net_input = self.bu_input + self.td_input + self.lat_input + self.hebb_input * hebb_bias
        delta_act = gamma * net_input * (1.0 - self.act) - delta * self.act
        old_act = self.act
        self.act = self.act + tau * delta_act
        if self.act > 1.0:
            self.act = 1.0
        if self.act < 0.0:
            self.act = 0.0
        real_delta_act = abs(self.act - old_act)

        settled = (real_delta_act < 0.01 * tau)

        return settled
        
    def create_hebb_sets(self):
        # creates this unit's hebb sets: one for each analog of which
        # it is not a member
        # I think this is not gonna work 'cause analog is defined Below
        for an_analog in analog:
            if an_analog.index != self.analog.index: # don't point to own analog
                self.hebb_set.append(HebbSet(self)) # create hebb set
                self.hebb_set[-1].target = an_analog # point to an_analog

    def has_hebbs(self, target_analog=None):
        # boolean function that returns True iff the unit has some hebbs to target analog
        # if target_analog = None, then function returns true if unit has hebbs to Any analog
        result = False
        for hebb_set in self.hebb_set:
            if target_analog == None or hebb_set.target == target_analog:
                if hebb_set.has_hebbs():
                    result = True
                    break
        return result
            
class PropUnit(TokenUnit):
    def __init__(self, my_name, my_analog):
        TokenUnit.__init__(self, my_name, my_analog) # the default init for all TokenUnits
        self.SPs = []            # the prop's list of SPs
        self.parent_sps = []     # SPs taking the prop as an argument
        self.supports = []       # the prop's support list (a list of links, akin to semantic links, w/ weights & units)

        # this stuff for random firing
        # recall that importance is already declared for all TokenUnits
        self.readiness = 1.0  # default readiness is 1
        self.support   = 0.0  # default support from other props is 0
        self.priority  = 1.0  # priority = readiness * (importance + support)

        # prop mode: -1 = child; 0 = neutral; 1 = parent
        self.mode = 0 # default mode is neutral

    def init_state(self):  # init input, activation and mode
        self.init_input(0.0) # this function overrides TokenUnit.init_state
        self.act = 0.0
        self.mode = 0
        self.retrieved = False

    def add_supported_prop(self, prop_unit, wt):
        self.supports.append(Link(prop_unit, wt))


class SPUnit(TokenUnit):
    def __init__(self, my_name, my_analog):
        TokenUnit.__init__(self, my_name, my_analog) # the default init for all TokenUnits
        self.parent_prop = None     # will eventually be index of SP's parent
        self.pred        = None     # will be index of pred unit
        self.obj         = None     # will be index of obj unit
        self.child_prop  = None     # will be index of child prop
        self.inhibitor   = 0.0      # the act of the SP inhibitor
        self.times_fired = 0        # number of times fired this phase set
        self.sti         = min_sti  # sensitivity to inhibition

    def init_state(self):  # init input, activation and inhibitor
        self.init_input(0.0) # this function overrides TokenUnit.init_state
        self.act = 0.0
        self.inhibitor = 0.0
        self.retrieved = False
        self.times_fired = 0
        self.sti = min_sti

    def update_inhibitor(self):
        # also updates sti and counts how many times SP fired
        self.sti += dsti_dt     # decrement sti (remember, dsti_dt is Negative!)
        if self.sti < min_sti:  # but don't let go below min
            self.sti = min_sti
        # if inhibitor rising...
        if self.act > inhibitor_threshold: # then inhibitor rises
            if self.inhibitor < 0.1:       # lower threshold: slow growth
                self.inhibitor += slow_inh_growth
            else:
                self.inhibitor += fast_inh_growth # above lower thresh: fast growth
                if self.inhibitor > 1:
                    self.inhibitor = 1
                self.times_fired += 1  # update times fired
                self.sti = max_sti     # set sti to max   
        # else inhibitor falling...
        else:                              
            if self.inhibitor > 0.9:       # falling slowly
                self.inhibitor -= slow_inh_decay
            else:                          # falling rapidly
                self.inhibitor -= fast_inh_decay
                if self.inhibitor < 0:
                    self.inhibitor = 0
                

class OPUnit(TokenUnit):
    def __init__(self, my_name, my_analog, my_type):
        TokenUnit.__init__(self, my_name, my_analog) # the default token unit init
        self.semantic =  [] # this will now be a list of Lsink (which has both the weight and the semantic unit)
        self.weber_sum       = 1.0  # 1 + the sum of the semantic weights
        self.weight_length   = 0    # for cosine BU input function
        self.sps = []        # a list of the SPs connected to this unit
        self.type = my_type  # 'Pred' or 'Obj'

    def add_semantic(self, sem_unit, wt):
        self.semantic.append(Link(sem_unit, wt))

    def compute_weight_length(self):  # for the cosine input function
        self.weight_length = 0
        for sem in self.semantic:
            self.weight_length += pow(sem.weight, 2)
        self.weight_length = pow(self.weight_length, 0.5)
        if self.weight_length == 0:
            self.weight_lenght = 1 # to avoid division by zero errors

class GroupUnit(TokenUnit):
    def __init__(self, my_name, my_analog):
        TokenUnit.__init__(self, my_name, my_analog)

        # prop units
        self.prop = []

        # other (child) group units
        self.group = []
        # a group Above this group (for now, 3/2/11) this is limited to just one parent... I may have to relax this later
        self.parent = None

        # Level (in group hierarchy): 0 if only has props; otherwise 1+ the level
        #     of the highest-level group it takes as an argument
        self.level = 0

        # semantics ( now [4/26/07] semantics are links, w/ weights and units 
        self.semantic   = []
        self.weber_sum  = 1.0

    def add_semantic(self, sem_unit, wt):
        self.semantic.append(Link(sem_unit, wt))

    def compute_weight_length(self):  # for the cosine input function
        self.weight_length = 0
        for sem in self.semantic:
            self.weight_length += pow(sem.weight, 2)
        self.weight_length = pow(self.weight_length, 0.5)
        if self.weight_length == 0:
            self.weight_lenght = 1 # to avoid division by zero errors


class SemanticUnit(object):
    def __init__(self, my_name):
        self.name = my_name
        self.index = None
        self.act   = 0.0
        self.input = 0.0
        self.level = 0   # for group semanticss

    def init_state(self):
        self.act = 0.0
        self.input = 0.0

    def get_index(self, all_semantics):
        self.index = all_semantics.index(self)

    def update_activation(self, max_input):
        if max_input < 1.0:
            divisor = 1.0
        else:
            divisor = max_input
        self.act = self.input/divisor

class Analog(object):
    def __init__(self, my_name):
        self.name = my_name
        self.index = None

        # units
        self.group = []
        self.prop =  []
        self.sp =    []
        self.pred =  []
        self.obj =   []

        self.num_groups = 0
        self.num_props = 0
        self.num_SPs = 0
        self.num_preds = 0
        self.num_objs = 0

        # for SSL
        self.ready_to_learn = True # default to True for schema induction; then
                                   # set to False in build when props are made
                                   # in a schema, it will remain true, so schema will
                                   # always be ready to learn

        # infants
        self.infant_prop =  None
        self.infant_sp =    None
        self.infant_pred =  None
        self.infant_obj =   None
        self.infant_child = None
        self.inferred_groups = [] # "inferred" not "infant" see notes of 5/19/07

        # status
        self.is_driver = False
        self.is_recip  = False

        # mapping quality and similarity to other analogs
        self.mapping_quality = []  # Links of mapping quality to other analogs
        self.MIP_similarity  = []  # Links of MIP similarity to other analogs
        self.MOP_similarity  = []  # Links of MOP similarity to other analogs

    def get_index(self, all_analogs):
        self.index = all_analogs.index(self)

    def add_mapping_link(self, other_analog):
        self.mapping_quality.append(Link(other_analog, 0))

    def add_MIP_link(self, other_analog):
        self.MIP_similarity.append(Link(other_analog, 0))

    def add_MOP_link(self, other_analog):
        self.MOP_similarity.append(Link(other_analog, 0))

    def has_inferred_units(self):
        # boolean function that returns True iff analog has any inferred units
        result = False
        for group in self.group:
            if group.inferred:
                result = True
                break
        if not result:
            for prop in self.prop:
                if prop.inferred:
                    result = True
                    break
        if not result:
            for sp in self.sp:
                if sp.inferred:
                    result = True
                    break
        if not result:
            for pred in self.pred:
                if pred.inferred:
                    result = True
                    break
        if not result:
            for obj in self.obj:
                if obj.inferred:
                    result = True
                    break
        return result

    def has_hebbs(self, target_analog):
        # returns true iff analog has hebbs to target analog
        result = False
        for group in self.group:
            if group.has_hebbs(target_analog):
                result = True
                break
        if not result:
            for prop in self.prop:
                if prop.has_hebbs(target_analog):
                    result = True
                    break
            for sp in self.sp:
                if sp.has_hebbs(target_analog):
                    result = True
                    break
            for pred in self.pred:
                if pred.has_hebbs(target_analog):
                    result = True
                    break
            for obj in self.obj:
                if obj.has_hebbs(target_analog):
                    result = True
                    break
        return result
            


class SequenceElement(object):
    def __init__(self, driver, recip, control, ss_learn, similarity):
        self.index = None
        self.driver = driver
        self.recip = recip
        self.phase_set = []
        self.control  = control
        # control = 'props' means non-random order; props specified by user
        # control = 'groups' means random firing order determined by group
        # control = 'random' means random firing order over whole analog (i.e., not group-based)
        # special operations
        self.update_hebbs = False # gets set later
        self.sslearn      = ss_learn  # self-supervised learning: -1 = off; 1 = on; 0 = LISA decides
        self.compute_similarity = similarity # gets set later

    def get_index(self, all_elements):
        self.index = all_elements.index(self)


# init the main data structures
analog = []
pred_semantic = []
obj_semantic = []
group_semantic = []
hebb_unit = []
sequence = []
        
