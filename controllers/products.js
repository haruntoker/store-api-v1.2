
//1
const getAllProductsStatic = async(req,res)=>{
    res.status(200).json({msg:`products testing route`})
}


//2

const getAllProducts = async(req,res)=>{
    res.status(200).json({msg:`Prouducts route`})
}



//export
module.exports = {getAllProductsStatic, getAllProducts}