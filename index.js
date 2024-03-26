//import external packages at the top of the file
import express from 'express';
import bodyParser from 'body-parser';

//import internal files here
import {connectToMongoDB} from './config/mongodb.js';
import productRouter from './src/features/product/product.routes.js';

const app = express();

//to get the req body we use body parser
app.use(express.json());
app.use(bodyParser.json());

//set up routes
app.get('/', (req,res)=>{
    res.status(200).send("Welcome to E-com API");
});
//using product router
app.use('/api/products',productRouter);

//app listening
app.listen(3000, () => {
    console.log("server is listening at port 3000");
    connectToMongoDB();
  })