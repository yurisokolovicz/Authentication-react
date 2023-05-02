import { redirect } from 'react-router-dom';

export function action() {
    // remove the token from the local storage
    localStorage.removeItem('token');
    // remove the expiration date from the local storage
    localStorage.removeItem('expiration');
    return redirect('/');
}
