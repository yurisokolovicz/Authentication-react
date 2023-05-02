import { redirect } from 'react-router-dom';

export function getTokenDuration() {
    // Extract the expiration date from the local storage
    const storedExpirationDate = localStorage.getItem('expiration');
    // Transforming the storedExpirationDate from string to date
    const expirationDate = new Date(storedExpirationDate);
    // get the current date (time now)
    const now = new Date();
    // calculate the difference between the expiration date and the current date
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

// Function to extract the token from the local storage
const getAuthToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null; // just return will be undefined (will not work)
    }

    // Using the token duration
    const tokenDuration = getTokenDuration();
    // check if the token is valid
    if (tokenDuration <= 0) {
        return 'EXPIRED';
    }

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
