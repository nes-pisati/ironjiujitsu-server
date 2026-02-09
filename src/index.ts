import express from 'express'
import cors from 'cors';
import athleteRoutes from './routes/athlete_routes'
import subscriptionRoutes from './routes/subscription_routes'
import usersRoutes from './routes/users/users_routes'
import { connectDB } from './db'
import dotenv from 'dotenv'
import './jobs/subscriptionReminder.job';

const app = express();
const port = 3002;

dotenv.config()

app.use(express.json()); //middleware per leggere JSON nel body delle req
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use('/athlete', athleteRoutes)
app.use('/subscription', subscriptionRoutes)
app.use('/user', usersRoutes)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server attivo sulla porta ${port}`);
    })
})