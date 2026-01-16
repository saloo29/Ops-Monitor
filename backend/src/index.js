import express from "express";
import cors from "cors";
import userRoutes from './routes/userRoutes.js'
import incidentRoutes from './routes/incidentRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', incidentRoutes);

app.get('/', async(req, res) => {
  try{
    res.send("hello")
  } catch(error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("server running on 3000")
})