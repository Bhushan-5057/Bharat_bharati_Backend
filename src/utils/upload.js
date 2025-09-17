import multer from "multer";

const storage = multer.memoryStorage();
const maxSize = 10 * 1024 * 1024; 

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
    limits: { fileSize: maxSize },
});

export default upload;