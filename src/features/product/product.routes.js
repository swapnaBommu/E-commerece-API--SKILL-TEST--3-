//manage the routes of the product

//1. import express
import express from 'express';
import ProductController from './product.controller.js';

//2.initialize express router
const productRouter  = express.Router();
const productController = new ProductController;

//All the paths to controller methods

productRouter.get("/",(req,res)=>{
    productController.getAllProducts(req,res);
});

productRouter.post('/create',(req,res) =>{
    productController.addProduct(req,res);
});

productRouter.get("/:id",(req,res) => {
    productController.getOneProduct(req,res);
});
productRouter.delete('/:id', (req, res, next)=>{
    productController.deleteProduct(req,res,next);
});
productRouter.put("/:id",(req, res) => {
    productController.updateProduct(req,res);
})



export default productRouter;