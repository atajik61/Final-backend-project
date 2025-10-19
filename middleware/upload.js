import multer from "multer";
import path from "path";
//setup multer
// Multer configuration
const storage = multer.diskStorage({
  destination: "/uploads",

  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({ storage: storage }).single("document");
