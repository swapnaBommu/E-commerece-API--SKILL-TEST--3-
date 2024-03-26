import { MongoClient } from "mongodb";

// Connection URL
const url = 'mongodb://localhost:27017/ecomdb';

let client;
//creatting connection to the DB
export const connectToMongoDB = ()=>{
     MongoClient.connect(url)
        .then(clientInstance=>{
            client=clientInstance
            console.log("Mongodb is connected");
            createCounter(client.db());
        })
        .catch(err=>{
            console.log(err);
        })
}

//to get the db
export const getDB = ()=>{
    return client.db();
}
