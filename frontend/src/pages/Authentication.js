import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
    return <AuthForm />;
}

export default AuthenticationPage;

// This action will be triggered when the user submits the form (AuthForm.js).
// The steps below is to obtain the data from the form and send it to the backend.
export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login ';

    if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: 'Unsupported mode.' }, { status: 422 });
    }

    const data = await request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password')
    };

    // The request is made based on the mode (login or signup).
    const response = await fetch('http://localhost:8080/' + mode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    });

    // 422: Unprocessable Content
    // 401: unauthenticated - login with invalid credentials
    if (response.status === 422 || response.status === 401) {
        return response;
    }
    // 500: Internal Server Error. The server has encountered a situation it does not know how to handle.
    if (!response.ok) {
        throw json({ message: 'Could not authenticate user' }, { status: 500 });
    }

    // Manage (extract) the token data from the back-end
    const resData = await response.json();
    const token = resData.token;

    // Store the token in the local storage
    localStorage.setItem('token', token);
    // We also should store the expiration date of the token in the local storage
    // The code below create a date that is 1 h in the future
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    // now we are storing the expiration date as string in the local storage
    localStorage.setItem('expiration', expiration.toISOString());

    // Once we are logged in, we are redirected to the home page
    return redirect('/');
}
