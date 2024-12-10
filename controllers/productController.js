const Product = require ("../models/product")

const CategorieFilter = async(req, res) => {
        const {categorie} = req.params;
        console.log(categorie)
 
        const products = await Product.find({categorie});
        //console.log(products)

        if (!products.length){
            return res.status(400).json({Message:"No categorie found !"})
        }
 
        res.json(products);

        
    };








    module.exports = {CategorieFilter}