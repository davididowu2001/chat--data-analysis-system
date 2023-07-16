const db = require('../db');

exports.fetchGroup = async (req, res) => {
    try {
        const [messages] = await db.query('SELECT g.id, g.name\
        FROM groups g');
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

exports.fetchGroupz = async (req, res) => {
    try {
        const [messages] = await db.query('SELECT g.id, g.name\
        FROM groups g\
        JOIN groupmembers gm ON gm.group_id = g.id\
        WHERE gm.user_id = 1');
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};


exports.createGroup = async (req, res) => {
    try {
        const { id, name } = req.body;

        if (!id || !name) {
            throw new Error('Group ID or name is not set');
        }

        const [result] = await db.query('INSERT INTO groups (id, name) VALUES (?, ?)', [id, name]);
        res.status(200).json({ status: 'success', groupId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Failed to create groupss: ${error.message}` });
    }
};


exports.addUser = async (req, res) => {
    try {
        const { groupId, userId } = req.body;

        // Check if the user is already a member of the group
        const [existingMembers] = await db.query('SELECT * FROM groupmembers WHERE group_id = ? AND user_id = ?', [groupId, userId]);
        
        if (existingMembers.length > 0) {
            return res.status(400).json({ error: 'User is already a member of this group' });
        }

        // If not, add the user to the group
        await db.query('INSERT INTO groupmembers (group_id, user_id) VALUES (?, ?)', [groupId, userId]);

        res.status(200).json({ message: 'User added to the group successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Failed to add user to group: ${error.message}` });
    }
};
