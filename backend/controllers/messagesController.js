/* const db = require('../db');


exports.sendMessage = (req, res) => {
    // Your logic for sending a chat message
};

exports.getMessages = (req, res) => {
    // Your logic for fetching chat messages
}; */

const db = require('../db');



exports.fetchDirectMessages = async (req, res) => {
    try {
        const { receiverID } = req.query;
        const senderID=1;
        const [messages] = await db.query(`SELECT dm.id, u1.Name 
        AS sender, dm.content, dm.timestamp 
        FROM directmessages dm 
        JOIN Employees u1 ON u1.EmployeeID = dm.senderID 
        WHERE (dm.senderID = ? AND dm.receiverID = ?) OR (dm.senderID = ? AND dm.receiverID = ?) 
        ORDER BY dm.timestamp ASC`, [senderID, receiverID, receiverID, senderID]);
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

exports.fetchGroupMessages = async (req, res) => {
    try {
        const groupID = req.query.groupID;
        const [messages] = await db.query(`
            SELECT gm.id, gm.senderID, u.Name AS sender, gm.content, gm.timestamp
            FROM groupmessages gm
            JOIN Employees u ON u.EmployeeID = gm.senderID
            WHERE gm.groupID = ?
            ORDER BY gm.timestamp ASC
        `, [groupID]);
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch group messages' });
    }
};


exports.sendDirectMessages = async (req, res) => {
    try {
        const { message, senderID, receiverID } = req.body;
        console.log(`message: ${message}, senderID: ${senderID}, receiverID: ${receiverID}`);
  
        if (!message || !senderID || !receiverID) {
            throw new Error('message, senderID, or receiverID is not set');
        }
  
        const result = await db.query(
            'INSERT INTO directmessages (senderID, receiverID, content) VALUES (?, ?, ?)',
            [senderID, receiverID, message]
        );

        console.log(`Inserted message with ID ${result.insertId} into directmessages`);
        res.status(200).json({ message: 'Message sent successfully', messageId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};


exports.sendGroupMessages = async (req, res) => {
    try {
        const { groupID, senderID, message } = req.body;
        if (!groupID || !senderID || !message) {
            throw new Error('groupID, senderID, or message is not set');
        }
        const [result] = await db.query('INSERT INTO groupmessages (groupID, senderID, content) VALUES (?, ?, ?)', [groupID, senderID, message]);
        res.status(200).json({ status: 'success', messageId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};