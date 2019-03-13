export default function checkAuth() {
    let token  = localStorage.getItem("AuthToken");
    return true;
}