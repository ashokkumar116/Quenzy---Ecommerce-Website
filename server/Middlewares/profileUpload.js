const multer = require('multer');


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/profiles/");
    },
    filename:function(req,file,cb){
        const uniqueName = `${Date.now()} - ${file.originalname}`;
        cb(null,uniqueName);
    }
})

const fileFilter = (req,file,cb)=>{
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(file.mimetype);
    const mimetype = allowedTypes.test(file.originalname.toLowerCase());

    if(extname && mimetype){
        return cb(null,true);
    } else {
        cb("Error: File type not supported");
    }
}

const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize:1024*1024*5}
})

module.exports = upload;