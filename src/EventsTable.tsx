import react, {useEffect, useContext} from 'react'
import { Table } from 'react-bootstrap'
import { EventContext } from './EventContext'
import { UpdateEventContext } from './UpdateEventContext'
import {AdminContext} from './AdminContext'
import EventsRow from './EventsRow'
import {useHistory} from 'react-router-dom'

const ProductsTable = () => {
    const [events, setEvents] = useContext(EventContext)
    const [ setUpdateEventInfo] = useContext(UpdateEventContext)
    const [ setAdminDetail] = useContext(AdminContext)

    let history = useHistory()

    const handleDelete = (id: string) => {
        fetch("http://127.0.0.1:8000/product/" + id, {
            method: "DELETE",
            headers: {
                accept: 'application/json'
            }
        })
            .then(resp => {
            return resp.json()
            })
            .then(result => {
                if (result.status === 'ok') {
                    const filteredProducts = events.data.filter((event: { id: any }) => event.id !== id);
                    setEvents({ data: [...filteredProducts] })
                    alert("Event deleted")
                } else {
                    alert("Event deletion failed")
            }
        })
    }

    const handleUpdate = (id: any) => {
        const event = events.data.filter((event: { id: any }) => event.id === id)[0]
        setUpdateEventInfo({
            EventName: event.eventname,
            No_of_registered_users: event.no_of_registered_users,
            Attendees: event.attendees,
            Date: event.date,
            Time: event.time,
            Id: id
        })
        history.push("/updateevent")
    }

    const handleAdmin = (id: string) => {
        console.log(id)
        fetch("http://localhost:8000/supplier/" + id, {
            headers: {
                Accept: 'application/json'
            }
        }).then(resp => {
            return resp.json()
        }).then(result => {
            if (result.status === 'ok') {
                setAdminDetail({ ...result.data })
                history.push("/adminpage")
            }
            else {
                alert("error")
            }
        })

    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/product")
            .then(resp => {
                return resp.json();
            }).then(results => {
                setEvents({ "data": [...results.data] })

        })
    }, [])


    console.log(events.data)
    return (
        <div>
            <Table striped bordered hover>
				<thead>
					<tr>
						<th>Id</th>
						<th>Product Name</th>
						<th>Quantity In Stock</th>
						<th>Quantity Sold</th>
						<th>Unit Price</th>
						<th>Revenue</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
                    {events.data.map((event: { id: react.Key | null | undefined; eventname: any; no_of_registered_users: any; attendees: any; date: any; time: any; unit_price: any; eventid: any }) => (
                        <EventsRow
                            eventid = {event.eventid}
                            eventname = {event.eventname}
                            no_of_registered_users = {event.no_of_registered_users}
                            attendees = {event.attendees}
                            unit_price = {event.unit_price}
                            time = {event.time}
                            key={event.id}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                            handleAdmin={handleAdmin}
                        />
                    ))}
				</tbody>
			</Table>
        </div>
    );
}


export default EventsTable;