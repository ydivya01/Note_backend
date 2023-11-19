const router = require('express').Router()
const Notes = require('../Models/Notes')

router.get('/notes' , async(req,res)=>{
    try{
const search = req.query.search || '';
    }catch(err){
console.log(err)
res.status(500).json({error:true,message:'Internal Server Error'})
    }
})

module.exports = router