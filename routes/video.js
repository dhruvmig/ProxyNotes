const Video=require('../controllers/video');
const multer=require('multer');
const express=require('express');
const router=express.Router();
const verifyToken = require('../middleware/verifyToken');


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    // cb(null,false)//to reject a file
    // cb(null,true) to accept a file
    if( file.mimetype === 'video/mp4' )
    {
        cb(null,true);
    }
    else{
        cb(new Error('You can only upload .mp4 format'),false);
    }
}
const upload=multer({storage:storage,limits:{
    fileSize:1024*1024*10,

},
fileFilter:fileFilter   
});

router.route('/:id/upload').post(upload.single('video'),verifyToken,Video.addVideo);
router.route('/videos/:id').get(verifyToken,Video.getVideo);

module.exports=router;
