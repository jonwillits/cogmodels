# this is the build routines for py LISA

import dataTypes

def read_parameters():
    # read running parameters from file and report to output file
    done_with_parameters = False
    modifying_wm_capacity = False
    modifying_semantic_noise = False
    modifying_semantic_death = False
    modifying_attention = False
    modifying_driver_inhib = False
    modifying_recip_inhib = False
    modifying_hebb_learning_rate = False
    modifying_bail_upon_settling = False
    modifying_mapping_algorithm = False
    modifying_within_group_support = False
    modifying_save_group_hebbs = False
    modifying_save_prop_hebbs = False
    modifying_save_sp_hebbs = False
    modifying_save_op_hebbs = False
    # now, read more lines from sym_file...
    while not done_with_parameters:
        text_line = next(dataTypes.sym_file) # get next line
        # strip off spaces at beginning
        text_line = text_line.lstrip()
        words = text_line.split(' ') # parses line into words
        while words != []:
            # pop the first word off the line
            word = words.pop(0)
            word = word.rstrip()  #<-- This is not working 5/7/07
            word = word.upper()
            if word == '':
                pass
            elif word == 'DONE' or word == 'DONE;':
                done_with_parameters = True
                words = []
                # diag
                # print 'Done with parameters encountered'
                break
            elif word == '{':
                words = [] # skip rest of line
            elif word == 'UNLIMITEDWM':
                modifying_wm_capacity = True
            elif word == 'SEMANTICNOISE':
                modifying_semantic_noise = True
            elif word == 'SEMANTICDEATH':
                modifying_semantic_death = True
            elif word == 'ATTENTION':
                modifying_attention = True
            elif word == 'DRIVERINHIBITION':
                modifying_driver_inhib = True
            elif word == 'RECIPINHIBITION':
                modifying_recip_inhib = True
            elif word == 'HEBBLEARNINGRATE':
                modifying_hebb_learning_rate = True
            elif word == 'BAILUPONSETTLING':
                modifying_bail_upon_settling = True
            elif word == 'MAPPINGALGORITHM':
                modifying_mapping_algorithm = True
            elif word == 'WITHINGROUPSUPPORT':
                modifying_within_group_support = True
            elif word == 'SAVEGROUPHEBBS':
                modifying_save_group_hebbs = True
            elif word == 'SAVEPROPHEBBS':
                modifying_save_prop_hebbs = True
            elif word == 'SAVESPHEBBS':
                modifying_save_sp_hebbs = True
            elif word == 'SAVEOPHEBBS':
                modifying_save_op_hebbs = True
            elif modifying_wm_capacity and word == 'TRUE':
                modifying_wm_capacity = False
                dataTypes.god_like_wm = True
##                dataTypes.out_file.write('    Unlimited WM = True\n')
                print('SYM file directive: Unlimited WM = True')
            elif modifying_wm_capacity and word == 'FALSE':
                modifying_wm_capacity = False
                dataTypes.god_like_wm = False
##                dataTypes.out_file.write('    Unlimited WM = False\n')
                print('SYM file directive: Unlimited WM = False')
            elif modifying_semantic_noise: # and word.isdigit():
                modifying_semantic_noise = False
                dataTypes.semantic_noise = float(word)
##                dataTypes.out_file.write('    Semantic Noise = %.4f\n' % dataTypes.semantic_noise)
                print('SYM file directive: Semantic noise = %.4f' % dataTypes.semantic_noise)
            elif modifying_semantic_death: # and word.isdigit():
                modifying_semantic_death = False
                dataTypes.semantic_death = float(word)
##                dataTypes.out_file.write('    Semantic Death = %.4f\n' % dataTypes.semantic_death)
                print('SYM file directive: Semantic Death = %.4f' % dataTypes.semantic_death)
            elif modifying_attention: # and word.isdigit():
                modifying_attention = False
                dataTypes.attention = float(word)
##                dataTypes.out_file.write('    Attention = %.4f\n' % dataTypes.attention)
                print('SYM file directive: Attention = %.4f' % dataTypes.attention)
            elif modifying_driver_inhib: # and word.isdigit():
                modifying_driver_inhib = False
                dataTypes.driver_inhibition = float(word)
                # use driver inhibition to reset min_ and max_sti
                dataTypes.min_sti *= dataTypes.driver_inhibition
                dataTypes.max_sti *= dataTypes.driver_inhibition
##                dataTypes.out_file.write('    Driver Inhibition = %.4f\n' % dataTypes.driver_inhibition)
                print('SYM file directive: Driver Inhibition = %.4f' % dataTypes.driver_inhibition)
            elif modifying_recip_inhib: # and word.isdigit():
                modifying_recip_inhib = False
                dataTypes.recip_inhibition = float(word)
##                dataTypes.out_file.write('    Recip Inhibition = %.4f\n' % dataTypes.recip_inhibition)
                print('SYM file directive: Recip Inhibition = %.4f' % dataTypes.recip_inhibition)
            elif modifying_hebb_learning_rate: # and word.isdigit():
                modifying_hebb_learning_rate = False
                dataTypes.hebb_learning_rate = float(word)
##                dataTypes.out_file.write('    Hebb Learning Rate = %.4f\n' % dataTypes.hebb_learning_rate)
                print('SYM file directive: Hebb Learning Rate = %.4f' % dataTypes.hebb_learning_rate)
            elif modifying_bail_upon_settling and word == 'TRUE':
                modifying_bail_upon_settling = False
                dataTypes.bail_upon_settling = True
##                dataTypes.out_file.write('    Bail Upon Settling = True\n')
                print('SYM file directive: Bail Upon Settling = True')
            elif modifying_bail_upon_settling and word == 'FALSE':
                modifying_bail_upon_settling = False
                dataTypes.bail_upon_settling = False
##                dataTypes.out_file.write('    Bail Upon Settling = False\n')
                print('SYM file directive: Bail Upon Settling = False')
            elif modifying_mapping_algorithm and word == 'H&H9703':
                modifying_mapping_algorithm = False
                dataTypes.vers142_map_alg = False
##                dataTypes.out_file.write('    Using H&H 97/03 Mapping Algorithm\n')
                print('SYM file directive: Using H&H 97/03 Mapping Algorithm')
            elif modifying_mapping_algorithm and word == 'VERS142':
                modifying_mapping_algorithm = False
                dataTypes.vers142_map_alg = True
