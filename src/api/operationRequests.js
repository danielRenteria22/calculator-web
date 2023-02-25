import {POST} from './requestHelper.js'

export async function execute_operation(operand_1,operand_2,operation_type){
    let body = {
        operand_1,
        operand_2,
        operation_type
    }
    return await POST(`operation/execute`,body)
}

export async function listOperations(body) {
    return await POST(`operation/list`,body)
}