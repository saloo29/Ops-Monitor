import express from "express";
import cors from "cors";
import userRoutes from './routes/userRoutes.js'
import incidentRoutes from './routes/incidentRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', incidentRoutes);

app.listen(3000, () => {
  console.log("server running on 3000")
})