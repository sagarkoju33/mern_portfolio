const Upload = require("./upload");
const { Store } = require("../models/store");

const uploadFile = async (req, res, isProfile = true) => {
  try {
    const upload = await Upload.uploadFile(req.file.path);
    if (isProfile) {
      var store = new Store({
        file_url: upload.secure_url
      });
      var record = await store.save();
      res.status(200).send({
        success: true,
        message: "File Uploaded Successfully!",
        data: record
      });
    }
    else {
      const fileUrl = upload.secure_url;
      res.status(200).send({
        success: true,
        message: "File Uploaded Successfully!",
        data: { file_url: fileUrl }
      });
    }


  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  uploadFile,
};
