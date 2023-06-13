const fs = require('fs');


const calculate = () => {
    const filebaseName = 'June2023';
    const jsonFilename = `./data/${filebaseName}_category.json`;
    const expenseFilename = `./data/${filebaseName}.json`;
    let categoryData = JSON.parse(fs.readFileSync(jsonFilename,'utf8'));
    categoryData = categoryData.map(item=> {
        return {...item, spent:0 }
    })
    console.log(categoryData);
    const expenseData = JSON.parse(fs.readFileSync(expenseFilename,'utf8'));
   
    getcategoryId = (category) => {
       // console.log(categoryData);
        return categoryData.findIndex((item)=>{
           return item.category === category;
        });
    }
    //console.log(categoryData);
    let totalSpent = 0;
    expenseData.forEach(exp => {
        const catIndex =getcategoryId(exp.category);
       // console.log(categoryData[catIndex]);
        if(catIndex == -1) {
            console.warn("No Category found");
        }else{
            categoryData[catIndex].spent = categoryData[catIndex].spent + exp.amount;
            totalSpent += exp.amount;
        }
       // console.log(exp);
    });
    fs.writeFile('./data/'+filebaseName+'_category1.json', JSON.stringify(categoryData), 'utf8', ()=>{});
    console.table(categoryData);
    budgetAmount = 0;
    categoryData.forEach(item=>{
        budgetAmount += item.budget;
    })
    console.log('Total Spent Amount=>',totalSpent);
    console.log('Total Budget Amount=>',budgetAmount);
}

module.exports = calculate;

