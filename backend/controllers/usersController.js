const db = require('../db');

exports.fetchUsers= async (req, res) => {
    try {
        const [messages] = await db.query('SELECT EmployeeID, Name AS username FROM Employees');
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};