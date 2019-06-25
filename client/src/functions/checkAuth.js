import jwt from 'jsonwebtoken';

export default function checkAuth() {
    let token  = localStorage.getItem("AuthToken");
    console.log(token);
    if(!token) {
        return false;
    } else {
        let decodedToken = jwt.decode(token);
        if(decodedToken.exp < Date.now()/1000) {
            localStorage.removeItem("AuthToken");
            return false;
        } else {
            return true;
        }
    }
}