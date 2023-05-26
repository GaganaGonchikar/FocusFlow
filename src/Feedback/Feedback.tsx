import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

interface Entry {
  id: number;
  email: string;
  name: string;
  phone: string;
  checkbox_values: string[];
}

function FeedbackForm() {
  const [displayform, setDisplay] = useState(true);
  const [em_value, setEmValue] = useState('');
  const [nm_value, setNmValue] = useState('');
  const [ph_value, setPhValue] = useState('');

  const [checked_val, setCheckBoxChecked] = useState<string[]>([]);
  const [error_msg, setErrorMsg] = useState('Please enter the value for the above field');

  const handleOnChange = (isChecked: boolean, value: string) => {
    let temp = [...checked_val];
    var pre = value.split('_')[0];
    if (isChecked) {
      temp = temp.filter(item => item.split('_')[0] !== pre);
      temp.push(value);
      setCheckBoxChecked(temp);
      return;
    }

    setCheckBoxChecked(temp.filter(item => item !== value));
  };

  const validateForm = (): boolean => {
    setErrorMsg('Please enter the value for the above field');

    [...document.getElementsByClassName('alert-danger')].forEach(element => {
      (element as HTMLElement).style.display = 'none';
    });

    if (nm_value === '') {
      document.getElementById('name_er')!.style.display = 'block';
    } else if (em_value === '') {
      document.getElementById('email_er')!.style.display = 'block';
    } else if (!em_value.includes('.com') || (!em_value.includes('@'))) {
      document.getElementById('email_er')!.style.display = 'block';
      setErrorMsg('Invalid Email');
    // } // else if (!ph_value) {
    //   document.getElementById('phone_er')!.style.display = 'block';
    // } else if (ph_value.length < 13) {
    //   document.getElementById('phone_er')!.style.display = 'block';
    //   setErrorMsg('Invalid Phone number');
    } else if (checked_val.length < Object.keys(feedback_type).length) {
      let keys = Object.keys(feedback_type);
      checked_val.map((val) => {
        keys = keys.filter(item => item !== val.split('_')[0]);
      });
      keys.map(val => {
        document.getElementById('er_' + val)!.style.display = 'block';
      });
    } else {
      return true;
    }

    return false;
  };
  async function postData(url: string, data: any) {
    console.log(data)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Request failed');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const existingEntries: Entry[] = JSON.parse(localStorage.getItem('allEntries') || '[]');
      let new_id = 0;
      if (existingEntries.length > 0) {
        let lastEntry = existingEntries.slice(-1)[0];
        new_id = lastEntry.id;
      }
      
      const entry: Entry = {
        id: new_id,
        email: em_value,
        name: nm_value,
        phone: "+919999999999",
        checkbox_values: checked_val,
      };
      existingEntries.push(entry);
      const url= "http://127.0.0.1:8000/add_feedback";
      
      // postData(url, entry)
      // const apiUrl = 'https://api.example.com/endpoint';
      // const postData = {
      //   name: 'John Doe',
      //   email: 'johndoe@example.com',
      // };

      axios.post(url, entry)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      setDisplay(false);
    }
  };

  const feedback_type: { [key: string]: string } = {
    'qos': 'Please rate the quality of the service you received from your host.',
    'qob': 'Please rate the quality of your attended event.',
    'roc': 'Was the event productive for you?',
    'exp': 'Please rate your overall event experience.',
  };

  const feedback_opts = ['Excellent', 'Good', 'Fair', 'Bad'];

  return (
    <Container>
      {displayform ? (
        <Card>
          <Card.Header>
            <cite title="Source Title">
              We are committed to providing you with the best experience possible, so we welcome your comments.
            </cite>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              Please fill out this feedback form.
            </blockquote>
          </Card.Body>
          <Container className="padding30px">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field"> Name</Form.Label>
                    <Form.Control type="text" required placeholder="E.g. jon snow" value={nm_value} onChange={e => setNmValue(e.target.value)} />
                  </Form.Group>
                  <Alert variant="danger" id="name_er">
                    &#9432;{error_msg}
                  </Alert>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">Email address</Form.Label>
                    <Form.Control type="email" required placeholder="E.g. abc@gmail.com" value={em_value} onChange={e => setEmValue(e.target.value)} />
                  </Form.Group>
                  <Alert variant="danger" id="email_er">
                    &#9432;{error_msg}
                  </Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">Phone</Form.Label>
                    <InputGroup>
                      <PhoneInput
                        placeholder="9999999999"
                        value={ph_value}
                        onChange={event => setPhValue} />
                    </InputGroup>
                  </Form.Group>
                  <Alert variant="danger" id="phone_er">
                    &#9432;{error_msg}
                  </Alert>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                {Object.keys(feedback_type).map((ty) => (
                  <>
                    <Col>
                      <Form.Group className="mb-3" controlId={ty}>
                        <Form.Label className="required-field">{feedback_type[ty]}</Form.Label>
                        <InputGroup>
                          <div className="mb-3">
                            {feedback_opts.map((opt, key) => (
                              <Form.Check
                                inline
                                label={opt}
                                name={`${ty}_feedback_opts`}
                                id={`${ty}_${key}`}
                                checked={checked_val.includes(ty + '_' + opt)}
                                onChange={e => handleOnChange(e.target.checked, ty + '_' + opt)}
                                type="checkbox"
                                value={opt}
                              />
                            ))}
                          </div>
                        </InputGroup>
                      </Form.Group>
                      <Alert variant="danger" id={`er_${ty}`}>
                        &#9432;{error_msg}
                      </Alert>
                    </Col>
                    {(ty === 'qob' || ty === 'exp') ? <Row /> : null}
                  </>
                ))}
              </Row>
              <Button className="btn_purp" onClick={e => formSubmit(e)}>Submit Review</Button>
            </Form>
          </Container>
        </Card>
      ) : (
          <Card bg="light" text="dark">
            <Card.Body>
              <div className="padding30px">
                <div className="circle">
                  <div className="checkmark"></div>
                </div>
              </div>
              <Card.Text>
                Thank you for providing the feedback
            </Card.Text>
              <Form.Text muted>
                We will work towards improving your experience
            </Form.Text>
              <div className="padding30px">
                <Button className="btn_purp" onClick={() => window.location.href = '/submissions'}>Close</Button>
              </div>
            </Card.Body>
          </Card>
        )}
    </Container>
  );
}

export default FeedbackForm;
