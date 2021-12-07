
const multer = require("multer");


const storage = multer.diskStorage({
    destination: "public/images/",
  
    filename: function (req, file, cb) {
      const suffix = Date.now() + Math.round(Math.random() * 100);
      const extension = ".jpg";
      console.log("file:", file);
      cb(null, file.fieldname + '-' + suffix + extension);
    },
  });

const upload = multer({ storage: storage });  

module.exports = upload;