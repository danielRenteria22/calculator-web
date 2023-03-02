import {POST} from './requestHelper.js'

export async function login_request(username,password){
    let body = {
        username,
        password
    }
    return await POST(`user/login`,body)
}

export async function registerUser(username,password) {
    let body = {
        username,
        password
    }
    return await POST(`user/create`,body)
}