import express from 'express'
import cors from 'cors';
import athleteRoutes from './routes/athlete_routes'
import subscriptionRoutes from './routes/subscription_routes'
import usersRoutes from './routes/users/users_routes'
import { connectDB } from './db'
import dotenv from 'dotenv'
import './jobs/subscriptionReminder.job';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

app.get('/health', (_, res) => {
    res.status(200).send('OK');
});

app.use('/athlete', athleteRoutes);
app.use('/subscription', subscriptionRoutes);
app.use('/user', usersRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server attivo sulla porta ${port}`);
    });
});