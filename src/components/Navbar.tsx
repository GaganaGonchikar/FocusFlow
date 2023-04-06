import react, {useContext, useState} from "react"
import { Navbar, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {EventContext} from '../EventContext'


const NavBar = () => {
    const [search, setSearch] = useState("")
    const [events, setEvents] = useContext(EventContext)

    const updateSearch = (e) => {
        setSearch(e.target.value)
    }

    const filterEvent = (e) => {
        e.preventDefault()
        const event = events.data.filter(event => event.name.toLowerCase() === search.toLowerCase())
        setEvents({"data" : [...event]})
    }

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home">FOCUS FLOW</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">            
                    <Badge className="mt-2" variant="primary">Events In stock { events.data.length}</Badge>
                </Nav>
                <Form onSubmit={ filterEvent } inline>
                        <Link to="/addevent" className="btn btn-primary btn-sm mr-4">Add Event</Link>
                        <FormControl value = {search} onChange={updateSearch} type="text" placeholder="Search" className="mr-sm-2" />
                <Button type="submit"  variant="outline-primary">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

    );
}

export default NavBar;