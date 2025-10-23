//Function to calculate average score from an array of scores
function calculateAverage(scores){

    //Initializes total to 0
    let averageTotal = 0;

    //For loop to go through each score in array
    for(let i = 0; i < scores.length; i++){

        //Adds each score to total
        averageTotal += scores[i];
    }

    //Returns 0 if the scores array is empty
    if (scores.length === 0){
        return 0;
    }
    
    //Returns the average score
    else {
        return averageTotal / scores.length;
    }
}

//Help with dropLowestScore function provided by Google Gemini https://gemini.google.com/share/f60793a083ed
//Function to drop the lowest score from an array of scores
function dropLowestScore(scores){

    //Returns empty array if scores array is empty
    if (scores.length === 0){
        return [];
    }
    
    //Sets the first score as the lowest score
    let lowestScore = scores[0];

    //Initializes array to for new array with lowest score dropped
    let lowestDropped = [];

    //For loop to find the lowest score in the array
    for (let i = 0; i < scores.length; i++){

        //Compares each value to see which is the lowest in the array
        if(scores[i] < lowestScore){
            lowestScore = scores[i];
        }
    }
    
    //Initializes the boolean to check if the lowest grade has been dropped
    let lowestGradeDropped = false;

    //For loop to add grades to new array
    for(let i = 0; i < scores.length; i++){
        
        //If statement to check for lowest grade and skip other instances of its
        if(scores[i] == lowestScore && lowestGradeDropped == false){
            lowestGradeDropped = true;
            continue;
        }

        //Adds grades to the new array
        lowestDropped.push(scores[i]);
    }
    return lowestDropped
}

//Function to get letter grade based on number score
function getLetterGrade(score){
    //Returns A for 90 and above
    if (score >= 90){
        return "A";
    }

    //Returns B for 80 to 89
    else if (score >= 80){
        return "B";
    }

    //Returns C for 70 to 79
    else if (score >= 70){
        return "C";
    }

    //Returns D for 60 to 69
    else if (score >= 60){
        return "D";
    }

    //Returns F for below 60
    else {
        return "F";
    }
}

//Function to curve grades by a specified amount
function curveGrades(scores, curveAmount){
    //Initializes array for curved scores
    let curvedScores = [];

    //For loop to go through each score and add curve amount
    for (let i = 0; i < scores.length; i++){

        //Adds curve amount to each score
        let newScore = scores[i] + curveAmount;

        //If statement to check if new score exceeds 100
        if (newScore > 100){
            newScore = 100;
        }

        //Adds new curved score to curvedScores array
        curvedScores.push(newScore);
    }

    //Returns array of curved scores
    return curvedScores;
}

//Test Cases
//Average Scores
console.log(calculateAverage([80, 90, 70]));//80
console.log(calculateAverage([100, 50, 75]));//75
console.log(calculateAverage([]));//0

//Drop Lowest Score
console.log(dropLowestScore([80, 90, 70, 85]));//[80, 90, 85]
console.log(dropLowestScore([50, 50, 75, 100]));//[50,75,100]

//Get Letter Grades
console.log(getLetterGrade(95));//A
console.log(getLetterGrade(82));//B
console.log(getLetterGrade(58));//F

//Curve Grades
console.log(curveGrades([85, 95, 70], 10));//[95, 100, 80]
console.log(curveGrades([90, 96, 80], 5));//[95, 100, 85]