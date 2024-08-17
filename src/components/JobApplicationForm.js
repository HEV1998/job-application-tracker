import React, { useState, useEffect } from 'react';

const JobApplicationForm = ({ onSubmit, initialData = {} }) => {
  console.log("Rendering JobApplicationForm"); // Log statement

  const [company, setCompany] = useState(initialData.company || '');
  const [job_title, setJobTitle] = useState(initialData.job_title || ''); // Changed here
  const [application_date, setApplicationDate] = useState(initialData.application_date || ''); // Changed here
  const [status, setStatus] = useState(initialData.status || '');
  const [notes, setNotes] = useState(initialData.notes || '');

  useEffect(() => {
    setCompany(initialData.company || '');
    setJobTitle(initialData.job_title || ''); // Changed here
    setApplicationDate(initialData.application_date || ''); // Changed here
    setStatus(initialData.status || '');
    setNotes(initialData.notes || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...initialData, company, job_title, application_date, status, notes }); // Changed here
    setCompany('');
    setJobTitle('');
    setApplicationDate('');
    setStatus('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Job Title"
        value={job_title} // Changed here
        onChange={(e) => setJobTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={application_date} // Changed here
        onChange={(e) => setApplicationDate(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option value="">Select Status</option>
        <option value="Applied">Applied</option>
        <option value="Interviewed">Interviewed</option>
        <option value="Offered">Offered</option>
        <option value="Rejected">Rejected</option>
      </select>
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobApplicationForm;