##                dataTypes.out_file.write('    Using Vers142 Mapping Algorithm\n')
                print('SYM file directive: Using Vers142 Mapping Algorithm')
            elif modifying_within_group_support:
                modifying_within_group_support = False;
                dataTypes.within_group_support = float(word)
                print('SYM file directive: Within-group prop-to-prop support = %.2f' % dataTypes.within_group_support)
            elif modifying_save_group_hebbs and word == 'FALSE':
                modifying_save_group_hebbs = False
                dataTypes.save_group_hebbs = False
                print('SYM file directive: Save Group Hebbs = False')
            elif modifying_save_prop_hebbs and word == 'FALSE':
                modifying_save_prop_hebbs = False
                dataTypes.save_prop_hebbs = False
                print('SYM file directive: Save Prop Hebbs = False')
            elif modifying_save_sp_hebbs and word == 'FALSE':
                modifying_save_sp_hebbs = False
                dataTypes.save_sp_hebbs = False
                print('SYM file directive: Save SP Hebbs = False')
            elif modifying_save_op_hebbs and word == 'FALSE':
                modifying_save_op_hebbs = False
                dataTypes.save_op_hebbs = False
                print('SYM file directive: Save OP Hebbs = False')
            else:
                print('Error in read_parameters: "',word,'" is not a legal parameter name.')
    
##    dataTypes.out_file.write('* * * * * * * * * * * * * * * *\n\n')


def find_obj_semantic(name, create):
    # searces for an object semantic with the given name
    # if found, it returns the index
    # if not found, and if create, it creates the unfound
    # semantic and returns its index
    the_answer = None
    for unit in dataTypes.obj_semantic:
        if unit.name == name:
            # if the semantic doesn't yet know its index, then get it
            if unit.index == None:
                unit.get_index(dataTypes.obj_semantic)
            the_answer = unit
            break

    if the_answer == None and create == True:
        # create a new semantic with name
        dataTypes.obj_semantic.append(dataTypes.SemanticUnit(name))
        # have it get its index
        dataTypes.obj_semantic[-1].get_index(dataTypes.obj_semantic)
        # set that index to the answer
        the_answer = dataTypes.obj_semantic[-1]

    return the_answer

def define_objects(current_analog):
    # Note: This function currently assumes ONE LINE per object,
    #       and ignores semicolons
    done_with_objects = False
    current_obj = None
    connection_sign = 1 # for semantic connection negation
    # now, read more lines from sym_file...
    while not done_with_objects:
        text_line = next(dataTypes.sym_file) # get next line
        # strip off spaces at beginning
        text_line = text_line.lstrip()
        words = text_line.split(' ') # parses line into words
        while words != []:
            word = words.pop(0)
            word = word.rstrip() # remove carriage returns & spaces
            word = word.upper() # up_word is all upper case
            # count the non-space words
            if word == 'END' or word == 'END;':
                done_with_objects = True
                break
            elif word == '':
                pass
            elif word == ';':
                current_obj = None  # done with the current word
                words = []          # skip the rest of the line
            elif word == '{':
                # comment: nuke word
                word = []
                break
            # read a semantic weight: syntax = =#.#, e.g., =0.57
            elif word[0] == '=':
                word = word.lstrip('=')  # strip off the equal sign
                # if what left is a number, then assign it as the weight of the
                # last semantic added to the object
                semantic_weight = float(word)
                if semantic_weight > 1.0 or semantic_weight < -1.0:
                    print('Error in define objects: Semantic weight of',semantic_weight,'encountered while defining',current_obj.name)
                else:
                    if current_obj != None: # assign the weight to the last-read semantic
                        current_obj.semantic[-1].weight = semantic_weight
            elif current_obj == None: # if you don't have a current obj, then asssume this is an obj name...
                # add it to the analog's object list
                current_analog.obj.append(dataTypes.OPUnit(word,current_analog,'Obj'))
                current_obj = current_analog.obj[-1]
                # get its index
                current_obj.get_index(current_analog.obj)
            else:
                # assume it's a semantic name
                # first check for negation
                if word[0] == '-':
                    word = word.lstrip('-')  # remove it from the name
                    connection_sign = -1 # prepare to negate
                semantic_unit = find_obj_semantic(word, True)
                # new 4/26/07: obj.semantic is a Link, with a unit field and a weight field
                # append the link to the object's list of semantics
                current_obj.add_semantic(semantic_unit, 1.0 * connection_sign)
                # and don't forget to update the Weber sum
                current_obj.weber_sum += abs(current_obj.semantic[-1].weight)
                # return conenction sign to default
                connection_sign = 1

def find_pred_semantic(name, create):
    # searces for a pred semantic with the given name
    # if found, it returns the index
    # if not found, and if create, it creates the unfound
    # semantic and returns its index
    the_answer = None
    for unit in dataTypes.pred_semantic:
        if unit.name == name:
            # if the semantic doesn't yet know its index, then get it
            if unit.index == None:
                unit.get_index(dataTypes.pred_semantic)
            the_answer = unit
            break

    if the_answer == None and create == True:
        # create a new semantic with name
        dataTypes.pred_semantic.append(dataTypes.SemanticUnit(name))
        # have it get its index
        dataTypes.pred_semantic[-1].get_index(dataTypes.pred_semantic)
        # set that index to the answer
        the_answer = dataTypes.pred_semantic[-1]

    return the_answer

def auto_code_pred(basic_name, num_places, words, current_analog):
    pred_index = [] # init for later use
    connection_sign = 1 # sign = 1 or -1; 1 unless negated in sym file
    # make the num_places copies of the pred
    for i in range(num_places):
        # make the ith pred's name
        pred_name = basic_name+str(i+1)
        # add the pred to the analog
        current_analog.pred.append(dataTypes.OPUnit(pred_name, current_analog,'Pred'))
        current_analog.num_preds += 1
        # keep a record of the pred unit's index for use later
        pred_index.append(current_analog.num_preds - 1) # index of analog's last pred
        the_pred = current_analog.pred[pred_index[i]]
        # get the pred's index
        the_pred.get_index(current_analog.pred)

    # now go get the basic semantic names, make the semantics and attach to the
    # corresponding preds
    done_with_this_pred = False
    while not done_with_this_pred:
        # for a_word in words:
        while words != []:           # HERE 11:55 am
            word = words.pop(0)  # get the first word in the list
            word = word.rstrip() # remove carriage returns & spaces
            word = word.upper()  # make it all upper case
            # count the non-space words
            if word == ';':
                done_with_this_pred = True
                break
            elif word == '':
                pass
            elif word == '{':
                # a comment: nuke the rest of the line
                words = []
                # break
            else: # at this point, all you should have is semantics
                # first look for negation: - at front of sem name
                if word[0] == '-':
                    word = word.lstrip('-')  # remove it from the name
                    connection_sign = -1 # prepare to negate                
                for i in range(num_places):
                    # create (or get) three copies of semantic unit...
                    sem_name = word+str(i+1)
                    sem_unit = find_pred_semantic(sem_name, True)
                    # ... and attach to the relevant pred units
                    the_pred = current_analog.pred[pred_index[i]]
                    # NEW 4/26/07: semantic units have links, not separate arrays of unts & weights
                    the_pred.add_semantic(sem_unit, 1.0 * connection_sign)
                    the_pred.weber_sum += abs(the_pred.semantic[-1].weight)
                # now return connection_sign to teh default
                connection_sign = 1
                
        #  if not done with this pred, then read the next line of the file
        #  and continue the upper-most while loop
        if not done_with_this_pred:
            this_line = next(dataTypes.sym_file) # get next line
            this_line = this_line.lstrip()
            words = this_line.split(' ')
         

