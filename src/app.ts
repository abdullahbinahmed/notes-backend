import express from 'express';
import cors from 'cors';
import noteRoutes from "./routes/noteRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/notes', noteRoutes)

app.use((req,res) => {
    res.status(404).send('Endpoint route not found.');
});
export default app;