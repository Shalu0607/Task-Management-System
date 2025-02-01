const db = require('../config/db');

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
    try {
        const [tasks] = await db.query(
            'SELECT * FROM tasks WHERE user_id = (SELECT id FROM users WHERE email = ?)', 
            [req.session.user.email]
        );

        // Retrieve the message from session
        const message = req.session.message;

        // Clear the message from session after retrieving it
        req.session.message = null;

        // Render the page with tasks and message
        res.render('newtask', { tasks, message });

    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send("Internal Server Error");
    }
};

  
//Add a new task
const addTask = async (req, res) => {
    try {
        const { text, due_date } = req.body;

        // Ensure the user is logged in
        if (!req.session.user || !req.session.user.email) {
            req.session.message = "Unauthorized access. Please log in."; // Set message in session
            return res.redirect('/login');
        }

        // Get user ID
        const [user] = await db.query('SELECT id FROM users WHERE email = ?', [req.session.user.email]);

        if (!user.length) {
            req.session.message = "User not found. Please log in again."; // Set message in session
            return res.redirect('/login');
        }

        // Insert the task
        await db.query(
            'INSERT INTO tasks (user_id, text, due_date) VALUES (?, ?, ?)', 
            [user[0].id, text, due_date]
        );

        // Set success message in session
        req.session.message = "Task added successfully!";
        res.redirect('/todo');

    } catch (error) {
        console.error("Error adding task:", error);

        // Set error message in session
        req.session.message = "Failed to add task. Please try again.";
        res.redirect('/todo');
    }
};




// const addTask = (req, res) => {
//     const { text, due_date } = req.body;
//     const userEmail = req.session.user.email;

//     // Step 1: Fetch user ID from the email
//     connection.execute('SELECT id FROM users WHERE email = ?', [userEmail], (err, userResults) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error retrieving user data');
//         }

//         const userId = userResults[0]?.id;
//         if (!userId) {
//             return res.status(404).send('User not found');
//         }

//         // Step 2: Insert the new task
//         connection.execute(
//             'INSERT INTO tasks (user_id, text, due_date) VALUES (?, ?, ?)', 
//             [userId, text, due_date], 
//             (err) => {
//                 if (err) {
//                     console.error(err);
//                     return res.status(500).send('Error adding task');
//                 }

//                 // Step 3: Fetch the updated list of tasks for the user
//                 connection.execute('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, taskResults) => {
//                     if (err) {
//                         console.error(err);
//                         return res.status(500).send('Error retrieving tasks');
//                     }

//                     // Step 4: Render the updated tasks to the EJS view
//                     res.render('todo', { tasks: taskResults, user: req.session.user });
//                 });
//             }
//         );
//     });
// };

const editTask = async (req, res) => {
    try {
        const [task] = await db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        
        if (task.length === 0) {
            return res.status(404).send("Task not found");
        }

        res.render('updatetask', { task: task[0] }); // Assuming 'edit.ejs' template exists
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).send("Internal Server Error");
    }
};
// Update a task
const updateTask = async (req, res) => {
    try {
        const { text, due_date } = req.body;
        await db.query('UPDATE tasks SET text = ?, due_date = ? WHERE id = ?', 
            [text, due_date, req.params.id]
        );
        res.redirect('/todo');
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Mark a task as completed
const completeTask = async (req, res) => {
    try {
        await db.query('UPDATE tasks SET completed = true WHERE id = ?', [req.params.id]);
        res.redirect('/todo');
    } catch (error) {
        console.error("Error completing task:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        await db.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        
        req.flash('message', 'Task deleted successfully!');
        res.redirect('/todo');
    } catch (error) {
        console.error("Error deleting task:", error);
        req.flash('error', 'Failed to delete task.');
        res.status(500).redirect('/todo');
    }
};


module.exports = {
    isAuthenticated,
    getTasks,
    addTask,
    editTask,
    updateTask,
    completeTask,
    deleteTask
};



