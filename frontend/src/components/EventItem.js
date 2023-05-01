import { Link, useSubmit, useRouteLoaderData } from 'react-router-dom';

import styles from './EventItem.module.css';

function EventItem({ event }) {
    const token = useRouteLoaderData('root');
    const submit = useSubmit();

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            submit(null, { method: 'delete' });
        }
    }

    return (
        <article className={styles.event}>
            <img src={event.image} alt={event.title} />
            <h1>{event.title}</h1>
            <time>{event.date}</time>
            <p>{event.description}</p>
            {/* Conditionally show the menu (edit and delete) - only if we have a token */}
            {token && (
                <menu className={styles.actions}>
                    <Link to="edit">Edit</Link>
                    <button onClick={startDeleteHandler}>Delete</button>
                </menu>
            )}
        </article>
    );
}

export default EventItem;
