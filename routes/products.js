
const express = require('express')
const router = express.Router()

const {getAllProductsStatic, getAllProducts} = require('../controllers/products')


//1
router.get('/static', getAllProductsStatic)


//2
router.get('/', getAllProducts)




//export
module.exports = router