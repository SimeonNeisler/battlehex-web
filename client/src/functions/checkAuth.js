export default function checkAuth() {
    let token  = localStorage.getItem("authToken");
    return true;
}