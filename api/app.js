/**
 * Bootstarp script
 */
const events = require('events');

const {startParsing,eventEmitter} = require('./parseCsv');
const calculate = require('./calculate');

/****************************************************************
 *  Step 1 : Read and clean up scv
 *****************************************************************/


eventEmitter.once('PARSECSVCOMPLETED', (e) => { 
    console.log('1. CSV reading and parsing completed');
    calculate();
 });

startParsing();


/****************************************************************
 *  Step 2 :Calculate amounts
 *****************************************************************/

console.log('--END--');