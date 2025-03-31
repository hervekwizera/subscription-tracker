import { Router } from "express";

const subscription = Router;

subscription.get('/',(req,res)=> res.send({title:'GET all subscription'}))

export default subscriptionRouter;