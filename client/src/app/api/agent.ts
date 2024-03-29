import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginatedResponse } from '../models/pagination';
import { store } from '../../store/configureStore';
import { router } from '../router/Routes';

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})
axios.interceptors.response.use(async (response) => { 
    await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        console.log(response);
        return response;
    }
    return response;
}, (error: AxiosError) => {
    //console.log('caught by interceptor');
    const { data, status } = error.response as any;
    //const { data, status } = error.response!;    
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            // history.push(
            //     { pathname: '/server-error' },
            //     { state: error }
            // );
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})
const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params, headers: { "Access-Control-Allow-Credentials": "true" }},).then(responseBody),
    //get: (url: string) => axios.get(url, { headers: { "Access-Control-Allow-Credentials": "true" } }).then(responseBody),
    post: (url: string, body:{}) => axios.post(url, body,{ headers: { "Access-Control-Allow-Credentials": "true" } }).then(responseBody),
    put: (url: string, body:{}) => axios.put(url, body,{ headers: { "Access-Control-Allow-Credentials": "true" } }).then(responseBody),
    delete: (url: string) => axios.delete(url,{ headers: { "Access-Control-Allow-Credentials": "true" } }).then(responseBody)
}

// const requests = {
//     get: (url: string) => axios.get(url).then(responseBody),
//     post: (url: string, body:{}) => axios.post(url, body).then(responseBody),
//     put: (url: string, body:{}) => axios.put(url, body).then(responseBody),
//     delete: (url: string) => axios.delete(url).then(responseBody)
// }

const Catalog = {
    list: (params: URLSearchParams) => requests.get('products',params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: ()=>requests.get(`products/filters`),
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem:(productId:number,quantity=1)=> requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}


const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error')
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: ()=> requests.get('account/currentUser')
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account
}



export default agent;
/* function responseBodyFn(response: AxiosResponse) {
    return response.data;
} */