def hand_code_pred(basic_name, words, current_analog, place_open):
    # hand-code a predicate; place_open indcates whether the first place is already open,
    # i.e., whether the first '[' has already been encountered
    done_with_this_pred = False
    connection_sign = 1  # either 1 (positive sign) or -1
    if place_open:
        # first place is already open, so already on role # 0
        role_index = 1  
        # make pred unit for first role
        pred_name = basic_name + str(role_index)
        current_analog.pred.append(dataTypes.OPUnit(pred_name, current_analog,'Pred'))
        current_analog.num_preds += 1
        the_pred = current_analog.pred[-1]
        # get the pred's index
        the_pred.get_index(current_analog.pred)
    else:
        role_index = 0 # role not yet open, so not yet on on role # 1 (first role)
        
    while not done_with_this_pred:
        # for a_word in words:
        while words != []:        
            word = words.pop(0)  # get the first word in the list
            word = word.rstrip() # remove carriage returns & spaces
            word = word.upper()  # make it all upper case
            # count the non-space words
            if word == ';':
                done_with_this_pred = True
                break
            elif word == '[':
                place_open = True
                role_index += 1
                # make a new pred unit
                pred_name = basic_name + str(role_index)
                current_analog.pred.append(dataTypes.OPUnit(pred_name, current_analog,'Pred'))
                current_analog.num_preds += 1
                # keep a record of the pred unit's index for use later
                # pred_index.append(current_analog.num_preds - 1) # index of analog's last pred
                the_pred = current_analog.pred[-1]
                # get the pred's index
                the_pred.get_index(current_analog.pred)               
            elif word == ']':
                place_open = False
            elif word == '':
                pass
            elif word == '{':
                # a comment: nuke the rest of the line
                words = []
                # break
            # read a semantic weight: syntax = =#.#, e.g., =0.57
            elif word[0] == '=':
                word = word.lstrip('=')  # strip off the equal sign
                # if what left is a number, then assign it as the weight of the
                # last semantic added to the object
                semantic_weight = float(word)
                if semantic_weight > 1.0 or semantic_weight < -1.0:
                    print('Error in hand_code_pred: Semantic weight of',semantic_weight,'encountered while defining',the_pred.name)
                else:
                    if the_pred != None: # assign the weight to the last-read semantic
                        the_pred.semantic[-1].weight = semantic_weight
            elif word == ';':
                done_with_this_pred = True
            elif not(place_open) and word.isdigit():
                # you have an importance: assign to current preds
                importance = float(word) # float converts string to floating point
                # now, assign this importance value to all the preds you just created
                # use role_index to count backward through the analog's preds
                pred_index = 0  # this is the index into the analog.pred[] field
                counter    = 0 # increment and stop when counter = role_index
                while counter <= role_index:
                    pred_index -= 1   # decrement the index into the analog
                    current_analog.pred[pred_index].importance = importance # update the pred
                    counter += 1
            else: # at this point, all you should have is semantics
                if place_open:  # place is open: interpred word as a semantic name
                    # create (or get) three copies of semantic unit...
                    # check for negation
                    if word[0] == '-':
                        word = word.lstrip('-')  # remove it from the name
                        connection_sign = -1 # prepare to negate
                    sem_name = word
                    sem_unit = find_pred_semantic(sem_name, True)
                    the_pred.add_semantic(sem_unit, connection_sign * 1.0)
                    the_pred.weber_sum += abs(the_pred.semantic[-1].weight)
                    # return to default sign
                    connection_sign = 1
        #  if not done with this pred, then read the next line of the file
        #  and continue the upper-most while loop
        if not done_with_this_pred:
            this_line = next(dataTypes.sym_file) # get next line
            this_line = this_line.lstrip()
            words = this_line.split(' ')


def define_preds(current_analog):
    done_with_preds = False
    place_open      = False # for call to hand_code_pred
    # now, read more lines from sym_file...
    while not done_with_preds:
        text_line = next(dataTypes.sym_file) # get next line
        # strip off spaces at beginning
        text_line = text_line.lstrip()
        words = text_line.split(' ') # parses line into words
        # DIAG
        # print words
        # the first word will be the basic (un-numbered) pred name
        index = -1
        num_places = -1

        # first word on line better be pred name or else End;
        basic_name = words.pop(0)         # get the name from the words
        basic_name = basic_name.rstrip()  # remove carriage returns & spaces
        basic_name = basic_name.upper()   # make all upper case

        # now, depending on what basic_name is, act on it
        if basic_name == '{':
            # comment: nuke rest of words
            words = []
        elif basic_name == 'END' or basic_name == 'END;':
            done_with_preds = True
            break
        else:
            # its the name of a pred
            # the next thing, call it word2, is either '[' (for hand-coding) or num_places
            word2 = words.pop(0)
            if word2.isdigit():
                # its a number; if 0, then hand-code with place_open = true
                num_places = int(word2)
                if num_places == 0:
                    hand_code_pred(basic_name, words, current_analog, False) # false means place not yet open
                else:
                    auto_code_pred(basic_name, num_places, words, current_analog)
            elif word2 == '[':
                hand_code_pred(basic_name, words, current_analog, True) # true means place already open
            else:
                print('Error in define_predicates: second word on line,',word2,', is neither a number nor "["')

def find_obj_unit(name, the_analog):
    # searches for an object unit with the given name in the_analog
    # if found, it returns the index
    # if not found, it returns None
    the_answer = None
    for unit in the_analog.obj:
        if unit.name == name:
            # if the object doesn't yet know its index, then get it
            if unit.index == None:
                unit.get_index(the_analog.obj)
            the_answer = unit
            break

    return the_answer

def find_prop_unit(name, the_analog):
    # searches for a prop unit with the given name in the_analog
    # if found, it returns the unit
    # if not found, it returns None
    the_answer = None
    for unit in the_analog.prop:
        if unit.name == name:
            # if the prop doesn't yet know its index, then get it
            if unit.index == None:
                unit.get_index(the_analog.prop)
            the_answer = unit
            break

    return the_answer

def find_pred_unit(name, the_analog):
    # searches for a pred unit with the given name in the_analog
    # if found, it returns (a pointer to) the unit
    # if not found, it flags an error
    the_answer = None
    for unit in the_analog.pred:
        if unit.name == name:
            # if the pred doesn't yet know its index, then get it
            if unit.index == None:
                unit.get_index(the_analog.pred)
            the_answer = unit # unit.index
            break

    if the_answer == None:
        # signal an error
        print('Error in find_pred_unit: Unit', name, 'does not exist.')

    return the_answer

