const db = require('../db');  

  exports.sendTest = async (req, res) => {
    try {
        const {name} = req.body;
        const [result] = await db.query('INSERT INTO test (test) VALUES (?)', [name]);
        res.status(201).json({ message: 'Message sent successfully', messageId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

exports.getTest= async (req, res) => {
    try {
        const [messages] = await db.query('SELECT * FROM test');
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};