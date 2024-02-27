const jwt =require('jsonwebtoken')
const db = require('../models/prisma')

module.exports = async(req, res, next) => {

    try {
        const authorization = req.headers.authorization
        if(!authorization){
            throw new Error('Unauthorized')
        }
        if(!(authorization.startsWith('Bearer'))){
            throw new Error('Unauthorized')
        }
        const token = authorization.split(' ')[1]
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        console.log(payload)
        const admin = await db.admin.findFirstOrThrow({where : {id : payload.id}})
        delete admin.password
        console.log(admin)
        req.admin = admin
        next()
        
    } catch (err) {
        next(err)
    }

    
}