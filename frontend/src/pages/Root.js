import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
    // const navigation = useNavigation();
    const token = useLoaderData();
    const submit = useSubmit();
    // useSubmit is to send the logout request Form from MainNavigation.js to the backend
    useEffect(() => {
        if (!token) {
            return;
        }

        setTimeout(() => {
            submit(null, { action: '/logout', method: 'post' });
        }, 1 * 60 * 60 * 1000); // 1 * 60 * 60 * 1000 = 1 hour in milliseconds.
    }, [token, submit]);

    return (
        <>
            <MainNavigation />
            <main>
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
