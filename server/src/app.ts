import express from 'express';
import dotenv from 'dotenv';
import mainRouter from './routes/main';

dotenv.config();

const PORT = process.env.APP_PORT || 8080;
const app = express();

app.use('/api/v1', mainRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
