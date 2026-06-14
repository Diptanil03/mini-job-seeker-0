import express from 'express'
import {configDotenv} from 'dotenv'
import { scrapJobBySkill } from './scraping.js'
import cors from 'cors'
configDotenv()

const port=process.env.PORT || 8008
const corsOptions={
    origin:process.env.FRONTEND_URL,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

const app=express()

app.use(cors(corsOptions))
app.use(express.json())

app.listen(port,()=>{
    console.log('server is running on',port)
})

app.get('/',(req , res)=>{
    res.send('hello from puppeteer-app')
})

app.post('/jobs',async(req,res)=>{
   const { data } = req.body;

let skillData = [];

// 1. Check if data exists and isn't the literal string "null"
if (data && data !== "null") {
    try {
        Object.keys(data).forEach(key=>skillData.push(key))
    } catch (error) {
        console.error("Failed to parse incoming data:", error);
        // Optional: return res.status(400).json({ error: "Invalid JSON format" });
    }
}
    
    const response=await scrapJobBySkill(skillData)
    if(response){
       return res.json({
            jobs:response
        })
    }
   return res.json({
    message:'find no jobs'
   })
})