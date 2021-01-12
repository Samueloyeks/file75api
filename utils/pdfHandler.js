var pdf = require("pdf-creator-node");
var fs = require('fs');
const PDFDocument = require('pdfkit');
const request = require('request');

class pdfHandler {
    constructor(request) {
        this.request = request;
    }

    download(uri, filename, callback) {
        request.head(uri, function (err, res, body) {
            request(uri)
            console.log();
        });
    }


    async generateMOA() {
        let pdfDoc = new PDFDocument;
        let pdfname = Math.random().toString(36).slice(2) + '.pdf'
        pdfDoc.pipe(fs.createWriteStream(pdfname));

        pdfDoc.text("THE FEDERAL REPUBLIC OF NIGERIA", { align: 'center' });
        pdfDoc.text("COMPANIES AND ALLIED MATTERS ACT", { align: 'center' });
        pdfDoc.text("COMPANY LIMITED BY SHARES", { align: 'center' });
        pdfDoc.text("MEMORANDUM OF ASSOCIATION OF " + this.request.companyName1, { align: 'center' });

        pdfDoc.moveDown();

        pdfDoc.text("1. The name of the company is " + this.request.companyName1, { align: 'left', fontWeight: 'bold' });
        pdfDoc.text("2. The registered office of the company is situated in Nigeria", { align: 'left' });
        pdfDoc.text("3. The object for which the company is established is to: ", { align: 'left' });
        pdfDoc.moveDown(0.5)

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

        pdfDoc.addPage();
        let yPos = pdfDoc.y;
        pdfDoc
            .text('SN', 50, yPos)
            .text('NAME ADDRESS AND DESCRIPTION OF SUBSCRIBERS', 90, yPos)
            .text('SHARES TAKEN BY EACH SUBSCRIBER', 200, yPos)
            .text('SIGNATURE OF SUBSCRIBER', 250, yPos,)

        this.request.shareholders.map((shareholder, index) => {
            let yPos = pdfDoc.y;
            // let img = this.fetchImage(shareholder.signature)
            pdfDoc
                .text(index, 50, yPos)
                .text(shareholder.fullName, 90, yPos)
                .text(shareholder.residence, 200, yPos)
                .text(shareholder.sharesPercentage + "%", 250, yPos)
                // .image(img, 250, yPos, { width: 150, height: 150 })
        });

        pdfDoc.moveDown(0.5)

        pdfDoc.end();
    }

}
module.exports = pdfHandler;
