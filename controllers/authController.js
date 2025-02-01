const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Render Register Page
const getRegister = (req, res) => {
    res.render('register');
};

// Handle User Registration
const postRegister = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).send('Email is already registered');
        }

        // Hash password and insert new user
        const hashedPassword = await bcrypt.hash(password, 12);
        await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

        // Store session and redirect
        req.session.user = { email };
        res.redirect('/todo');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Render Login Page
const getLogin = (req, res) => {
   // res.render('login');
    res.render("login", { message: req.session.message });  
    req.session.message = null; // Clear the message after rendering
};

// Handle User Login
const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0 && await bcrypt.compare(password, rows[0].password)) {
            req.session.user = { email };
            req.session.message = { type: 'success', text: 'Login successful! Welcome back.' };
            return res.redirect('/todo');
        }

        req.session.message = { type: 'error', text: 'Invalid email or password. Please try again.' };
        res.redirect('/login');
    } catch (error) {
        console.error('Error logging in:', error);
        req.session.message = { type: 'error', text: 'Something went wrong. Please try again later.' };
        res.redirect('/login');
    }
};

// Handle Logout
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Error logging out. Please try again.");
        }
        res.redirect('/login');
    });
};


module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout
};
