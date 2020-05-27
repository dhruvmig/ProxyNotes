const mongoose=require('mongoose');
const _ = require('lodash');

const videoSchema=mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    videos:{
        type:String
    },
    url:{
        type:String
    }
})
videoSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.omit(userObject, ['userId', 'videos','_id']);
}

const Video=mongoose.model('Video',videoSchema);
module.exports=Video;