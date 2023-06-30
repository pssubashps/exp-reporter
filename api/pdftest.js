const fs = require('fs');
const PDFDocument = require('pdfkit');
const filebaseName = 'June2023';
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream(`${filebaseName}.pdf`));
//Header
let y = 50;
doc.text('Date',50,y);
doc.text('item',150,y);
doc.text('amount',250,y);
y = 65;
doc.moveTo(30, y)                               // set the current point
   .lineTo(350, y) 
   .stroke(); 
   y = 75;
doc.text('Date',50,y);
doc.text('item',150,y);
doc.text('amount',250,y);
doc.end();