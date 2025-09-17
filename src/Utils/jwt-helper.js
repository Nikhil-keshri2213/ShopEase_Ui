import {jwtDecode} from 'jwt-decode'

export const saveToken = (Token) =>{
    localStorage.setItem('authToken',Token);
}

export const logOut = () =>{
    localStorage.clear();
}

export const isTokenValid = () =>{
    const token = localStorage.getItem('jwtToken');
    if(!token) return false;

    try {
        const decode = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decode.exp > currentTime;
    } catch (error) {
        console.error("Invalid Token", error);
        return false;
    }
}