const express =require('express');

const router=express.Router();

router.get('/',(req,res,next)=>{

        res.status(200).json({
        message:'handling get requests to /products'
    });

});

router.get('/:productId',(req,res,next)=>{
    const id=req.params.productId;
    if(id==='special'){
        res.status(200).json({
            message:'you doscovered the special id',
            id:id
        });
    }
    else{
        res.status(200).json({
            message:'you passed an id'
        });
    }
});
router.patch('/:productId',(req,res,next)=>{
   
        res.status(200).json({
            message:'updated',
          
        });
   
});
router.patch('/:productId',(req,res,next)=>{
   
    res.status(200).json({
        message:'updated',
      
    });

});

router.delete('/:productId',(req,res,next)=>{
   
    res.status(200).json({
        message:'deleted',
      
    });

});

router.post('/',(req,res,next)=>{
   const product={
      name:req.body.name,
      price:req.body.price
   }

   
    res.status(201).json({
        message:'handling post requests to /products',
        createdProduct:product
    });

});

module.exports=router;