const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const upload = require("../../Middleware/Upload");
var fs = require('fs');
var path = require('path');
var mime = require('mime');
const pdf2base64 = require('pdf-to-base64');


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

    let readStream = fs.createWriteStream(file);
    let stat = fs.statSync(file);
    var filename = path.basename(file);

    // var filename = path.basename(file);
    // var mimetype = mime.lookup(file);

    // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    // res.setHeader('Content-type', mimetype);

    // var filestream = fs.createReadStream(file);
    // filestream.pipe(res);

    // readStream.on('close', () => {
    //     res.end()
    // })

    // // Stream chunks to response
    // res.setHeader('Content-Length', stat.size);
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'inline; filename='+ filename);
    // readStream.pipe(res);

    try{
        let base64File = await pdf2base64(file)

        return res.send({
            name: filename, 
            data: base64File 
           });
    }catch(ex){
        console.log(ex)
        return next(new AppError('Unable to create base 64', 500));
    }

};