def define_support_relations(analog):
    # DIAG
    print('defining support relations')
    
    # define the support relations among the units in analog
    done_with_support_relations = False
    
    # now, read more lines from sym_file...
    while not done_with_support_relations:
        text_line = next(dataTypes.sym_file) # get next line
        # strip off spaces at beginning
        text_line = text_line.lstrip()
        words = text_line.split(' ') # parses line into words

        # control booleans go here
        from_1_to_2 = False  # pass support from prop1 to prop2
        from_2_to_1 = False  # pass support from prop2 to prop1

        # props
        prop1 = None
        prop2 = None

        # magnitude of support
        support_strength = 0

        for word in words:
            word = word.rstrip() # remove carriage returns & spaces
            word = word.upper() # up_word is all upper case
            if word == 'END' or word == 'END;':
                done_with_support_relations = True
                break
            elif word == '':
                pass
            elif word == '{':
                # skip rest of line
                break
            elif word[0] == 'P' and prop1 == None:
                # get prop1
                prop1 = find_prop_unit(word, analog)
            elif word[0] == 'P' and prop1 != None and prop2 == None:
                # get prop2
                prop2 = find_prop_unit(word, analog)
            elif word == '<--' or word == '<-':
                from_2_to_1 = True  # pass support from prop2 to prop1...
                from_1_to_2 = False # ... but not from prop1 to prop2
            elif word == '-->' or word == '->':
                from_1_to_2 = True  # pass support from prop1 to prop2...
                from_2_to_1 = False # ... but not from prop2 to prop1
            elif word == '<-->' or word == '<->':
                from_2_to_1 = True  # pass support from prop2 to prop1...
                from_1_to_2 = True # ... and from prop1 to prop2
            elif word.isdigit and prop1 != None and prop2 != None:
                support_strength = int(word)
                # set up the support between props 1 and 2
                if from_1_to_2:
                    prop1.add_supported_prop(prop2, support_strength)
                    # DIAG: report what you've done
                    print(prop1.name,'now supports',prop2.name,'with strength',support_strength)
                if from_2_to_1:
                    prop2.add_supported_prop(prop1, support_strength)
                    # DIAG: report what you've done
                    print(prop2.name,'now supports',prop1.name,'with strength',support_strength)
                # re-init all variables
                prop1 = None
                prop2 = None
                support_strength = 0
                from_1_to_2 = False
                from_2_to_1 = False

    # DIAG: show all support relations
    print()
    print('Support relations in analog',analog.name)
    for prop in analog.prop:
        print(prop.name,' --> ', end=' ')
        for link in prop.supports:
            print(link.unit.name,'(%.4f)  '%link.weight, end=' ')
        print()
    

def define_props(current_analog):
    done_with_props = False
    current_analog.ready_to_learn = False # see notes in dataTypes: this boolean inits to True
                                          #   so that schemas will always be ready to learn
                                          # we set it to false here because if you get to here,
                                          #   then you know analog is not a schema
    # now, read more lines from sym_file...
    while not done_with_props:
        text_line = next(dataTypes.sym_file) # get next line
        # strip off spaces at beginning
        text_line = text_line.lstrip()
        words = text_line.split(' ') # parses line into words
        # the first word on ech line will be the prop name
        word_counter = 0
        role_counter = 0
        prop_open = False
        prop_closed = False
        basic_pred_name = ''
        for word in words:
            word = word.rstrip() # remove carriage returns & spaces
            word = word.upper() # up_word is all upper case
            
            # count the non-space words
            if word != '':
                word_counter += 1
            if word == 'END' or word == 'END;':
                done_with_props = True
                break
            elif word == 'SUPPORT:':
                define_support_relations(current_analog)
            elif word == '':
                pass
            elif word == '{':
                break
            elif word_counter == 1: # if you're on the first word...
                # then it's the prop name
                prop_name = word
                # make the prop unit
                current_analog.prop.append(dataTypes.PropUnit(prop_name, current_analog))
                # make the prop calculate its index
                the_prop = current_analog.prop[-1]
                the_prop.get_index(current_analog.prop)
            elif word_counter == 2: # if you're on the second word...
                # then it's the basic pred name
                basic_pred_name = word
            elif word == '(':
                prop_open = True
            elif word == ')':
                prop_closed = True
                prop_open = False
            elif word == ';':   # the end of this prop
                prop_open = False
                prop_closed = False
                role_counter = 0
                break              # break out of for loop
            elif word.isdigit and prop_closed:  # then it's an importance
                the_prop.importance = int(word)
                # DIAG
                # print 'prop importance = ',the_prop.importance
            elif prop_open:  # interpret it as the name of an argument
                role_counter += 1
                # get the name of the corresponding pred unit
                pred_name = basic_pred_name+str(role_counter)
                # get the pred index
                the_pred = find_pred_unit(pred_name, current_analog)
                # construct the SP name from the prop name and the role counter
                sp_name = 'S'+the_prop.name+'.'+str(role_counter)
                # make the SP
                current_analog.sp.append(dataTypes.SPUnit(sp_name, current_analog))
                current_analog.num_SPs += 1
                the_SP = current_analog.sp[-1]
                the_SP.get_index(current_analog.sp)
                # attach the SP to the prop
                the_prop.SPs.append(the_SP)
                # attach the prop to the SP
                the_SP.parent_prop = the_prop
                # attach the pred to the SP
                the_SP.pred = the_pred
                # attach the SP to the pred
                the_pred.sps.append(the_SP)
                # figure out whether the argument is a prop or an object:
                # search for it as an obj; if you fail, then search as a prop
                the_obj = find_obj_unit(word, current_analog)
                if the_obj == None:
                    # then search for it as a prop
                    the_child_prop = find_prop_unit(word, current_analog)
                    if the_child_prop == None:
                        print('Error in define props:', word, 'is neither an obj or a prop')
                    else:
                        # attach the child prop to the SP
                        the_SP.child_prop = the_child_prop
                        # attach the SP to the prop as a parent
                        the_child_prop.parent_sps.append(the_SP)
                else:
                    # you found an obj_index... attach it to the SP
                    the_SP.obj = the_obj
                    # and attach the SP to the Obj
                    the_obj.sps.append(the_SP)

def find_group_unit(name, the_analog):
    # searches for a group unit with the given name in the_analog
    # if found, it returns (a pointer to) the unit
    # if not found, it flags an error
    the_answer = None
    for unit in the_analog.group:
        if unit.name == name:
            the_answer = unit # unit
            break

    if the_answer == None:
        # signal an error
        print('Error in find_group_unit: Unit', name, 'does not exist.')

    return the_answer

def find_group_semantic(name, create):
    # searces for a group semantic with the given name
    # if found, it returns a pointer to te unit
    # if not found, and if create, it creates the unfound
    # semantic and returns its index
    the_answer = None
    for unit in dataTypes.group_semantic:
        if unit.name == name:
            # if the semantic doesn't yet know its index, then get it
            if unit.index == None:
                unit.get_index(dataTypes.group_semantic)
            the_answer = unit
            break

    if the_answer == None and create == True:
        # create a new semantic with name
        dataTypes.group_semantic.append(dataTypes.SemanticUnit(name))
        # have it get its index
        dataTypes.group_semantic[-1].get_index(dataTypes.group_semantic)
        # set the unit to the answer
        the_answer = dataTypes.group_semantic[-1]

    return the_answer
  

