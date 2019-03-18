import jwt from 'jsonwebtoken';

export default function checkAuth() {
    let token  = localStorage.getItem("AuthToken");
    console.log(token);
    if(!token) {
        return false;
    } else {
        let decodedToken = jwt.decode(token);
        console.log("Exp: " + decodedToken.exp);
        console.log("Time: " + Date.now()/1000);
        if(decodedToken.exp < Date.now()/1000) {
            localStorage.removeItem("AuthToken");
            return false;
        } else {
            return true;
        }
    }
}