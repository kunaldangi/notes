const express = require("express");
const cors = require('cors');
const connectDatabase = require("./config/db");

const app = express();
const port = 5888;
connectDatabase("mongodb://127.0.0.1:27017/notes");

const corsOptions = {
    origin: ['http://localhost:3000']
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/auth/login', require('./routes/login'));
app.use('/api/auth/register', require('./routes/register'));

app.get('/', (req, res)=>{
    res.send('page file');
})

app.listen(port, ()=>{
    console.log(`Backend Server listing on: ${port}`);
})