const express = require('express')
const app = express()
const connectingDb = require('./config/db.ts')
const router = require("./routes/user.js")
const adminRouter = require("./routes/admin.js")
const cors = require("cors")


//Connecting db
connectingDb()




app.use(cors())

//Middleware to parses incoming requests with JSON payloads.
app.use(express.json())

app.use("/",router)
app.use('/admin',adminRouter)


app.listen(3000,()=>{
    console.log('server running at http://localhost:3000');
})  