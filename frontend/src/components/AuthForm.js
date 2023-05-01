import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';
// useSearchParams is used to read the query parameters from the URL.
// useActionData is used to read the data from the action.

import styles from './AuthForm.module.css';

function AuthForm() {
    const data = useActionData();
    const navigation = useNavigation();

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';

    return (
        <>
            <Form method="post" className={styles.form}>
                <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
                {data && data.errors && (
                    <ul>
                        {Object.values(data.errors).map(err => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
                {data && data.message && <p>{data.message}</p>}
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
                    <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
                </div>
            </Form>
        </>
    );
}

export default AuthForm;

// in the login the url will be http://localhost:3000/auth?mode=login
// in create new user the url will be http://localhost:3000/auth?mode=signup
