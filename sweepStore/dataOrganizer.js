/*  
    --- WHAT NEEDS TO BE DONE ---
    1. We can create a dummy dataset to simulate our fucntions on
    2. Our function(s) must be able to reorganize columns (maybe rows) 
        *This information should be sent back to the visualViewer function so that the GUI can correctly display the DB file structure
    3. How do we store the data?
        -We can use an ordered 2D-array to iteratively make post requests
            >This data is what will be used in the post requests when generating new folders and passing information
            >The first set of [] could indicate the folder name 
            >The second set of [] would be the stream data containing all the col/row information
                                         Tree[]
                     WeatherStation1[] <-|    |-> WeatherStation2[]
                      /       |      \          /       |      \
                   Health    Temp   Speed    Health    Temp   Speed            <-- The last level of information would be stream data
*/




const path = require('path')
const dbPath = path.resolve(__dirname, './dummyData/LEVX.csv')
//const sqlite3 = require('sqlite3').verbose();


// let db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Connected to the in-memory SQlite database.');
// });

//Since CSV files don't have table schemas this doesn't work
// let sql = `SELECT *
//             FROM test`;

// db.all(sql, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     rows.forEach((row) => {
//       console.log(row.name);
//     });
//   });

// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });

var fs = require('fs'); 
var parse = require('csv-parse');
var parser = parse({columns: true}, function (err, records) {
	console.log(records);
});
//fs.createReadStream(dbPath).pipe(parser);

var p = parse(dbPath, {columns: true}); 

var columnResults = {};

for(var row = 0; row < p.length; row++) {
    for(var col in p[row]) {
        if(!columnResults[col]) {
            columnResults[col] = [];
        }
        columnResults[col].push(p[row][col]); 
    }
}

console.log("Number of columns:", Object.keys(columnResults).length);
console.log("Column names:", Object.keys(columnResults));
console.log("Column data:", columnResults);