def define_groups(current_analog):
    # a group can connect to (a) other groups, (b) props and (c) semantics
    # we're gonna need a way to tell Build which it is doing when
    # In the .SYM file, start with the group name, then Groups:, Props:, & Semantics:
    # end each part of the definition with a % sign
    # end each full group with a double % sign: %%
    # end whole DefGroups w/ word End
    # e.g.,
    # G12 { group 12
    #   Groups: G10 G11 % { connects to groups G 10 and G 11
    #   Props: P23 P24 P25 % { in reality, groups will connect ti either groups XOR props, but for the example
    #   Semantics: causl-reltn str=0.8 %
    #   %%
    #
    done_with_groups = False
    group_open = False
    doing_groups = False
    doing_props = False
    doing_semantics = False
    connection_sign = 1 # for negative semantic weights
    
    # the following variables are for defining collections of cause groups:
    #  a cause group connected to CAUSE and to the cause props
    #  an effect group connected to EFFECT and to the effect props
    #  a cause-relation group connected to CAUSE-EFFECT and to the previous two groups
    #  Syntax:
    #      Cause ( cause-props ) ( effect-props ) strength ;
    #  For example:
    #      Cause ( P1 P2 P3 ) ( P4 P5 ) 100 ;
    #      says P1...P3 jointly cause P4 & P5 with strength 100 % (i.e., 1.0)
    defining_cause_relation = False
    defining_cause = False
    cause_defined = False
    defining_effect = False
    effect_defined = False
    cause_index = 0
    causal_strength = 1.0  # default to max causal strength; user can enter diff values
    
    # now, read more lines from sym_file...
    while not done_with_groups:
        text_line = next(dataTypes.sym_file) # get next line
        # strip off spaces at beginning
        text_line = text_line.lstrip()
        words = text_line.split(' ') # parses line into words
        for a_word in words:
            a_word = a_word.rstrip() # remove carriage returns & spaces
            up_word = a_word.upper() # up_word is all upper case
            # count the non-space words
            if up_word == 'END' or up_word == 'END;':
                done_with_groups = True
                break
            elif up_word == '{':
                break
            elif up_word == '':
                pass
            elif up_word[0] == 'G' and not group_open:
                # then interpret up_word as name of a new group, make new group
                # and declare group_open
                # make the new group
                current_analog.group.append(dataTypes.GroupUnit(up_word, current_analog))
                the_emerging_group = current_analog.group[-1]
                the_emerging_group.get_index(current_analog.group)
                # declare group_open
                group_open = True
            elif up_word == '%%':
                group_open = False
            elif up_word == '%':
                doing_groups = False
                doing_props = False
                doing_semantics = False
            elif up_word == 'GROUPS:' and group_open:
                # note that reading_groups to the_emerging_group
                doing_groups = True
            elif up_word[0] == 'G' and group_open and doing_groups:
                # find the group corresponding to the name and append to the_emerging_group
                child_group = find_group_unit(up_word, current_analog)
                the_emerging_group.group.append(child_group)
                # mark the emerging group as this group's parent (3/31/11)
                child_group.parent = the_emerging_group
                # use the child group to update the level of the current group
                if child_group.level + 1 > the_emerging_group.level:
                    the_emerging_group.level = child_group.level + 1
            elif up_word == 'PROPS:' and group_open:
                # note that we're now doing props
                doing_props = True
            elif up_word[0] == 'P' and group_open and doing_props:
                # find the prop corresponding to the name and append to the_emerging_group
                prop = find_prop_unit(up_word, current_analog)
                the_emerging_group.prop.append(prop)
            elif up_word == 'SEMANTICS:' and group_open:
                # note that we're now reading semantics
                doing_semantics = True
            elif group_open and doing_semantics:
                # first check for negation
                if up_word[0] == '-':
                    up_word = up_word.lstrip('-')  # remove it from the name
                    connection_sign = -1 # prepare to negate
                # get the semantic corresponding to the word and append
                semantic = find_group_semantic(up_word, True)
                # NEW 4/26/07: semantic units have links, not separate arrays of unts & weights
                the_emerging_group.add_semantic(semantic, 1.0 * connection_sign)
                the_emerging_group.weber_sum += abs(the_emerging_group.semantic[-1].weight)
                # return conneciotn sign to default
                connection_sign = 1

            # routines for automatically constructing collections of groups to
            #   represent causal relations
            elif up_word == 'CAUSE' and not group_open:
                # define a cause relation with its three groups
                defining_cause_relation = True
                # incremement the index for naming the groups
                cause_index += 1
            elif up_word == '(' and defining_cause_relation and not cause_defined:
                # define the cause term of the causal relation
                defining_cause = True  # note that you're defining the cause term
                # make a new group to represent the cause
                name = 'Cause'+str(cause_index)
                current_analog.group.append(dataTypes.GroupUnit(name, current_analog))
                the_emerging_group = current_analog.group[-1]
                the_emerging_group.get_index(current_analog.group)
                the_emerging_group.level = 0
                # connect it to the group semantic CAUSE
                semantic = find_group_semantic('CAUSE', True)
                # NEW 4/26/07: semantic units have links, not separate arrays of unts & weights
                the_emerging_group.add_semantic(semantic, 1.0 * connection_sign)
                the_emerging_group.weber_sum += abs(the_emerging_group.semantic[-1].weight)
                # declare group_open
                group_open = True
                # note that we're now doing props
                doing_props = True
            elif up_word == ')' and defining_cause_relation and defining_cause:
                # close the cause group
                group_open = False
                defining_cause = False
                cause_defined = True
                doing_props = False
            elif up_word == '(' and defining_cause_relation and cause_defined and not defining_effect:
                # define the effect group
                defining_effect = True # note that you're defining the effect
                # make a new group to represent the effect
                name = 'Effect'+str(cause_index)
                current_analog.group.append(dataTypes.GroupUnit(name, current_analog))
                the_emerging_group = current_analog.group[-1]
                the_emerging_group.get_index(current_analog.group)
                the_emerging_group.level = 0
                # connect it to the group semantic EFFECT
                semantic = find_group_semantic('EFFECT', True)
                # NEW 4/26/07: semantic units have links, not separate arrays of unts & weights
                the_emerging_group.add_semantic(semantic, 1.0)
                the_emerging_group.weber_sum += abs(the_emerging_group.semantic[-1].weight)
                # declare group_open
                group_open = True
                # note that we're now doing props
                doing_props = True
            elif up_word == ')' and defining_cause_relation and defining_effect:
                effect_defined = True
                defining_effect = False
                group_open = False
                doing_props = False
            elif defining_cause_relation and effect_defined and not up_word == ';':
                # read a causal strength
                causal_strength = float(up_word)
            elif up_word == ';' and defining_cause_relation and effect_defined:
                # close out the causal relation group
                # make a new group to represent the cause-effect relation
                name = 'CE-'+str(cause_index)
                current_analog.group.append(dataTypes.GroupUnit(name, current_analog))
                the_emerging_group = current_analog.group[-1]
                the_emerging_group.get_index(current_analog.group)
                the_emerging_group.level = 1
                # connect it to the group semantic CAUSE-EFFECT
                semantic = find_group_semantic('CAUSE-EFFECT', True)
                the_emerging_group.add_semantic(semantic, 1.0)
                the_emerging_group.weber_sum += abs(the_emerging_group.semantic[-1].weight)
                # connect it to its causal strength semantics:
                #  causal strength is coarsely coded on eleven units, 0...1
                #  each unit has an RF that goes to 0 at the next unit's peak
                #  iterate thrugh the units, 0...1 and calculate the weight to each
                #  if weight > 0, then connect semantic to group
                for i in range(11):
                    weight = 1 - abs(i - causal_strength * 10)
                    if weight > 0:
                        # find and connect the semantic with weight
                        if i == 10:
                            semantic_name = 'CS_1.0'
                        else:
                            semantic_name = 'CS_0.'+str(i)
                        semantic = find_group_semantic(semantic_name, True)
                        the_emerging_group.add_semantic(semantic, weight)
                        the_emerging_group.weber_sum += abs(the_emerging_group.semantic[-1].weight)
                # connect it to the last two groups defined
                # add last groups as children of this emerging one
                the_emerging_group.group.append(current_analog.group[-2])
                the_emerging_group.group.append(current_analog.group[-3])
                # and mark this emerging one as their parent (3/31/11)
                current_analog.group[-2].parent = the_emerging_group
                current_analog.group[-3].parent = the_emerging_group
                # set all the cause-relation boolean flags to false and re-init
                #   causal strength to 1.0
                defining_cause_relation = False
                defining_cause = False
                cause_defined = False
                defining_effect = False
                effect_defined = False
                causal_strength = 1.0  # default to max causal strength; user can enter diff values
            else:
                print('WARNING: Unrecognized command',up_word,'in define_groups!')

    # at this point, you're done defining the groups in analog
    # finally, go through them and
    # (1) automatically build support links between props in each group
    # (2) append each group's level to it's name
    # (3) assign to each group's semantics the group's level
    #     NOTE: This is prone to error inasmuch as a semantic may be connected to
    #           groups of different levels
    for group in current_analog.group:
        # (2) append level to name
        # group.name = group.name+' (L'+str(group.level)+')'
        # (1) build support links among its props
        for prop in group.prop:
            for prop2 in group.prop:
                if prop2 != prop:
                    # add support from prop to prop2 with weight within_group_support
                    prop.add_supported_prop(prop2,dataTypes.within_group_support)
        # (3) assign the group's semantics' levels to the group's level
        for sem_link in group.semantic:
            sem_link.unit.level = group.level
                
