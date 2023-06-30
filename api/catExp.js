const fs = require('fs');
const PDFDocument = require('pdfkit');

const catExp = () => {
    const filebaseName = 'June2023';
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`${filebaseName}.pdf`));
  
    const jsonFilename = `./data/${filebaseName}_category.json`;
    const expenseFilename = `./data/${filebaseName}.json`;
    let expData = JSON.parse(fs.readFileSync(expenseFilename,'utf8'));
    let catWiseExp = {};
    expData.forEach(data => {
        if(catWiseExp[data.category]) {
            
            catWiseExp[data.category].push(data);
        }else{
            catWiseExp[data.category] = [];
            catWiseExp[data.category].push(data);
        }
    });
    console.log(catWiseExp);
    let yAxis = 40;
    let currentPage = headerPage = 1;
    for (const property in catWiseExp) {
        console.log(`${property}`);
        console.table(catWiseExp[property]);

        if (yAxis > 600)  {
            doc.addPage();
            currentPage++;
            yAxis = 40;
        }
        let xAxis = 50;
        doc.rect(xAxis - 25,  yAxis - 25, 475, 30).stroke();
        let headYaxis = yAxis - 10 ;
        let headXaxis = xAxis;
        doc.text(property, xAxis, headYaxis );
        yAxis = yAxis + 50;

         /** top line */
         doc.moveTo(xAxis -25, yAxis - 10)                               // set the current point
         .lineTo(xAxis + 450, yAxis - 10) 
         .stroke(); 
         itemTotal = 0;
         catWiseExp[property].forEach(item => {
            itemTotal = itemTotal + item.amount;
         });
         doc.text(itemTotal, headXaxis + 400, headYaxis );
        catWiseExp[property].forEach(item => {
            xAxis = 50;
           // doc.text(`${item.date}${item.item} ${item.amount}`);
           doc.text(item.date,xAxis,yAxis);
           doc.text(item.item,xAxis + 200 ,yAxis,);
           doc.text(item.amount,xAxis + 400,yAxis,);
           yAxis = yAxis + 15;
           itemTotal = itemTotal + item.amount;
           /** Bottom line */
           doc.moveTo(xAxis -25, yAxis)                               // set the current point
           .lineTo(xAxis + 450, yAxis) 
           .stroke(); 
           /** Left vertical line */
           doc.moveTo(xAxis -25, yAxis - 25)                               // set the current point
           .lineTo(xAxis -25, yAxis) 
           .stroke(); 

           /**
            * right line
            */
           doc.moveTo(xAxis + 450, yAxis - 25)                           
           .lineTo(xAxis + 450, yAxis) 
           .stroke(); 
           yAxis = yAxis + 10;
           if (yAxis > 640)  {
          
            doc.addPage();
            currentPage++;
            yAxis = 40;
        }
        });
        
       
        
        yAxis = yAxis + 50;
  
      }
      doc.end();
      
}
module.exports = catExp;