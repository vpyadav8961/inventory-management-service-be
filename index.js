const express = require("express");
const {createServer} = require("http");
const {config} = require('dotenv');
const {Server} = require("socket.io");
const cors = require('cors');
config();
const app = express();
const httpServer = createServer(app);

const database = require('./config/database');
const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5175',
      methods: ['GET', 'POST']
    }
  });

// Middleware
app.use(cors());
app.use(express.json());

app.get("/test", (req, res, next) => {
    console.log("This is the test url.");
    res.status(200).json({status:"success", message: "Test running successfully"});
})


const PORT = process.env.PORT || 5175;
httpServer.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