def define_analog(first_line):
    # here we define a single analog
    # first_line contains the line read from the sym_file in
    # read_file(), below

    # first figure out name (if any): if there is one, it'll be the
    # second word in first_line
    words = first_line.split(' ')
    if len(words) > 1:
        the_name = words[1].rstrip('\n')
    else:
        the_name = ''

    # create the analog itself...
    dataTypes.analog.append(dataTypes.Analog(the_name))
    current_analog = dataTypes.analog[-1]

    # make the analog calculate its index
    current_analog.get_index(dataTypes.analog) # analog calculates own index
    # note that I'm modifying the variable current_analog RATHER than
    # maipulating dataTypes.analog[-1]...
    # that's OK: the assignment "current_analog = dataTypes.analog[-1]"
    # works by pointer, so that stuff that happens to current_analog
    # also happens to dataTypes.analog[-1]
    # print dataTypes.analog[-1].__dict__

    done_with_analog = False
    # now, read more lines from sym_file...
    while not done_with_analog:
        text_line = next(dataTypes.sym_file) # get next line
        words = text_line.split(' ') # parses line into words
        # this being the top level of Analog, the only legal words
        # are:  DefObjs, DefPreds, DefProps, DefGroups, Done and {
        for a_word in words:
            a_word = a_word.rstrip() # remove carriage returns & spaces
            up_word = a_word.upper() # up_word is all upper case
            if up_word == '{':
                break # skip rest of line
            elif up_word == 'NOTE:':
                # HARNESS: the original called text_line.pop(0) on a str and would crash here
                dataTypes.out_file.write(text_line)
                break # then skip rest of line
            elif up_word == 'DEFOBJS':
                define_objects(current_analog)
                # DIAG
                if dataTypes.diagnostics:
                    print('Objects in ', current_analog.name, ':')
                    for obj in current_analog.obj:
                        print(obj.index, ')', obj.name)
                        for sem in obj.semantic:
                            print(sem.unit.name)
            elif up_word == 'DEFPREDS':
                define_preds(current_analog)
                # DIAG
                if dataTypes.diagnostics:
                    print('Preds in ', current_analog.name)
                    for pred in current_analog.pred:
                        print(pred.index, ')', pred.name)
                        for sem in pred.semantic:
                            print(sem.unit.name)
            elif up_word == 'DEFPROPS':
                define_props(current_analog)
                # DIAG
                if dataTypes.diagnostics:
                    print('Props in ', current_analog.name)
                    for prop in current_analog.prop:
                        print(prop.index, ')', prop.name, '...')
                        for SP in prop.SPs:
                            print('    ',SP.index, ')', SP.name, '...')
                            if SP.pred != None:
                                print('        pred: ', SP.pred.name)
                            if SP.child_prop != None:
                                print('        child:', SP.child_prop.name)
                            if SP.obj != None:
                                print('        obj:  ', SP.obj.name)
            elif up_word == 'DEFGROUPS':
                define_groups(current_analog)
            elif up_word == 'DONE;' or up_word == 'DONE':
                done_with_analog = True
                break
            elif up_word == '':
                pass
            else:
                print('Unknown Command in define_analog:', '>'+up_word+'<')

