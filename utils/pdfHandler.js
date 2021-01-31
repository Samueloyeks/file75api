var pdf = require("pdf-creator-node");
var fs = require('fs');
const PDFDocument = require('pdfkit');
const requester = require('request');

class pdfHandler {
    constructor(request) {
        this.request = request;
    }


    async download(url, dest) {
        const file = fs.createWriteStream(dest);

        await new Promise(async (resolve, reject) => {
            requester(url)
                .pipe(file)
                .on('finish', async () => {
                    // console.log(`The file is finished downloading.`);
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        })
            .catch((error) => {
                console.log(`Something happened: ${error}`);
            });
    }

    nth = function (d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }



    async generateMOA() {
        return new Promise(async (resolve,reject)=>{
            let pdfDoc = new PDFDocument;
            let pdfname = Math.random().toString(36).slice(2) + '.pdf';
            let imgPaths = [];
    
            var writeStream = fs.createWriteStream('files/' + pdfname)
            pdfDoc.pipe(writeStream);
    
            // Heading 
            pdfDoc.text("THE FEDERAL REPUBLIC OF NIGERIA", { align: 'center' });
            pdfDoc.text("COMPANIES AND ALLIED MATTERS ACT", { align: 'center' });
            pdfDoc.text("COMPANY LIMITED BY SHARES", { align: 'center' });
            pdfDoc.text("MEMORANDUM OF ASSOCIATION OF " + this.request.companyName1, { align: 'center' });
    
            pdfDoc.moveDown();
    
            // content 
            pdfDoc.text("1. The name of the company is " + this.request.companyName1, { align: 'left', fontWeight: 'bold' });
            pdfDoc.text("2. The registered office of the company is situated in Nigeria", { align: 'left' });
            pdfDoc.text("3. The object for which the company is established is to: ", { align: 'left' });
            pdfDoc.moveDown(0.5)
    
            // business object 
            pdfDoc.fontSize(12).list(this.request.businessObject);
    
            pdfDoc.moveDown(0.5)
    
            pdfDoc.text("4. The company is a(n) " + this.request.companyType + " company", { align: 'left' });
            pdfDoc.text("5. The liability of the members is Limited by shares", { align: 'left' });
            pdfDoc.text("6. The nominal share capital of the Company is "
                + this.request.valueOfShares +
                " divided into "
                + this.request.shareCapitalUnits +
                " ordinary share of N"
                + this.request.pricePerShare +
                ".00 each."
            )
    
            pdfDoc.moveDown();
    
            pdfDoc.text("We, the several persons whose names and addresses are subscribed hereunder are desirous of being formed into a company limited by guarantee in pursuance of this memorandum of association.", { align: 'left' });
    
            // shareholders 
            pdfDoc.addPage();
            let yPos = pdfDoc.y;
            pdfDoc
                .fontSize(11)
                .text('SN', 50, yPos)
                .text('NAME ADDRESS AND DESCRIPTION', 90, yPos)
                .text('SHARES ', 350, yPos)
                .text('SIGNATURE ', 450, yPos,)
    
            pdfDoc.moveDown(2)
    
            await Promise.all(this.request.shareholders.map(async (shareholder, index) => {
                let imgname = Math.random().toString(36).slice(2) + '.jpg';
    
                await this.download(
                    shareholder.signature,
                    `imgs/${imgname}`
                );
                imgPaths[index] = imgname;
            }))
    
    
            this.request.shareholders.map(async (shareholder, index) => {
                let yPos = pdfDoc.y;
    
                pdfDoc
                    .fontSize(10)
                    .text(index, 50, yPos)
                    .text(shareholder.fullName + "," + shareholder.residence, 90, yPos)
                    .text(shareholder.sharesPercentage + "%", 350, yPos)
                    .image(`imgs/${imgPaths[index]}`, 450, yPos, { width: 50 })
                pdfDoc.moveDown(4)
            });
    
            for (var path of imgPaths) {
                fs.unlinkSync(`imgs/${path}`)
            }
    
            let today = new Date();
            let dateToday = today.getDate();
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][today.getMonth()];
            let year = today.getFullYear()
            let todayTH = dateToday + this.nth(dateToday)
    
    
            pdfDoc.moveDown(3)
    
            let imgname2 = Math.random().toString(36).slice(2) + '.jpg';
    
            await this.download(
                this.request.witnessSignature,
                `imgs/${imgname2}`
            );
    
            // ending 
            pdfDoc.x = 50
    
            pdfDoc.text("Dated this " + todayTH + " day of " + month + " " + year, { align: 'left' });
            pdfDoc.moveDown();
            pdfDoc.text("Particulars of witness to the above signatures", { align: 'left' })
            pdfDoc.moveDown();
            pdfDoc.text("Name of witness: " + this.request.witnessName, { align: 'left' })
            pdfDoc.moveDown();
            pdfDoc.text("Address of witness: " + this.request.witnessAddress, { align: 'left' })
            pdfDoc.moveDown();
            pdfDoc.text("Occupation of witness: " + this.request.witnessOccupation, { align: 'left' })
            pdfDoc.moveDown();
    
            let newYpos = pdfDoc.y;
            pdfDoc
                .text('Signature: ', 50, newYpos)
                .image(`imgs/${imgname2}`, 120, newYpos, { width: 50 })
            pdfDoc.moveDown();
    
            fs.unlinkSync(`imgs/${imgname2}`)
    
            pdfDoc.save()
    
            writeStream.on('finish', async ()=> {
                resolve(pdfname)
            });
            pdfDoc.end()
        })
    }

}
module.exports = pdfHandler;
