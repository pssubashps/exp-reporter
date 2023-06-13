const fs = require('fs'); 
const {parse}  = require('csv-parse');
const events = require('events');
const eventEmitter = new events.EventEmitter();



const startParsing = () =>{
    console.log('parsing started..');
    let csvData=[];
    let category = [];
    const filename = 'June2023';
    amountParser = (amt) => parseFloat(amt.slice(1).replace(/,/g, ''));
    fs.createReadStream('./data/'+filename+'.csv').pipe(parse({delimiter: ','}))
    .on('data', function(data){
        try {
            if(data[0].trim() !== 'Date' && (data[0] != '')) {
                const parts = data[0].split("/");
                const dt = new Date(Number('2023'), Number(parts[1]) - 1, Number(parts[0]));
                csvData.push({date: dt,category:data[1],item:data[2],amount: amountParser(data[3])});
            }
            if((data[8] != '') && data[8] != 'Total') {
                category.push({category:data[8], budget: amountParser(data[9])})
            }
          //  console.log(data[8]);
    
        }
        catch(err) {
            //error handler
        }
    })
    .on('end',function(){
    
      // const fs2 = require('fs'); 
    //  console.log(JSON.stringify(csvData));
      
        fs.writeFileSync('./data/'+filename+'.json', JSON.stringify(csvData), 'utf8', ()=>{});
        fs.writeFileSync('./data/'+filename+'_category.json', JSON.stringify(category), 'utf8', ()=>{});
        eventEmitter.emit('PARSECSVCOMPLETED');
    }); 
}

module.exports = {startParsing,eventEmitter};

