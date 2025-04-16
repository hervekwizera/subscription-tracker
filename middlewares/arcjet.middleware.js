import aj from '../config/arcjet.js';

const arcjetMiddleware = (req,res,next)=>{
    try {
        
    } catch (error) {
        console.log(`Arcjet middleware error: ${error}`);
        next(error);
    }
}