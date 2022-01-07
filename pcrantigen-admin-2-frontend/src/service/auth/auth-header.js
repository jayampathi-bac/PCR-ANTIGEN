export default function authHeader() {
    let userToken = JSON.parse(localStorage.getItem('user'));

    if (userToken) {
        return { Authorization:  "Bearer "+userToken };
    } else {
        return {};
    }
}
