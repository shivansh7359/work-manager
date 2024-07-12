import { httpAxios } from "../helper/httpHelper";


export async function signUp(user){

    const result = await httpAxios.post("/api/users", user)
    .then((response) => response.data)

    return result
};


export async function login(LoginData){
    const result = await httpAxios.post("/api/login", LoginData)
    .then((response) => response.data)

    return result
};


export async function currentUser(){
    const result = await httpAxios.get("/api/current")
    .then((response) => response.data)

    return result
};


export async function logout(){
    const result = await httpAxios.post("/api/logout")
    .then((response) => response.data)

    return result
}




