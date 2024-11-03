import * as dotenv from 'dotenv';
import express, {
  Express, Request, Response,
} from 'express';
import routesV1 from './routes/v1';
import mongoose from 'mongoose';


// Initialization
dotenv.config();
const app: Express = express();
const port: number = Number(process.env.PORT) || 3002;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


  const check = (req: Request, res: Response) => {
    res.send('Express + TypeScript Server...');
  };

  app.get('/', check);
// app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server')); // Health check

// V1 Routes
app.use('/v1', routesV1);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});