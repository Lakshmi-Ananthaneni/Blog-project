const multer = require('multer');
const path = require("path")
const upload = multer({dest: 'uploads/'});


const storage = multer.diskStorage({
    destination: function(req: Request, file: any, callback: any) {
      callback(null,'uploads/');
      //callback(null, path.join (__dirname,'/public/images/products'));
      },
    filename: function (req: Request, file: any, callback: any) {
      callback(null,Date.now() + "-" + file.originalname);
    }
  });
  exports.upload = multer({ storage: storage });