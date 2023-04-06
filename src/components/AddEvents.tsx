import react, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'



const AddEvents = () => {

    const [eventInfo, setEventInfo] = useState(
        {
            EventName: "",
            No_of_registered_users: "",
            Attendees: "",
            Date: "",
            Time: "",
            Admin: ""
        }
    )

    const updateForm = (e: { target: { name: any; value: any } }) => {
        setEventInfo(
            {...eventInfo, [e.target.name] : e.target.value}
        )
    }

    const postData = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(eventInfo)
    
        const url = "http://localhost:8000/product/" + eventInfo['Admin'] 

        const response = await fetch(
            url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin', 
                headers: {
                'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer', 
                body: JSON.stringify({
                    "name": eventInfo['EventName'],
                    "no_of_registered_users": eventInfo['No_of_registered_users'],
                    "attendees": eventInfo['Attendees'],
                    "date": eventInfo['Date'],
                    "time": eventInfo['Time']
                }) 
            });
        response.json().then(response => {
            if (response.status === 'ok') {
                alert("Event added successfully")
            } else {
                alert("Failed to add product")
            }
        });
        setEventInfo({
            EventName: "",
            No_of_registered_users: "",
            Attendees: "",
            Date : "",
            Time : "",
            Admin : ""
        });
    }


    return (
        <Card>
            <Card.Body>
                <Form onSubmit = {postData}>
                    <Form.Group controlId="EventName">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control type="text" name="EventName" 
                            value={eventInfo.EventName} onChange = {updateForm} placeholder="Event Name" />
                    </Form.Group>

                    <Form.Group controlId="No_of_registered_users">
                        <Form.Label>No of registered users</Form.Label>
                        <Form.Control type="number" name="No_of_registered_users"
                        value={eventInfo.No_of_registered_users} onChange = {updateForm}     placeholder="No_of_registered_users" />
                    </Form.Group>

                    <Form.Group controlId="Attendees">
                        <Form.Label>Attendees</Form.Label>
                        <Form.Control type="number" name="Attendees" value={eventInfo.Attendees} onChange = {updateForm}  placeholder="Attendees" />
                    </Form.Group>

                    <Form.Group controlId="Date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="Date" name="Date" value={eventInfo.Date} onChange = {updateForm}  placeholder="Date" />
                    </Form.Group>

                    <Form.Group controlId="Time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="number" name="Time" value={eventInfo.Time} onChange = {updateForm}  
                            placeholder="Time" />
                    </Form.Group>

                    <Form.Group controlId="Admin">
                        <Form.Label>Admin</Form.Label>
                        <Form.Control type="number" name="Admin" value={eventInfo.Admin} onChange = {updateForm}  
                            placeholder="Admin" />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}


export default AddEvents