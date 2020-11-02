const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const upload = require("../../Middleware/Upload");
var fs = require('fs');
var path = require('path');
var mime = require('mime');

exports.uploadFile = async (req, res) => {

    if (!req.files) {
        console.log('no files')
        return res.status(500).send({ msg: "file is not found" })
    }

    const myFile = req.files.file;
    let dir = `${__dirname}/../../Files`
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let fileName = `${Date.now()}-${myFile.name}`
    myFile.mv(`${dir}/${fileName}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        return res.send({ name: myFile.name, path: `Files/${fileName}` });
    });
};

exports.downloadFile = async (req, res) => {
    const { filePath } = req.query;

    var file = `${__dirname}/../../${filePath}`

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
};





