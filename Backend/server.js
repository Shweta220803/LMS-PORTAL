import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import { clerkWebHooks, stripeWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import courseRouter from './routes/courseRoutes.js';

import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';


// Initialize Express
const app = express();

// Connect To Database 
connectDB()

// Connect Cloudinary
connectCloudinary()



app.use(clerkMiddleware());
app.use(express.json());      // JSON middleware should come after Clerk

// Middleware for CORS
app.use(cors());






// Routes Handling
app.get('/', (req, res) => {
    res.send("API Working")
})

app.post('/clerk', express.json(), clerkWebHooks)
app.use('/api/educator', educatorRouter)
app.use('/api/course', courseRouter)
app.use('/api/user', userRouter)
app.post('/stripe',  express.raw({type: 'application/json'}), stripeWebhooks)






// Server Listening
const PORT= process.env.PORT || 4001

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
    
})