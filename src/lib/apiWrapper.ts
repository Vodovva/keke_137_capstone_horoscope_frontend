import axios from 'axios';
import { TokenType, UserFormDataType, UserType} from '../types';


const horoscopeUrl: string  = 'https://horoscope-app-api.vercel.app/api/v1/get-horoscope';
const baseURL:string = 'https://daily-horoscopes.onrender.com'
const userEndpoint: string = '/users';
const tokenEndpoint: string = '/token';
// const postEndpoint: string = '/posts';

export const fetchHoroscope = async (sign: string) => {
    try {
        const response = await axios.get(`${horoscopeUrl}/daily?sign=${sign}&day=today`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the horoscope:', error);
        throw error;
    }
};

const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})


type APIResponse<T> = {
    error?: string,
    data?: T
}
// Making HTTP request
async function register(newUserData:UserFormDataType): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}


async function login(username:string, password:string): Promise<APIResponse<TokenType>> {
    let error;
    let data;
    try{
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}


async function getMe(token:string): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me');
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}


async function getAllUser(): Promise<APIResponse<UserType[]>> {
    let error;
    let data;
    try {
        const response = await apiClientNoAuth().get(userEndpoint)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}


async function createuser(token:string, newUser:UserFormDataType): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).signForm(userEndpoint, newUser);
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}


async function getUserId(userId:string): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response = await apiClientNoAuth().get(userEndpoint + '/' + userId)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}


async function editUserId(token:string, postId:string|number, editedUserData:Partial<UserFormDataType>): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).put(userEndpoint + '/' + postId, editedUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}


async function deleteUserId(token:string, userId:string|number): Promise<APIResponse<string>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).delete(userEndpoint + '/' + userId);
        data = response.data.success
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}


export {
    register,
    login,
    getMe,
    createuser,
    getUserId,
    editUserId,
    deleteUserId,
}
