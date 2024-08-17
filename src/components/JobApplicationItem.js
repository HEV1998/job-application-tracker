import React from 'react';

const JobApplicationItem = ({ application, onEdit, onDelete }) => {
  console.log('Rendering JobApplicationItem');

  
  const dateToParse = application.application_date || application.applicationDate;
  
  let formattedDate;
  try {
    formattedDate = new Date(dateToParse).toLocaleDateString('en-GB');
  } catch (error) {
    console.error('Error parsing date:', dateToParse);
    formattedDate = 'Invalid Date';
  }

  return (
    <div>
      <h3>{application.company}</h3>
      <p>{application.job_title || application.jobTitle}</p>
      <p>{formattedDate}</p> {/* Display formatted date or error message */}
      <p>{application.status}</p>
      <p>{application.notes}</p>
      <button onClick={() => onEdit(application)}>Edit</button>
      <button onClick={() => onDelete(application.id)}>Delete</button>
    </div>
  );
};

export default JobApplicationItem;

