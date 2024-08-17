import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import JobApplicationForm from './components/JobApplicationForm';
import JobApplicationList from './components/JobApplicationList';
import Footer from './components/Footer';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  const [applications, setApplications] = useState([]);
  const [currentApplication, setCurrentApplication] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/applications')
      .then((response) => {
        setApplications(response.data); // Removed date formatting
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addApplication = (application) => {
    const newApplication = { ...application, id: uuidv4() };
    console.log('Adding application:', newApplication); // Log the application data
    axios.post('http://localhost:3001/api/applications', newApplication)
      .then((response) => {
        console.log('Application added:', response.data); // Log the response data
        setApplications([...applications, response.data]);
      })
      .catch((error) => {
        console.error('Error adding application:', error);
      });
  };

  const editApplication = (updatedApplication) => {
    axios.put(`http://localhost:3001/api/applications/${updatedApplication.id}`, updatedApplication)
      .then(() => {
        const updatedApplications = applications.map((application) =>
          application.id === updatedApplication.id ? updatedApplication : application
        );
        setApplications(updatedApplications);
        setCurrentApplication(null);
      })
      .catch((error) => {
        console.error('Error editing application:', error);
      });
  };

  const deleteApplication = (id) => {
    axios.delete(`http://localhost:3001/api/applications/${id}`)
      .then(() => {
        const updatedApplications = applications.filter((application) => application.id !== id);
        setApplications(updatedApplications);
      })
      .catch((error) => {
        console.error('Error deleting application:', error);
      });
  };

  const handleEdit = (application) => {
    setCurrentApplication(application);
  };

  return (
    <div>
      <Header />
      <JobApplicationForm
        onSubmit={currentApplication ? editApplication : addApplication}
        initialData={currentApplication || {}}
      />
      <JobApplicationList
        applications={applications}
        onEdit={handleEdit}
        onDelete={deleteApplication}
      />
      <Footer />
    </div>
  );
};

export default App;
