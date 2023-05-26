import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';

interface Entry {
  id: number;
  name: string;
  email: string;
  phone: string;
  checkbox_values: string[];
}

function Submissions() {
  const [allEntries, setAllEntries] = useState<Entry[]>([]);
  const [displayDetail, setDisplay] = useState(false);
  const [singleEntry, setSingleEntry] = useState<Entry>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    checkbox_values: [],
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('/entries');
      setAllEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const saveEntry = async (entry: Entry) => {
    try {
      const response = await axios.post('/entries', entry);
      console.log('Entry saved:', response.data);
      fetchEntries();
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const handleCheckVal = (ty: string, entry: Entry) => {
    let val = '';
    if (entry.checkbox_values.length > 0) {
      val = entry.checkbox_values.filter((item) => item.split('_')[0] === ty)[0];
      val = val.split('_')[1];
    }
    return val;
  };

  const singleEntryForm = () => {
    return (
      <Container>
        <Card>
          <Card.Header>
            <cite title="Source Title">Feedback Details </cite>{' '}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>Employee Name</Col>
              <Col>{singleEntry.name}</Col>
            </Row>
            <Row>
              <Col>Email</Col>
              <Col>{singleEntry.email}</Col>
            </Row>
            <Row>
              <Col>Phone</Col>
              <Col>{singleEntry.phone}</Col>
            </Row>
            {Object.keys(feedback_type).map((ty) => (
              <Row key={ty}>
                <Col>{feedback_type[ty]}</Col>
                <Col>{handleCheckVal(ty, singleEntry)}</Col>
              </Row>
            ))}
          </Card.Body>
        </Card>
      </Container>
    );
  };

  const feedback_type: { [key: string]: string } = {
    qos: 'Please rate the quality of the event you attended.',
    qob: 'Please rate the content of the event.',
    roc: 'Was the event productive for you?',
    exp: 'Please rate your overall event experience.',
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
  
    const newEntry: Entry = {
      id: 0,
      name: '',
      email: '',
      phone: '',
      checkbox_values: [],
    };
  
    
    const formData = new FormData(event.currentTarget);
    newEntry.name = formData.get('name') as string;
    newEntry.email = formData.get('email') as string;
    newEntry.phone = formData.get('phone') as string;
    
    const checkboxValues = Array.from(formData.entries())
      .filter(([name, value]) => name.startsWith('checkbox_') && value === 'on')
      .map(([name]) => name.substr('checkbox_'.length));
    newEntry.checkbox_values = checkboxValues;
  
    try {
    
      const response = await axios.post('/api/entries', newEntry);
      console.log('Entry saved successfully:', response.data);
  
      
      event.currentTarget.reset();
      alert('Entry saved successfully!');
    } catch (error) {
      console.error('Error saving entry:', error);
  
      alert('An error occurred while saving the entry. Please try again.');
    }
  };

  return (
    <>
      {displayDetail ? (
        singleEntryForm()
      ) : (
        <div className="padding30px">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Form Details</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Phone</th>
                {Object.keys(feedback_type).map((ty) => (
                  <th key={ty}>{feedback_type[ty]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allEntries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <a href={`/submission/${entry.id}`}target="_blank" rel="noopener noreferrer">View Details</a></td>
                                <td>{entry['name']}</td>
                                <td>{entry['email']}</td>
                                <td>{entry['phone']}</td>

                                {Object.keys(feedback_type).map((ty)=>(
                                    <td>{handleCheckVal(ty,entry)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>)
        }
        </>
    );
}

export default Submissions;

