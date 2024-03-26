import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController {
    constructor(){
        this.productRepository = new ProductRepository();

    }
    //create a product
    async addProduct (req, res) {
        try{
         const {name, quantity} = req.body;
         const newProduct = new ProductModel(name,parseInt(quantity));
         const createdProduct =await this.productRepository.add(newProduct);
         res.status(201).json({
             data:{
               product:createdProduct
             }
           });
        }catch(err){
         console.log(err);
         res.status(400).send("something went wrong");
        }
     }
     //Get all the products
    async getAllProducts(req, res) {
        try{
            const products =await this.productRepository.getAll();
            res.status(200).json({
                data:{
                    products:products
                }
            })
        }catch(err){
            console.log(err);
            res.status(400).send("something went wrong");
        }
        
    }
    //delete product
    async deleteProduct(req,res) {
        try{
            const id = req.params.id;
            const isDeleted = await this.productRepository.removeProduct(id);
            if (!isDeleted) {
                return res.status(404).send("Product not found");
            }
            return res.status(200).json({
            data: {
                message: "product deleted"
                }
          });
        }catch(err){
            console.log(err);
        }
    }
    //update product
    async updateProduct(req, res) {
        try{
            const id = req.params.id;
            const updates = req.body;
           
            const result = await this.productRepository.updateProduct(id,updates);
            if (!result) {
                return res.status(404).send("Product not found");
            }else{
            return res.status(200).json({
            data: {
                product:result,
                message: "updated successfully"
                }
          });
        }
        }catch(err){
            console.log(err);
        }
    }
    
}