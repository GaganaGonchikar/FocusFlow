import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';
// import Header from './../Header';
// import Navigation from './navigation';


const UploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;

    setUploadStatus('loading');
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://127.0.0.1:8000/import-event-data', formData);
      setUploadStatus('success');
    } catch (error) {
      console.error(error);
      setUploadStatus('error');
    }
  };

  let uploadMessage = null;
  switch (uploadStatus) {
    case 'loading':
      uploadMessage = <p>Loading...</p>;
      break;
    case 'success':
      uploadMessage = <p>Events successfully loaded.</p>;
      break;
    case 'error':
      uploadMessage = <p>Upload unsuccessful. Please try again.</p>;
      break;
    default:
      break;
  }

  return (
    // <div><Header title="UPLOAD EVENT EXCEL" />
    // <Navigation /> 
    <div className="upload-form-container">
      <div className='form-wrapper2'>
      <form onSubmit={handleSubmit}>
        <h2>Select an Excel file (.xlsx) to upload:</h2>
        <div className="input-container">
          <input type="file" accept=".xlsx" onChange={handleFileSelect} />
          <button type="submit" disabled={!selectedFile}>
            Submit
          </button>
        </div>
      </form>
      <div className="upload-message-container">{uploadMessage}</div>
    </div>
    </div>
    // </div>
  );
};

export default UploadForm;