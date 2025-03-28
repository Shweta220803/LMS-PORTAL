import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import { clerkWebHooks } from './controllers/webhooks.js';

// Initialize Express
const app = express();

// Connect To Database 
connectDB()

//Middleware
app.use(cors())


// Routes Handling
app.get('/', (req, res) => {
    res.send("API Working")
})

app.post('/clerk', express.json(), clerkWebHooks)

const PORT= process.env.PORT || 4001

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
    
})