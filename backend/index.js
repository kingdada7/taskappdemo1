import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors middleware
app.use(cors());

//db connection
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});