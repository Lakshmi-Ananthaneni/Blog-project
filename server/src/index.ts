import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
//import productRouter from './routes/productRoute';
import userRouter from './routes/userRoute';
import blogRouter from './routes/blogRoute';
import adminRouter from './routes/adminRoute';

import { dev } from './config';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';


const app = express();

const PORT = dev.app.port || 3004;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
 
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/blogs', blogRouter);


app.get("/", (req,res) => {
    res.status(200).send("Welcome")
});

app.listen(PORT, async () => {
    console.log(`server is running on http://localhost:${PORT}`);
    await connectDB();
  });

  // basic error handling middleware
app.use((req: Request, res: Response) => {
  res.status(404).send('Route does not exist!');
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});