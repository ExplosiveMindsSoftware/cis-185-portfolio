//Help with functions provided by Google Gemini https://gemini.google.com/share/96d228cfd022
//Function to create a pyramid from asterisks
function createPyramid(height) {

    //Returns empty string if height is less than or equal to 0
    if (height <= 0){
        return "";
    }

    //Initializes pyramid string
    let pyramid = "";

    //For loop to create each level of the pyramid
    for (let i = 0; i < height; i++) {

        //Adds spaces based on row length
        let spaces =" ".repeat(height-i-1);

        //Adds asterisks based on row length
        let asterisks = "*".repeat(2*i+1);

        //Concatenates the spaces and asterisks to form the pyramid
        pyramid += spaces + asterisks + "\n";
    }
    return pyramid;
}

//Function to create a number staircase
function createNumberStaircase(steps){
    //If statement to check if steps are less than or equal to 0
    if(steps <= 0){
        return "";
    }

    //Initializes staircase string
    let staircase = "";

    //Initializes the current step
    let currentStep = "";

    //For loop to create each step of the staircase
    for (let i = 1; i <= steps; i++) {

        //Adds the current number to the step
        currentStep += i;

        //Separates each step
        staircase += currentStep + "\n";
    }

    return staircase;
}

//Function to create a checkerboard pattern
function createCheckerBoard(size){

    //If statement to check if size is less than or equal to 0
    if(size <= 0){
        return "";
    }

    //Initializes checkerboard string
    let checkerboard = "";

    //For loop to create checkerboard rows
    for(let row = 0; row < size; row++){

        //Initializes the current row
        let currentRow = "";

        //For loop to create checkerboard columns
        for (let col = 0; col < size; col++){

            //If statement to place Xs every other column
            if((row+col)%2 == 0){
                currentRow += "X";
            }

            //Else statement for adding Os after Xs
            else{
                currentRow += "O"
            }
        }

        //Adds the column to the checkerboard pattern
        checkerboard += currentRow + "\n"
    }
    return checkerboard
}

//Test Cases
//Pyramid
console.log(createPyramid(3));
console.log(createPyramid(4));

//Number Staircase
console.log(createNumberStaircase(5));

//Checkerboard
console.log(createCheckerBoard(4));