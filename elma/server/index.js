const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const users=require("./routes/authentication")
const details=require("./routes/details")
const PORT = process.env.PORT;
app.use(express.json());  
app.use(cors()); 
app.use('/users',users);
app.use('/details',details);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
