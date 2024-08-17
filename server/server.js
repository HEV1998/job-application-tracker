const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

dotenv.config()

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'jobtracker',
  password: 'Welshrugby98',
  port: 5432,
});

// Read job applications
app.get('/api/applications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM job_applications');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to read data', details: err.message });
  }
});

// Add a new job application
app.post('/api/applications', async (req, res) => {
  const { company, job_title, application_date, status, notes } = req.body;
  console.log('Received application:', req.body);
  try {
    const result = await pool.query(
      'INSERT INTO job_applications (company, job_title, application_date, status, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [company, job_title, application_date, status, notes]
    );
    console.log('Application saved:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding data:', err);
    res.status(500).json({ error: 'Failed to add data', details: err.message });
  }
});

// Edit an existing job application
app.put('/api/applications/:id', async (req, res) => {
  const { id } = req.params;
  const { company, job_title, application_date, status, notes } = req.body;
  try {
    const result = await pool.query(
      'UPDATE job_applications SET company = $1, job_title = $2, application_date = $3, status = $4, notes = $5 WHERE id = $6 RETURNING *',
      [company, job_title, application_date, status, notes, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating data:', err);
    res.status(500).json({ error: 'Failed to update data', details: err.message });
  }
});

// Delete a job application
app.delete('/api/applications/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM job_applications WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: 'Failed to delete data', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
