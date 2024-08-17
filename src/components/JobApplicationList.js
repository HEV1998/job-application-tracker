// src/components/JobApplicationList.js
import React from 'react';
import JobApplicationItem from './JobApplicationItem';
console.log('Rendering JobApplicationList');
const JobApplicationList = ({ applications, onEdit, onDelete }) => {
  return (
    <div>
      {applications.map((application) => (
        <JobApplicationItem
          key={application.id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default JobApplicationList;