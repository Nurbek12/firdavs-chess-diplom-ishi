const multer = require('multer')
const path = require('path')
const uuid = require('uuid').v4

module.exports = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => cb(null, uuid()+file.originalname),
        destination: (req, file, cb) => cb(null, path.join(__dirname, '../', 'upload'))
    })
})