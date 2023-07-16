const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static assets from the frontend folder
app.use(express.static('frontend'));
app.use(express.static('frontend', { type: 'text/css' }));


// Define a route to serve your index.html file
app.get('/', (req, res) => {
  // res.sendFile('test.html', { root: __dirname + '/../frontend/pages/' });
  // res.sendFile('dataAnalytics.html', { root: __dirname + '/../frontend/pages/' });
  res.sendFile('message.html', { root: __dirname + '/../frontend/pages/' });
});

// Import routes
//const testRoutes = require('./routes/testRoutes');
const chatRoutes = require('./routes/chatRoutes');
const usersRoutes = require('./routes/usersRoutes');
const groupRoutes = require('./routes/groupRoutes');

const analyticsRoutes = require('./routes/analyticsRoutes');

// Use routes
//app.use('/api/test', testRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/group',groupRoutes);
app.use('/api/analytics', analyticsRoutes);

// Set the port and start listening
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ... http://localhost:${PORT}`);
});