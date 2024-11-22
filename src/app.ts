import * as dotenv from 'dotenv';
import express, {
  Express, Request, Response,
} from 'express';
import routesV1 from './routes/v1';
import mongoose from 'mongoose';
import cors from 'cors';
import { basicLoggerMiddleware, detailedAccessLoggerMiddleware } from './middlewares/morgan';
import errorHandlingMiddleWare from './middlewares/error-handler';
import passport from 'passport';
import './middlewares/passport';


// Initialization
dotenv.config();
const app: Express = express();
const port: number = Number(process.env.PORT) || 3002;

// Middleware to parse JSON
app.use(express.json());
app.use(basicLoggerMiddleware); // Morgan Logger Middleware
app.use(detailedAccessLoggerMiddleware); // Morgan Logger Middleware
app.use(cors({
  // accept all url
  origin: '*',
})); // Enable Cors for browsers
app.use(passport.initialize()); 
const check = (req: Request, res: Response) => {
  res.send('Express + TypeScript Server...');
};

app.get('/', check);
// V1 Routes
app.use('/v1', routesV1);
app.use(errorHandlingMiddleWare);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});