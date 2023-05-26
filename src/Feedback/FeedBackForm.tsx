// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Feedback.css';
import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import React from 'react';
import StickyHeader from './headers';
import FeedbackForm from './Feedback';
// import Submissions from './Users/FeedbackSubmission';

const Feedback: React.FC = () => {
  return (
    <div className="App">
      <StickyHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FeedbackForm />}/>
          {/* <Route path="submissions" element={<Submissions />} />
          <Route path="submission/:id" element={<Submissions />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Feedback;
