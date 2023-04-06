import react from 'react'

function EventsRow({ id, eventname, no_of_registered_users, attendees, date, time, handleDelete, handleUpdate, handleAdmin }): JSX.Element {
    return (
        <tr>
            <td>{id}</td>
            <td>{eventname}</td>
            <td>{no_of_registered_users}</td>
            <td>{attendees}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>
                <button onClick={() => handleUpdate(id)} className="btn btn-outline-info btn-sm ml-1 mr-2">Update</button>
                <button onClick={() => handleAdmin(id)} className="btn btn-outline-success btn-sm mr-2">Admin</button>
                <button onClick={() => handleDelete(id)} className="btn btn-outline-danger btn-sm mr-2">Delete</button>
            </td>
        </tr>
    );
}

export default EventsRow