import  { useContext, useState} from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { UpdateEventContext } from './UpdateEventContext'


const UpdateEvent = () => {
    
    const [updateEventInfo, setUpdateEventInfo] = useContext(UpdateEventContext)

    const updateForm = (e: { target: { name: any; value: any } }) => {
        setUpdateEventInfo({...updateEventInfo, [e.target.name]: e.target.value})
    }


    const postData = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const url = "http://localhost:8000/event/" + updateEventInfo['EventId']

        const response = await fetch(url, {
            method: "PUT",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              eventname: updateEventInfo['EventName'],
              no_of_registered_users: updateEventInfo['No_of_registered_users'],
              attendees: updateEventInfo["Attendees"],
              date: updateEventInfo['Date'],
              time: updateEventInfo['Time']
            })
        })

        response.json().then(resp => {
            if (resp.status === 'ok') {
                alert("Event updated");
            }
            else {
                alert("Failed to update event")
            }
        })

        setUpdateEventInfo({
            EventName: "",
            No_of_registered_users: "",
            Attendees: "",
            Date: "",
            Time: "",
            EvenId: ""
        })
    }

    return (
       <Card>
			<Card.Body>
				<Form  onSubmit={postData} >
					<Form.Group controlId='EventName'>
						<Form.Label>Event Name</Form.Label>
						<Form.Control
							type='text'
							name='EventName'
							value={updateEventInfo.EventName}
							onChange={updateForm}
							placeholder='Event Name'
						/>
					</Form.Group>

					<Form.Group controlId='No_of_registered_users'>
						<Form.Label>No of Registered Users</Form.Label>
						<Form.Control
							type='number'
							name='No_of_registered_users'
							value={updateEventInfo.No_of_registered_users}
							onChange={updateForm}
							placeholder='No. of Registered Users'
						/>
					</Form.Group>

					<Form.Group controlId='Attendees'>
						<Form.Label>Quantity Sold</Form.Label>
						<Form.Control
							type='number'
							name='Attendees'
							value={updateEventInfo.Attendees}
							onChange={updateForm}
							placeholder='Attendees'
						/>
					</Form.Group>

					<Form.Group controlId='Date'>
						<Form.Label>Date</Form.Label>
						<Form.Control
							type='number'
							name='Date'
							value={updateEventInfo.Date}
							onChange={updateForm}
							placeholder='Date'
						/>
					</Form.Group>

					<Form.Group controlId='Time'>
						<Form.Label>Time</Form.Label>
						<Form.Control
							type='number'
							name='Time'
							value={updateEventInfo.Time}
							onChange={updateForm}
							placeholder='Time'
						/>
					</Form.Group>

					<Form.Group controlId='Admin'>
						<Form.Label>Admin</Form.Label>
						<Form.Control
							type='number'
							name='Admin'
							value={updateEventInfo.Admin}
							onChange={updateForm}
							placeholder='Admin'
						/>
					</Form.Group>

					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</Card.Body>
		</Card>
    )
}

export default UpdateEvent 