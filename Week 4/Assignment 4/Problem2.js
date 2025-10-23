//Function to count leaves fallen over a number of days
function countLeaves(days){

    //If statement to check if days are less than or equal to 0
    if(days <= 0){
        return 0;
    }

    //Initializes total leaves to 0
    let outputTotal = 0;

    //For loop to count the leaves fallen each day
    for (let i = 1; i <= days; i++){
        outputTotal += (i * 10);
    }
    return outputTotal;
}
//Help with categorize leaf function provided by Google Gemini https://gemini.google.com/share/35adf6c7b6d0
//Function to categorize leaf colors from an array of leaf color strings
function categorizeLeafColors(leaves){
    
    //Initializes color count object
    let colorCount = {};

    //For loop to go through each leaf color in the array
    for (let color of leaves){
        //If statement to check if color is already in colorCount array
        if (colorCount[color]){
            colorCount[color] += 1;
        }
        
        //Else statement to add new color to colorCount array
        else {
            colorCount[color] = 1;
        }
    }
    return colorCount;
}

//Test Cases
//Count Leaves
console.log(countLeaves(1));//10
console.log(countLeaves(2));//30
console.log(countLeaves(4));//100
console.log(countLeaves(5))//150

//Color count
console.log(categorizeLeafColors(['red', 'yellow', 'red', 'brown', 'yellow', 'green']));//{ red: 2, yellow: 2, brown: 1, green: 1 }
console.log(categorizeLeafColors(["orange", "orange", "orange"]));//{orange: 3}
console.log(categorizeLeafColors([]));//{}