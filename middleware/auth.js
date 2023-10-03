const {Unauthorized} = require('../errors/unauthorized')
const jwt = require('jsonwebtoken')


const authorize = async(req,res,next) =>{
       
      const authHeader = req.headers.authorization

       if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new Unauthorized('No token Present')
       }

       const token = authHeader.split(' ')[1]

       try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decoded
        req.user = {id,username}
        next()
       } catch (error) {
        console.log(error)
        throw new Unauthorized('Not authorized to access this route')
       }
}
module.exports = authorize