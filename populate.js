const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express'); 
const app = express(); 

const Product = require('./models/product');
const jsonProducts = require('./products.json')

dotenv.config();


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;



const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });
    await Product.deleteMany();
    await Product.create(jsonProducts)
    
    console.log("DB connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.exit(0)
    
  } catch (error) {
    process.exit(1)
  }
}

connect();
