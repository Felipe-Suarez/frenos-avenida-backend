import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assets/imgs");
    },
    filename: function (req, file, cb) {
        const index = file.mimetype.indexOf('/')
        const fileType = file.mimetype.slice(index + 1)
        cb(null, `${Date.now()}.${fileType}`);
    },

});

const upload = multer({ storage: storage });

export default upload;