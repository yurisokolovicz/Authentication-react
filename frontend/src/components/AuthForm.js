import { Form, Link, useSearchParams } from 'react-router-dom';
// useSearchParams is used to read the query parameters from the URL.

import styles from './AuthForm.module.css';

function AuthForm() {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    return (
        <>
            <Form method="post" className={styles.form}>
                <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="image">Password</label>
                    <input id="password" type="password" name="password" required />
                </p>
                <div className={styles.actions}>
                    <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>{isLogin ? 'Create new user' : 'Login'}</Link>
                    <button>Save</button>
                </div>
            </Form>
        </>
    );
}

export default AuthForm;

// in the login the url will be http://localhost:3000/auth?mode=login
// in create new user the url will be http://localhost:3000/auth?mode=signup
