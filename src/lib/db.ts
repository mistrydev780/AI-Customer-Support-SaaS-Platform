
import  { connect } from "mongoose"
const MONGODB_URL = process.env.MONGODB_URL 
if(!MONGODB_URL) {
    console.error("MONGODB_URL is not defined in environment variables");
}

let cache = global.mongoose
if (!cache) {
    cache = global.mongoose = { conn: null, promise: null }
}


const connectDb = async () => {
     if(cache.conn) {
        return cache.conn
     }  
     if(!cache.promise) {
        cache.promise = connect(MONGODB_URL!).then((c) =>c.connection) 
     }
        
     try {
        cache.conn = await cache.promise
     }catch (error) {
        console.error("Error connecting to MongoDB:", error);
     }
    }                          

    export default connectDb;