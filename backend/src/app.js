const express = require("express")
const aiRoutes = require('./routes/ai.routes')
const cors =  require('cors')
const app = express()

app.get("/", (req, res)=>{
    res.send("Hello World, Chando")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend" });
});

app.use('/api/ai', aiRoutes);
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working on Vercel" });
});

module.exports = app
