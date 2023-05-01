import { redirect } from 'react-router-dom';

// Function to extract the token from the local storage
const getAuthToken = () => {
    const token = localStorage.getItem('token');

    return token;
};

export function tokenLoader() {
    return getAuthToken();
}

export default getAuthToken;

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }

    return null;
}
// We are using hte checkAuthLoader to protect the user to access the routes without being authenticated. For example, without this protection, the user can access the /events/new route without being authenticated. The protection is used in App.js importing checkAuthLoader and using it as loader.
