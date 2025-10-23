//Function to create a pyramid from asterisks
function createPyramid(height) {

    //Returns empty string if height is less than or equal to 0
    if (height <= 0){
        return "";
    }

    //Initializes pyramid string
    let pyramid = "";

    //For loop to create each level of the pyramid
    for (let i = 1; i <= height; i++) {
        
    }
    return pyramid;
}

//Function to create a number staircase
function createNumberStaircase(steps){
    //If statement to check if steps are less than or equal to 0
    if(steps <= 0){
        return 0;
    }

    //Initializes staircase string
    let staircase = "";

    //For loop to create each step of the staircase
    for (let i = 1; i <= steps; i++) {
        
    }
}

//Function to create a checkerboard pattern
function createCheckerBoard(size){

    //Initializes checkerboard string
    let checkerboard = "";


}

//Test Cases
//Pyramid
console.log(createPyramid(3));
console.log(createPyramid(4));

//Number Staircase
console.log(createNumberStaircase(5));

//Checkerboard
console.log(createCheckerBoard(4));