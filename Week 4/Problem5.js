//Function to reverse an array
function reverseArray(arr) {

    //Initializes reversed array
    let reversed = [];

    //For loop to go through the array backwards
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}

//Function to remove duplicates from an array
function removeDuplicates(arr) {
    //Initializes array for new array without duplicates
    let nonDuplicateArray = [];

    //For loop to find duplicates in the array
    for (let i = 0; i < arr.length; i++) {

        //If statement to check if element is already in nonDuplicateArray
        if (!nonDuplicateArray.includes(arr[i])){
            
            //Adds element to nonDuplicateArray if not a duplicate
            nonDuplicateArray.push(arr[i]);
        }
    }

    return nonDuplicateArray;
}

//Function to rotate an array by a given number of positions
function rotateArray(arr, positions) {
    
    //Initializes rotated array
    let rotatedArray = [];

    //For loop to go through array
    for (let i = 0; i < arr.length; i++) {
        
        //Creates new index for rotated array
        let newIndex = (i + positions) % arr.length;

        //Adds the rotated elements to new array
        rotatedArray[newIndex] = arr[i];
    }

    return rotatedArray;
}

//Function to find the second largest number in an array
function findSecondLargest(arr) {
    //Initializes largest and second largest variables
    let largest;
    let secondLargest;

    for(let i = 0; i < arr.length; i++){

    }
}

//Test Cases
//Reverse Array
console.log(reverseArray([1, 2, 3, 4])); //[4, 3, 2, 1]
console.log(reverseArray(['a', 'b', 'c'])); //['c', 'b', 'a']
console.log(reverseArray([])); //[]

//Remove Duplicates
console.log(removeDuplicates([1, 2, 2, 3, 1, 4])); //[1, 2, 3, 4]
console.log(removeDuplicates(["a", "b", "a", "c"]))//["a", "b", "c"]

//Rotate Array
console.log(rotateArray([1,2,3,4], 1)); //[4,1,2,3]
console.log(rotateArray([1,2,3,4], 2)); //[3,4,1,2]
console.log(rotateArray([1,2,3], 4)); //[3,1,2]

//Find Second Largest
console.log(findSecondLargest([10,20,30,40]));//30
console.log(findSecondLargest([5,5,5]));//null
console.log(findSecondLargest([100,50,100,75]))//75