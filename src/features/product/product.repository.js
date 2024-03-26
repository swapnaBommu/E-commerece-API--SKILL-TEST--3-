import { ObjectId } from 'mongodb';
import {getDB } from '../../../config/mongodb.js';

 class ProductRepository {
    constructor(){
        this.collection = "products";
    }

    async add(newProduct){
        try{
            //1.get the db.
            const db = getDB();
            //2.create collection
            const collection = db.collection(this.collection)
            //3.using insertOne function add new product to db
            collection.insertOne(newProduct);
            return newProduct;

        }catch(err){
            console.log(err);
        }
    }
    
    async getAll(){
        try{
            //1.get the db.
            const db = getDB();
            //2.create collection
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            return products;
        }catch(err){
            console.log(err);
        }
    }
    async removeProduct(productId){
        try{
            const db = getDB();
            const collection =await db.collection(this.collection)
            const result = await collection.deleteOne({_id:new ObjectId(productId)});
            return result.deletedCount>0;
        }catch(err){
            console.log(err);  
        }

    }
    async updateProduct(productId,updates){
        try{
            const db = getDB();
            const collection =await db.collection(this.collection)
            const product = await collection.findOne({_id:new ObjectId(productId)});
            const result = await collection.updateOne({_id:new ObjectId(productId)},{$set:{quantity:updates.quantity?updates.quantity:product.quantity,name:updates.name?updates.name:product.name}},{new:false},{resultDocumet:"after"});
            const p = await collection.findOne({_id:new ObjectId(productId)});
            return p;
        }catch(err){
            console.log(err);
        }
    }

 }
 export default ProductRepository;