const db = require('../db');

exports.getUserInfo = async (req, res) => {
    try {
      const UserInfo = await fetchUserInfo();
      res.status(200).json(UserInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch user info object' });
    }
  };

async function fetchUserInfo() {
    try {
      const query = `
      SELECT username, fName, sName 
      FROM users 
      WHERE id = 1
      `;
  
      const [rows] = await db.query(query);

      const username = db.query.username;
    const fname = db.query.fName;
  
      // console.log(Object.values(projectProgressMap));
      return Object.values(rows);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user info');
    }
  }

/*   exports.getLogin = async (req, res) => {
    try {
      const Login = await fetchLogin();
      res.status(200).json(Login);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch login object' });
    }
  };

async function fetchLogin() {
    try {
      const query = `
      SELECT id, password 
      FROM Users 
      WHERE username = 'bob@make-it-all.co.uk'
      `;
  
      const [rows] = await db.query(query);
  
      return Object.values(rows);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch login');
    }
  }

  exports.getReadChats = async (req, res) => {
    try {
      const Login = await fetchReadChats();
      res.status(200).json(Login);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch read chats' });
    }
  };

async function fetchChats() {
    try {
      const query = `
      SELECT id, password 
      FROM Users 
      WHERE username = 'bob@make-it-all.co.uk'
      `;
  
      const [rows] = await db.query(query);
  
      return Object.values(rows);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetchchats');
    }
  }

  exports.getChats = async (req, res) => {
    try {
      const Login = await fetchChats();
      res.status(200).json(Login);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch chats' });
    }
  };

  exports.getReadChats = async (req, res) => {
    try {
      const Login = await fetchReadChats();
      res.status(200).json(Login);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch read chats' });
    }
  };

async function fetchReadChats() {
    try {
      const query = `
      SELECT id, password 
      FROM Users 
      WHERE username = 'bob@make-it-all.co.uk'
      `;
  
      const [rows] = await db.query(query);
  
      return Object.values(rows);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch alpha chats');
    }
  }

  exports.getAlphaChats = async (req, res) => {
    try {
      const Login = await fetchAlphaChats();
      res.status(200).json(Login);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch alpha chats' });
    }
  };

async function fetchAlphaChats() {
    try {
      const query = `
      SELECT id, password 
      FROM Users 
      WHERE username = 'bob@make-it-all.co.uk'
      `;
  
      const [rows] = await db.query(query);
  
      return Object.values(rows);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch alpha chats');
    }
  }

async function insertChat() {
    try {
      const query = `
      SELECT id, password 
      FROM Users 
      WHERE username = 'bob@make-it-all.co.uk'
      `;
  
    } catch (error) {
      console.error(error);
      throw new Error('Failed to insert chat');
    }
  }


async function deleteChat() {
    try {
      const query = `
      SELECT id, password 
      FROM Users 
      WHERE username = 'bob@make-it-all.co.uk'
      `;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete chat');
    }
  } */