import * as path from "node:path";
import * as crypto from "node:crypto";

import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(process.cwd(), "tmp"));
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const sufix = crypto.randomUUID();

    cb(null, `${basename}-${sufix}${extname}`);
  },
});

export default multer({ storage });
