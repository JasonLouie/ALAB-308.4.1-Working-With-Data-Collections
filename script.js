// Part 1: Refactor
const data = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26"

let header = "", cell1 = "", cell2 = "", cell3 = "", cell4 = "", text = "";
let rowCount = 0;

for (let i = 0; i < data.length; i++){
    if (data[i] == "\n"){ // Handle new row
        if (rowCount == 0) {
            header += text;
        } else if (rowCount == 1) {
            cell1 += text;
        } else if (rowCount == 2) {
            cell2 += text;
        } else if (rowCount == 3) {
            cell3 += text;
        }
        text = "";
        rowCount++;
    } else { // Add character for row into 'text'
        text += data[i];
    }
    if (i == data.length-1){ // Add remaining text to last cell if this is the last character of the data.
        cell4 += text;
    }
}

console.log(`Part 1\nHeader: ${header}\nCell 1: ${cell1}, \nCell 2: ${cell2}, \nCell 3: ${cell3}, \nCell 4: ${cell4}`);

// Part 2: Expanding Functionality

// Method 1: Without using the split operator:
// let dataArray = []; // All data
// let tempArray = []; // Row of data
// let dataText = "";

// for (let i = 0; i < data.length; i++){
//     // New line
//     if (data[i] == "\n"){
//         tempArray.push(dataText);
//         dataText = ""; // Reset dataText for new column
//         dataArray.push(tempArray);
//         tempArray = []; // Reset tempArray for new row
//     } else if (data[i] == ",") {
//         tempArray.push(dataText);
//         dataText = ""; // Reset dataText for new column
//     } else {
//         dataText += data[i];
//     }
//     if (i == data.length-1){ // Handle the end of reading data
//         tempArray.push(dataText); // Push last row's last column of data into tempArray
//         dataArray.push(tempArray); // Push last row's data into dataArray
//     }
// }

// Method 2: With the split operator:
let dataArray = data.split("\n");
for(let i = 0; i < dataArray.length; i++){
    dataArray[i] = dataArray[i].split(",");
}

console.log("Part 2");
console.log(dataArray);

// Part 3: Transforming Data
let objectArray = [];

for(let i = 1; i < dataArray.length; i++){
    let tempObj = {};
    for(let j = 0; j < dataArray[i].length; j++){
        tempObj[dataArray[0][j].toLowerCase()] = dataArray[i][j];
    }
    objectArray.push(tempObj);
}

console.log("Part 3");
// Since objectArray itself is being spliced, results in the console may not be accurate.
console.log(objectArray);

// Part 4: Sorting and Manipulating Data

// Remove last element
objectArray.splice(-1, 1);

// Insert at index 1
objectArray.splice(1, 0, {id: "48", name: "Barry", occupation: "Runner", age: "25"});

// Add at the end of the array
objectArray.push({id: "7", name: "Bilbo", occupation: "None", age: "111"});

// Calculate the average age of the group
let totalAge = 0;
for (const row of objectArray){
    for (const key in row){
        if (key === "age"){
            totalAge += Number(row[key]);
        }
    }
}

const averageAge = totalAge/objectArray.length;

console.log("Part 4");
console.log(objectArray);
console.log(`Average Age: ${averageAge}`);

// Part 5: Full Circle (Convert back to csv format)
let dataCSV = "";
let firstRowArray = Object.keys(objectArray[0]);

// Format first row
for (let i = 0; i < firstRowArray.length; i++){
    if (i == 0){
        // First column for row 1 (Make id -> ID)
        dataCSV += firstRowArray[i].toUpperCase() + ",";
    } else if (i < firstRowArray.length-1) {
        // Middle columns for row 1
        dataCSV += (firstRowArray[i].slice(0, 1).toUpperCase() + firstRowArray[i].slice(1) + ",");
    } else {
        // Last column for row 1
        dataCSV += (firstRowArray[i].slice(0, 1).toUpperCase() + firstRowArray[i].slice(1) + "\n");
    }
}
// console.log(`dataCSV: ${dataCSV}`);

// Format data using objectArray
for(let i = 0; i < objectArray.length; i++){
    let tempRowArray = [];
    for(const key in objectArray[i]){
        tempRowArray.push(objectArray[i][key]);
    }
    dataCSV += (tempRowArray.join(",") + ((i == objectArray.length-1) ? "" : "\n"));
}

console.log(`Part 5\n${dataCSV}`);