const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const socketHandler = require('./socket/socketHandler');

const app = express();
const server = http.createServer(app);

// Enable CORS for client app
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MERN Chat Server is running 🚀' });
});

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

socketHandler(io);

const PORT = process.env.PORT || 5001;

// Connect Database & Start Server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`📡 MERN Chat Server listening on port http://localhost:${PORT}`);
  });
});
