# outFile.py: All the output file saving routines
import dataTypes

def write_parameter_values():
    # writes the parameters of the simulation to the outpyt file
    dataTypes.out_file.write('\n')
    dataTypes.out_file.write('* * * * * * * * * * * * * * * * * * * * *\n')
    dataTypes.out_file.write('Parameters values:\n')
    if dataTypes.god_like_wm:
        dataTypes.out_file.write('    Unlimited WM\n')
    else:
        dataTypes.out_file.write('    Neurally-plausible WM\n')
    dataTypes.out_file.write('    Semantic Noise = %.4f\n' % dataTypes.semantic_noise)
    dataTypes.out_file.write('    Semantic Death = %.4f\n' % dataTypes.semantic_death)
    dataTypes.out_file.write('    Attention = %.4f\n' % dataTypes.attention)
    dataTypes.out_file.write('    Within-group support = %.4f\n' % dataTypes.within_group_support)
    dataTypes.out_file.write('    Driver Inhibition = %.4f\n' % dataTypes.driver_inhibition)
    dataTypes.out_file.write('    Recip Inhibition = %.4f\n' % dataTypes.recip_inhibition)
    dataTypes.out_file.write('    Hebb Learning Rate = %.4f\n' % dataTypes.hebb_learning_rate)
    if dataTypes.bail_upon_settling:
        dataTypes.out_file.write('    Bail Upon Settling = True\n')
    else:
        dataTypes.out_file.write('    Bail Upon Settling = False\n')
    if dataTypes.vers142_map_alg:
        dataTypes.out_file.write('    Using Vers142 Mapping Algorithm\n')
    else:
        dataTypes.out_file.write('    Using H&H 97/03 Mapping Algorithm\n')
    dataTypes.out_file.write('* * * * * * * * * * * * * * * * * * * * *\n\n')

def write_these_hebbs(the_list, to_analog):
    # writes all the hebbs to to_analog for one class of units (the_list of units) in (implicit) from_analog
    for unit in the_list:
        if unit.has_hebbs(to_analog):
            dataTypes.out_file.write('    From '+unit.name+' to:')
            for hebb_set in unit.hebb_set:
                if hebb_set.target == to_analog:
                    for hebb in hebb_set.hebbs:
                        if hebb.h_unit.weight > 0:
                            #dataTypes.out_file.write('    ['+hebb.recip.name+' = '+str(hebb.h_unit.weight)+']')
                            dataTypes.out_file.write('    '+hebb.recip.name+' = %.3f' % hebb.h_unit.weight)
                            # the above syntax (%.3f) says print a float w/ 3 points precision.
                            # the syntax % hebb.h_unit.weight tells it Which float to print
                    dataTypes.out_file.write('\n') # new line after all hebbs in hebb set written

