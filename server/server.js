import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDatabase from './src/config/db.config.js';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

connectToDatabase()

app.use(cors({
    origin: process.env.CLIENT_URL || "https://classyshop-server.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v2/auth', authRoutes)


app.listen(PORT, (err) => {
    if (err) {
        console.error(`Error starting the server: ${err.message}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
