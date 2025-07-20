

const Upload = require("./upload");
const {Store} = require("../models/store");

const uploadFile = async(req, res)=>{
 try {
        const upload = await Upload.uploadFile(req.file.path);
          var store = new Store({
            file_url:upload.secure_url
        });
        var record = await store.save();
        res.status(200).send({ success: true, message:'File Uploaded Successfully!', data:record });

    } catch (error) {
        res.status(500).send({ succes:false, message:error.message, data:record  });
    }

}

module.exports = {
    uploadFile
}