def define_sequence(first_line):
    # here we define the sequence of operations
    # first_line contains the line read from the sym_file in
    # read_file(), below
    done_with_sequence = False
    setting_driver     = False
    setting_recip      = False
    setting_order      = False
    sequence_open      = False
    driver             = None
    recip              = []
    ss_learning        = -1  # -1 means no ssl; 1 means ssl on; 0 means LISA decides
    fire_control       = 'props'  # or 'groups' or 'random'
    compute_similarity = False
    current_sequence   = None
    current_group      = None
    reading_data       = False # reading data for random or group-based firing
    # when you define a new sequence element, you will have to pass it the following arguments:
    #   driver, recip, fire_control, ss_learning
    # now, read more lines from sym_file...
    while not done_with_sequence:
        text_line = next(dataTypes.sym_file) # get next line
        # strip off spaces at beginning
        text_line = text_line.lstrip()
        words = text_line.split(' ') # parses line into words
        # for a_word in words:
        while words != []:
            word = words.pop(0)
            word = word.rstrip() # remove carriage returns & spaces
            word = word.upper() # up_word is all upper case
            if word == 'DONE.' or word == 'DONE':
                done_with_sequence = True
                break
            elif word == '':
                pass
            elif word == 'DRIVER=[':
                setting_driver = True
                driver = None # init
                sequence_open = False
                current_sequence = None
            elif word == 'RECIP=[':
                setting_recip = True
                recip = [] # init
                sequence_open = False
                current_sequence = None
            elif word == 'ORDER=[':
                setting_order = True
            elif word == ']':
                setting_driver = False
                setting_recip = False
                setting_order = False
            elif (fire_control == 'random' or fire_control == 'groups') and word == '(':
                reading_data = True
            elif reading_data and word == ')':
                reading_data = False
                fire_control = 'props'  # return to default fire control
            elif word == 'SSL_ON':
                ss_learning = 1
            elif word == 'SSL_OFF':
                ss_learning = -1
            elif word == 'SSL_OK':
                ss_learning = 0
            elif word == 'SIM_ON':
                compute_similarity = True
            elif word == 'SIM_OFF':
                compute_similarity = False

            elif setting_driver and word.isdigit():
                # interpret digit as index of analog to serve as driver
                driver_index = int(word)
                # find the corresponding analog
                try:
                    driver = dataTypes.analog[driver_index]
                except IndexError:
                    print('Error in define_sequence (setting driver):',word,'is not an analog index')

            elif setting_recip and word.isdigit():
                recip_index = int(word)
                try:
                    the_recip = dataTypes.analog[recip_index]
                    recip.append(the_recip)  # add it to the list of recipients
                except IndexError:
                    print('Error in define_sequence (setting recip):',word,'is not an analog index')

            elif sequence_open and word == 'H':
                current_sequence.update_hebbs = True
                sequence_open = False # close the last sequence
                current_sequence = None

            elif sequence_open and word == 'SIM_ON':
                current_sequence.compute_similarity = True

            elif sequence_open and word == 'SIM_OFF':
                current_sequence.compute_similarity = False

            elif setting_order and word[0] == 'P':
                # it's a prop name and we're setting firing order...
                #
                # (1) find the prop coresponding to this name
                the_prop = find_prop_unit(word, driver)
                #
                # (2) error check
                if the_prop == None:
                    print('Error in define_sequence (defining order):',word,'is not a prop name')
                else:
                    # proceed to add the prop to a sequence
                    # (2a) if a sequence is already open, then just add to that...
                    if sequence_open:
                        current_sequence.phase_set.append(the_prop)
                    # (2b)... otherwise, make a new one
                    else:
                        # make a new sequence element and add the prop to it
                        dataTypes.sequence.append(dataTypes.SequenceElement(driver,recip,fire_control,ss_learning,compute_similarity))
                        current_sequence = dataTypes.sequence[-1]
                        current_sequence.get_index(dataTypes.sequence)
                        current_sequence.phase_set.append(the_prop)
                        sequence_open = True

            elif setting_order and word[0] == 'R':  # prepare to read random firing data
                fire_control = 'random'

            elif setting_order and word[0] == 'G':  # prepare to read group-controlled firing data
                # get the group in control
                current_group = find_group_unit(word, driver)
                if current_group == None:
                    print('Error in define_sequence:',word,'is not a group name')
                else:
                    # turn fire control over to groups
                    fire_control = 'groups'
                    
            elif setting_order and word[0] == 'C':  # prepare to read group-controlled firing data
                # get the group in control (if name is CE-# then it is a cause-effect group)
                current_group = find_group_unit(word, driver)
                if current_group == None:
                    print('Error in define_sequence:',word,'is not a group name')
                else:
                    # turn fire control over to groups
                    fire_control = 'groups'
                    
            elif fire_control == 'random' and reading_data:
                # data should always have exactly two numbers, as in '( num1 num2 )'
                # where num1 is the number of phase sets to create and num2 is the number
                # of props to fire in each phase set
                #
                # (1) so, first thing is to read the two numbers.  The first number is already in word
                if word.isdigit():
                    num_phases_to_make = int(word)
                    # (1b) read the second word
                    word = words.pop(0)
                    if word.isdigit():
                        num_props_per_phase = int(word)
                    else:
                        print('Error in define_sequence (random fire control; props/phase):',word,'is not a number')
                    # if you've made it this far, then you've got your two numbers
                    # (2) make num_phases_to_make new sequence elements
                    num_new_phases = 0
                    while num_new_phases < num_phases_to_make:
                        # increment counter!
                        num_new_phases += 1
                        # (2.1) make the new sequence element
                        dataTypes.sequence.append(dataTypes.SequenceElement(driver,recip,fire_control,ss_learning,compute_similarity))
                        current_sequence = dataTypes.sequence[-1]
                        current_sequence.get_index(dataTypes.sequence)
                        # (2.2) store the number of props to fire randomly in the phase set field
                        current_sequence.phase_set.append(str(num_props_per_phase))
                        current_sequence.phase_set.append(str(num_props_per_phase))
                        # (2.3) Tell the current sequence to update the hebbs when it's done
                        #       This will preclude volleaying, but hopefully that can be
                        #       handed by hand-coding the hell out of the firing order
                        current_sequence.update_hebbs = True
                        sequence_open = False # note that the sequence is closed
                else:
                    print('Error in define_sequence (random fire control; num_phases):',word,'is not a number')

            elif fire_control == 'groups' and reading_data:
                # data should always have exactly two numbers, as in '( num1 num2 )'
                # where num1 is the number of phase sets to create with current_group in control
                # and num2 is the number of props to fire in each phase set
                #
                # (1) so, first thing is to read the two numbers.  The first number is already in word
                if word.isdigit():
                    num_phases_to_make = int(word)
                    # (1b) read the second word
                    word = words.pop(0)
                    if word.isdigit():
                        num_props_per_phase = int(word)
                    else:
                        print('Error in define_sequence (group fire control; props/phase):',word,'is not a number')
                    # if you've made it this far, then you've got your two numbers
                    # (2) make num_phases_to_make new sequence elements
                    num_new_phases = 0
                    while num_new_phases < num_phases_to_make:
                        # increment counter!
                        num_new_phases += 1
                        # (2.1) make the new sequence element
                        dataTypes.sequence.append(dataTypes.SequenceElement(driver,recip,fire_control,ss_learning,compute_similarity))
                        current_sequence = dataTypes.sequence[-1]
                        current_sequence.get_index(dataTypes.sequence)
                        # (2.2) store a pointer to the current group and
                        #       the number of props to fire randomly in the phase set field
                        current_sequence.phase_set.append(current_group)
                        current_sequence.phase_set.append(str(num_props_per_phase))
                        # (2.3) Tell the current sequence to update the hebbs when it's done
                        #       This will preclude volleaying, but hopefully that can be
                        #       handed by hand-coding the hell out of the firing order
                        current_sequence.update_hebbs = True
                        sequence_open = False # note that the sequence is closed
                else:
                    print('Error in define_sequence (group fire control; num_phases):',word,'is not a number')

    if dataTypes.diagnostics:
        # show sequence
        print()
        print('The sequence of events...')
        for element in dataTypes.sequence:
            print(element.index,')  Driver:',element.driver.name, end=' ')
            for analog in element.recip:
                print('   Recip :', analog.name)
            print('   Fire control:',element.control)
            for unit in element.phase_set:
                if type(unit) == dataTypes.PropUnit:
                    print('    ',unit.name)
                else:
                    print(unit)
            if element.sslearning == -1:
                print('    * * SSL is OFF * *')
            elif element.sslearning == 0:
                print('    * * SSL is up to LISAs discretion * *')
            elif element.sslearning == 1:
                print('    * * SSL is ON * *')
            if element.update_hebbs:
                print('    * * update hebbs * *')
            if element.compute_similarity:
                print('    * * compute similarity * *')