def write_output_file(simulation):
    # save parameter data, etc.
    
    # save the hebbs by analog
    dataTypes.out_file.write('\n\n')
    dataTypes.out_file.write('* * * * * * * * * * * * * * * *\n')
    dataTypes.out_file.write('* * * Mapping Connections * * *\n')
    dataTypes.out_file.write('* * * * * * * * * * * * * * * *\n')
    for from_analog in simulation['analogs']:
        for to_analog in simulation['analogs']:
            if from_analog != to_analog:
                if from_analog.has_hebbs(to_analog):
                    dataTypes.out_file.write('\n')
                    dataTypes.out_file.write('From '+from_analog.name+' to '+to_analog.name+':\n')
                    # group hebbs
                    if dataTypes.save_group_hebbs:
                        dataTypes.out_file.write('  Groups:\n')
                        write_these_hebbs(from_analog.group, to_analog)
                    # prop hebbs
                    if dataTypes.save_prop_hebbs:
                        dataTypes.out_file.write('  Props:\n')
                        write_these_hebbs(from_analog.prop, to_analog)
                    # sp hebbs
                    if dataTypes.save_sp_hebbs:
                        dataTypes.out_file.write('  SPs:\n')
                        write_these_hebbs(from_analog.sp, to_analog)
                    # op hebbs
                    if dataTypes.save_op_hebbs:
                        dataTypes.out_file.write('  Preds:\n')
                        write_these_hebbs(from_analog.pred, to_analog)
                        dataTypes.out_file.write('  Objs:\n')
                        write_these_hebbs(from_analog.obj, to_analog)
    dataTypes.out_file.write('\n')

    # write inferred units to file
    any_analog_has_inferred_units = False
    for analog in simulation['analogs']:
        if analog.has_inferred_units():
            any_analog_has_inferred_units = True
            break
    if any_analog_has_inferred_units:
        dataTypes.out_file.write('\n\n')
        dataTypes.out_file.write('* * * * * * * * * * * * * * * *\n')
        dataTypes.out_file.write('* * * * Inferred Units  * * * *\n')
        dataTypes.out_file.write('* * * * * * * * * * * * * * * *\n')
        for analog in simulation['analogs']:
            if analog.has_inferred_units():
                dataTypes.out_file.write('\n')
                dataTypes.out_file.write('* * * * * Analog '+analog.name+' * * * * *\n')
                # groups
                dataTypes.out_file.write('\nGroups:\n')
                for group in analog.group:
                    if group.inferred:
                        dataTypes.out_file.write(group.name+':  ')
                        for g2 in group.group:
                            dataTypes.out_file.write(g2.name+' ')
                        for prop in group.prop:
                            dataTypes.out_file.write(prop.name+' ')
                        for sem_link in group.semantic:
                            if sem_link.weight >= dataTypes.min_vertical_wt:
                                dataTypes.out_file.write(sem_link.unit.name+' (%.3f) ' % sem_link.weight)                
                        dataTypes.out_file.write('\n')     # write one group per line
                # props
                dataTypes.out_file.write('\nProps:\n')
                for prop in analog.prop:
                    if prop.inferred:
                        dataTypes.out_file.write(prop.name+':  ')
                        for sp in prop.SPs:
                            if sp.pred == None:
                                dataTypes.out_file.write('[ NIL + ')
                            else:
                                dataTypes.out_file.write('[ '+sp.pred.name+' + ')
                            if sp.obj != None:
                                dataTypes.out_file.write(sp.obj.name+' ] ')
                            elif sp.child_prop != None:
                                dataTypes.out_file.write(sp.child_prop.name+' ] ')
                            else:
                                dataTypes.out_file.write('NIL ] ')
                        dataTypes.out_file.write('\n')     # write one prop per line
                # preds
                dataTypes.out_file.write('\nPreds:\n')
                for pred in analog.pred:
                    if pred.inferred:
                        dataTypes.out_file.write(pred.name+':\n')
                        for sem_link in pred.semantic:
                            if sem_link.weight >= dataTypes.min_vertical_wt:
                                # indent the semantic in proportion to the smallness of its weight
                                indents = round(3 + 10 * (1 - sem_link.weight))
                                for i in range(int(indents)):
                                    dataTypes.out_file.write(' ')
                                dataTypes.out_file.write(sem_link.unit.name+'(%.3f)\n' % sem_link.weight)
                        dataTypes.out_file.write('\n')     # space between preds
                        
                # objs
                dataTypes.out_file.write('\nObjs:\n')
                for obj in analog.obj:
                    if obj.inferred:
                        dataTypes.out_file.write(obj.name+':\n')
                        for sem_link in obj.semantic:
                            if sem_link.weight >= dataTypes.min_vertical_wt:
                                # indent the semantic in proportion to the smallness of its weight
                                indents = round(3 + 10 * (1 - sem_link.weight))
                                for i in range(int(indents)):
                                    dataTypes.out_file.write(' ')
                                dataTypes.out_file.write(sem_link.unit.name+'(%.3f)\n' % sem_link.weight)
                        dataTypes.out_file.write('\n')     # space between objs
                

        
        
