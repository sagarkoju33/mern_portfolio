const Upload = require("./upload");
const { Store } = require("../models/store");

const uploadFile = async (req, res) => {
  try {
    const upload = await Upload.uploadFile(req.file.path);

    // Delete all previous records before saving new one
    await Store.deleteMany({});

    const store = new Store({
      file_url: upload.secure_url,
    });
    const record = await store.save();

    res.status(200).send({
      success: true,
      message: "File Uploaded Successfully!",
      data: record,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  uploadFile,
};
