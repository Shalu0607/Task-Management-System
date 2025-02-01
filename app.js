const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// **Session Middleware (must be before flash)**
app.use(session({
    secret: 'yourSecret',
    resave: false,
    saveUninitialized: false
}));

// **Flash Middleware**
app.use(flash());

// **Make flash messages available in views**
app.use((req, res, next) => {
    res.locals.message = req.flash();
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// **Routes**
app.use(authRoutes);
app.use(taskRoutes);

// **Start the server**
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
