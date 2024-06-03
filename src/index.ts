import express from 'express'
import cors from 'cors'
import router from './routes';
import morganMiddleware from './config/morganMiddleware'

const PORT = process.env.PORT || 4000; // Server port
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'; // Server host

const app = express();
app.use(morganMiddleware);
app.use(express.json()); //Adding json encoding
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:3000']
}));
app.use('/api', router); //Routes

app.listen(PORT, () => {
    console.log(`Server running at ${HOSTNAME}:${PORT}`);
});