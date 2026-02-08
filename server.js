const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'js_playground'
});

// Create table if it doesn't exist
pool.query(`
    CREATE TABLE IF NOT EXISTS user_forms (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(20),
        address TEXT,
        gender VARCHAR(50),
        religion VARCHAR(50),
        languages TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

// API endpoint to save form data
app.post('/api/submit-form', async(req, res) => {
    try{
        const { firstName, lastName, email, phone, address, gender, religion, languages } = req.body;

         const query = `
            INSERT INTO user_forms (first_name, last_name, email, phone, address, gender, religion, languages)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `;

        const result = await pool.query(query, [
            firstName,
            lastName,
            email,
            phone,
            address,
            gender,
            religion,
            JSON.stringify(languages)
        ]);

        res.json({success: true, id: result.rows[0].id, message: 'Form Saved to database!'});
    } catch(err){
        console.error(err);
        res.status(500).json({success: false, error: err.message});
    }
});

// GET all submissions (optional)
app.get('/api/submissions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM user_forms ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));