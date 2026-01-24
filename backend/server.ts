import express from 'express'
import cors from 'cors'
import auth from "./routes/auth";

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api",auth);

app.listen(5000,()=>{
    console.log("Server is Running");
})