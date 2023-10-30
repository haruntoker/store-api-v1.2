const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()


//middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require("./middleware/error-handler")

app.use(express.json())

// routes
app.get('/', (req,res)=>{
    res.send('<h1>Store Api</h1> <a href="/api/v1/products">Products route </a>')
})


//products routes



//call custom middleware
app.use(notFoundMiddleware)
app.use(errorMiddleware)















// dotdnv & DB set-up
dotenv.config()

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const connect = async() =>{
    try {
        await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });

        console.log("DB connected succesfully!");
        app.listen(PORT, () =>{
            console.log(`Server running on port ${PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}

connect()

