import { NavLink, useRouteLoaderData } from 'react-router-dom';

import styles from './EventsNavigation.module.css';

function EventsNavigation() {
    const token = useRouteLoaderData('root'); // getting the loader data from the root route

    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.list}>
                    <li>
                        <NavLink to="/events" className={({ isActive }) => (isActive ? styles.active : undefined)} end>
                            All Events
                        </NavLink>
                    </li>
                    {token && (
                        <li>
                            <NavLink to="/events/new" className={({ isActive }) => (isActive ? styles.active : undefined)}>
                                New Event
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default EventsNavigation;
