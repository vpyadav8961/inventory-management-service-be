const express = require("express");
const {createServer} = require("http"); 
const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 5175;
httpServer.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    
})
