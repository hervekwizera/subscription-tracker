export const  createSubscription = (req,res,next)=>{
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user.id,
        })
    } catch (e) {
        next(e);
    }
}