def set_up_hebb_sets():
    # Just sets up the hebb sets of existing units to existing analogs.
    # Simply iterate through all units in all analogs and call the
    #   create_hebb_sets method on the units.
    # NOTE: This function ALSO computes the semantic lengths of OP and group units 
    for an_analog in dataTypes.analog:
        # groups
        for a_group in an_analog.group:
            a_group.create_hebb_sets()
            a_group.compute_weight_length()
        # props
        for a_prop in an_analog.prop:
            a_prop.create_hebb_sets()
        # SPs
        for an_SP in an_analog.sp:
            an_SP.create_hebb_sets()
        # preds
        for a_pred in an_analog.pred:
            a_pred.create_hebb_sets()
            a_pred.compute_weight_length()
        # objs
        for an_obj in an_analog.obj:
            an_obj.create_hebb_sets()
            an_obj.compute_weight_length()
                
def read_file(file_name, version_id, last_modified):

    # now, if not Abort, then read the file
    dataTypes.sym_file_name = dataTypes.data_directory+dataTypes.file_path+file_name+'.sym'
    dataTypes.sym_file = open(dataTypes.sym_file_name, 'r')
    # if not already open, then open output file
    if not dataTypes.out_file_open:
        dataTypes.out_file_name = dataTypes.data_directory+dataTypes.file_path+file_name+'.run'
        dataTypes.out_file = open(dataTypes.out_file_name, 'w')
        dataTypes.out_file_open = True
        lisa_id_line = 'Run of LISA Version '+version_id+'; last modified '+last_modified+'\n\n'
        dataTypes.out_file.write(lisa_id_line)

    for text_line in dataTypes.sym_file:  # iterates through whole file, line by line
        words = text_line.split(' ') # parses line into words
        # this being the top level of the SYM parser, the only legal words
        # are:  Note, Analog, Sequence and {
        for a_word in words:
            a_word = a_word.rstrip() # remove carriage returns & spaces
            up_word = a_word.upper() # up_word is all upper case
            if up_word == '{':
                break # skip rest of line
            elif up_word == 'NOTE:':
                dataTypes.out_file.write(text_line)
                break # then skip rest of line
            elif up_word == 'PARAMETERS':
                read_parameters()
                break # then skip rest of line
            elif up_word == 'ANALOG':
                define_analog(text_line)
                break # then skip rest of line
            elif up_word == 'SEQUENCE':
                define_sequence(text_line)
                break # then skip rest of line
            elif up_word == '':
                pass
            else:
                print('Unknown Command at top level of Build: ', '>'+up_word+'<')
                
    # now close the file
    dataTypes.sym_file.close()

    # almost finally, create the units' hebb sets
    set_up_hebb_sets()

    # finally, if all has gone well, then return True to indicate
    # that there's a file in memory
##    if Abort == True:
##        return_val = False
##    elif Abort == False:
##        return_val = True

    # YO!  This needs to be set based ion whether the file was successfully opened
    return True  # if Abort = True, then return False & vice-versa

def show_network():
    # show analogs...
    print() # line spacer before analog
    print() # line spacer before analog
    for an_analog in dataTypes.analog:
        # show obj and pred semantics
        print('* * * * * *',an_analog.name,'* * * * * *')
        print('Objects in ', an_analog.name, ':')
        for obj in an_analog.obj:
            print(obj.index, ')', obj.name)
            for sem in obj.semantic:
                print(sem.unit.name, '(wt = ',sem.weight,')')
            print('parent SPs:', end=' ')
            for sp in obj.sps:
                print(sp.name,'  ', end=' ')
            print()
            print('hebb sets to analogs:', end=' ')
            for hebb_set in obj.hebb_set:
                print(hebb_set.target.index, end=' ')
            print()
        print()
        print('Preds in ', an_analog.name)
        for pred in an_analog.pred:
            print(pred.index, ')', pred.name)
            for sem in pred.semantic:
                print(sem.unit.name, '(wt = ',sem.weight,')')
            print('parent SPs:', end=' ')
            for sp in pred.sps:
                print(sp.name,'  ', end=' ')
            print()
            print('hebb sets to analogs:', end=' ')
            for hebb_set in pred.hebb_set:
                print(hebb_set.target.index, end=' ')
            print()
        # show props
        print()
        print('Props in ', an_analog.name)
        for prop in an_analog.prop:
            if prop.importance != 1:
                impt_str = ' (import. = '+str(prop.importance)+')'
            else:
                impt_str = ''
            print(prop.index, ')', prop.name, impt_str, '...')
            for SP in prop.SPs:
                print('    ',SP.index, ')', SP.name, '...')
                if SP.pred != None:
                    print('        pred: ', SP.pred.name)
                if SP.child_prop != None:
                    print('        child:', SP.child_prop.name)
                if SP.obj != None:
                    print('        obj:  ', SP.obj.name)
            print('parent SPs:', end=' ')
            for sp in prop.parent_sps:
                print(sp.name,'  ', end=' ')
            print()
            print('hebb sets to analogs:', end=' ')
            for hebb_set in prop.hebb_set:
                print(hebb_set.target.index, end=' ')
            print()
        # show groups
        print()
        print('Groups in ',an_analog.name)
        for a_group in an_analog.group:
            print(a_group.index, ')', a_group.name, 'level = ',a_group.level,'...')
            print('  groups:', end=' ')
            for b_group in a_group.group:
                print(b_group.name, end=' ')
            print()
            print('  props:', end=' ')
            for prop in a_group.prop:
                print(prop.name, end=' ')
            print()
            print('  semantics:', end=' ')
            for sem in a_group.semantic:
                print(sem.unit.name, '(wt = ',sem.weight,')')
            print()
    print() # line spacer after analog

    # show sequence
    print()
    print('The sequence of events...')
    for element in dataTypes.sequence:
        print(element.index,')  driver:',element.driver.name, end=' ')
        for analog in element.recip:
            print('   recip :', analog.name)
        for unit in element.phase_set:
            if type(unit) == dataTypes.GroupUnit or type(unit) == dataTypes.PropUnit:
                print('    ',unit.name)
            elif type(unit) == str:
                print('    ',unit)
            else:
                print('    ',str(unit))
        if element.update_hebbs:
            print('    * * update hebbs * *')
