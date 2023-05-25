import React, { useState, useEffect } from 'react';
import "./Preference.css";
import axios from 'axios';

type QuestionnaireProps = {
  onFinished: (answers: string[]) => void;
};

enum Question {
  NTID,
  INTERESTED_TOPICS,
  EVENT_TYPE_PREFERENCE,
  AVAILABLE_DAYS,
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onFinished }) => {
  const [currentQuestion, setCurrentQuestion] = useState(Question.NTID);
  const [answers, setAnswers] = useState<string[]>([]);
  const [ntid, setNtid] = useState('');
  const [interestedTopics, setInterestedTopics] = useState('');
  const [eventTypePreference, setEventTypePreference] = useState('');
  const [availableDays, setAvailableDays] = useState('');
  const [error, setError] = useState('');

  const handleNextClick = () => {
    if (currentQuestion === Question.NTID) {
        if (!ntid) {
          setError('NTID is required*');
          return;
        }
        if (ntid.length < 5) {
          setError('NTID must be at least 5 characters');
          return;
        }
      }
  
    switch (currentQuestion) {
      case Question.NTID:
        setCurrentQuestion(Question.INTERESTED_TOPICS);
        break;
      case Question.INTERESTED_TOPICS:
        setCurrentQuestion(Question.EVENT_TYPE_PREFERENCE);
        break;
      case Question.EVENT_TYPE_PREFERENCE:
        setCurrentQuestion(Question.AVAILABLE_DAYS);
        break;
      case Question.AVAILABLE_DAYS:
        handleSubmit();
        break;
      default:
        break;
        
    }
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('ntid', ntid);
    queryParams.append('interestedTopics', interestedTopics);
    queryParams.append('eventTypePreference', eventTypePreference);
    queryParams.append('availableDays', availableDays);
  
    const url = `http://localhost:8000/questionnaire?${queryParams.toString()}`;
  
    // You can use the 'url' variable to send the answers to the backend or perform any other action
    console.log(url);
    onFinished(answers);
    alert("Noted - we'll tailor your experience to your preferences!");
  };
  

  

  const handlePreviousClick = () => {
    switch (currentQuestion) {
      case Question.INTERESTED_TOPICS:
        setCurrentQuestion(Question.NTID);
        break;
      case Question.EVENT_TYPE_PREFERENCE:
        setCurrentQuestion(Question.INTERESTED_TOPICS);
        break;
      case Question.AVAILABLE_DAYS:
        setCurrentQuestion(Question.EVENT_TYPE_PREFERENCE);
        break;
      default:
        break;
    }
  };

  const handleSkipClick = () => {
    switch (currentQuestion) {
      case Question.NTID:
        onFinished([]);
        break;
      case Question.INTERESTED_TOPICS:
        setCurrentQuestion(Question.EVENT_TYPE_PREFERENCE);
        break;
      case Question.EVENT_TYPE_PREFERENCE:
        setCurrentQuestion(Question.AVAILABLE_DAYS);
        break;
      case Question.AVAILABLE_DAYS:
        onFinished(answers);
        break;
      default:
        break;
    }
  };

  const handleAnswer = (answer: string) => {
    const answerIndex = answers.indexOf(answer);
    if (answerIndex > -1) {
      // Answer already selected, so remove it
      const newAnswers = [...answers];
      newAnswers.splice(answerIndex, 1);
      setAnswers(newAnswers);
    } else {
      // Answer not selected, so add it
      setAnswers([...answers, answer]);
    }
    setAvailableDays(answers.join(',')); // Update availableDays with selected days
  };
  
  

  const renderProgressBar = () => {
    const numQuestions = Object.keys(Question).length / 2; // divide by 2 to ignore string values
    const currentStep = currentQuestion + 1;
    const percentComplete = (currentStep / numQuestions) * 100;
    return (
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percentComplete}%` }} />
      </div>
    );
  };

  const renderCurrentQuestion = () => {
    switch (currentQuestion) {
      case Question.NTID:
        return (
          <div className="question">
            <label htmlFor="ntid-input">Enter your NTID:</label>
            <input id="ntid-input" type="text" value={ntid} onChange={(e) => setNtid(e.target.value)} />
            {error && <p className="error-message">{error}</p>} {/* Display the error message */}
          </div>
        );
        case Question.INTERESTED_TOPICS:
          return (
            <div className="question">
              <label htmlFor="interested-topics-dropdown">1. Which topics are you interested in?</label>
              <select id="interested-topics-dropdown" value={interestedTopics} onChange={(e) => setInterestedTopics(e.target.value)}>
                <option value="">Please select an option</option>
                <option value="Technology">Technology</option>
                <option value="Art">Art</option>
                <option value="Science">Science</option>
                <option value="Business">Business</option>
              </select>
            </div>
          );
    case Question.EVENT_TYPE_PREFERENCE:
      return (
        <div className="question">
          <label htmlFor="event-type-preference-dropdown">2. What type of events do you prefer?</label>
          <select id="event-type-preference-dropdown" value={eventTypePreference} onChange={(e) => setEventTypePreference(e.target.value)}>
    <option value="">Please select an option</option>
    <option value="Workshops">Workshops</option>
    <option value="Seminars">Seminars</option>
    <option value="Networking events">Networking events</option>
    <option value="Social events">Social events</option>
  </select>
</div>
);
  case Question.AVAILABLE_DAYS:
    return (
      <div className="question">
        <label htmlFor="available-days-dropdown">3. Which days are you available?</label>
        <select id="available-days-dropdown" value={availableDays} onChange={(e) => setAvailableDays(e.target.value)}>
          <option value="">Please select an option</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="Holidays">Holidays</option>
        </select>
      </div>
    );
    
  default:
    return null;
}
};

return (
  
  <div className="questionnaire-container">
    <img src="https://logos-world.net/wp-content/uploads/2020/08/Bosch-Logo-700x394.png" alt="logo1" className="logo1"/>
    <div className="form-wrapper3">
    <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
    <link href="https://fonts.googleapis.com/css?family=Proxima+Nova&display=swap" rel="stylesheet"></link>
  <h2>EVENT PREFERENCES</h2>
  {renderProgressBar()}
  {renderCurrentQuestion()}
  <div className="buttons-container">
  {currentQuestion !== Question.NTID && (
  <button className="previous-button" onClick={handlePreviousClick}>
  Previous
  </button>
  )}
  {currentQuestion !== Question.AVAILABLE_DAYS && (
  <button className="skip-button" onClick={handleSkipClick}>
  Skip
  </button>
  )}
  {currentQuestion === Question.AVAILABLE_DAYS ? (
  <button className="submit-button" onClick={handleSubmit}>
  Submit
  </button>
  ) : (
  <button className="next-button" onClick={handleNextClick}>
  Next
  </button>
  )}
  </div>
  </div>
  </div>
  );
  };

export default Questionnaire;
