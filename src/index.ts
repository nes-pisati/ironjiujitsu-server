import express from 'express'
import athleteRoutes from './routes/athlete_routes'
import { connectDB } from './db'
import dotenv from 'dotenv'

const app = express();
const port = 3002;

dotenv.config()

app.use(express.json()); //middleware per leggere JSON nel body delle req

app.use('/athlete', athleteRoutes)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server attivo sulla porta ${port}`);
    })
})