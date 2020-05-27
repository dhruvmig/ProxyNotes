const Video=require('../models/video');
const User=require('../models/user');
async function addVideo(req,res)
{
    try {
        console.log(req.params.id);
        let response=await User.findOne({_id:req.params.id});
        if(!response)
        {
            console.log("user doess not exist");
            res.status(500).send('user does not exist');
        }
        else
        {
            let video=new Video({
                userId:req.params.id,
                videos:req.file.path,
                url:`http://localhost:3000/${req.file.path}`
            })    
            let result=await video.save();
            console.log('in post video',req.file.path);

            res.status(200).send(video.url);
        }
        
    } 
    catch (error) {
        console.log('error in add video',error);
        res.status(500).send(error);
    }
}

async function getVideo(req,res)
{
    try {
        let video=await Video.find({userId:req.params.id});
        // console.log('in get video ' ,video);
        if(!video)
        {
            res.status(401).send("user does not exist");
        }
        console.log(video)
        res.status(200).send(video);
    } 
    catch (error) {

        console.log('error to get video',error);
        res.status(500).send(error);
    }
}

module.exports={addVideo,getVideo};