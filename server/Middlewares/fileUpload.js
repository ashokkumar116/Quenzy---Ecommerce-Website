const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'Uploads/Products/');
    },
    filename:function(req,file,cb){
        const uniqueName = Date.now() + file.originalname;
        cb(null,uniqueName);
    }
})

const fileFiler = (req,file,cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb(new Error('Only images are allowed'),false);
    }
}

const upload = multer({
    storage:storage,
    fileFilter:fileFiler,
    limits:{fileSize:1024*1024*5}
});


module.exports = upload;