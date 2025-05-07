import express, { Application } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', userRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'User Service running' });
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});