//Arrow function to convert Celsius to Fahrenheit
const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;

//Arrow function to convert Fahrenheit to Celsius
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;

//Function to get temperature description based on Fahrenheit value
function getTemperatureDescription(fahrenheit) {
    //Returns "freezing" if below 32°F
    if (fahrenheit < 32) {
        return "Freezing";
    }

    //Returns "cold" if between 32°F and 50°F inclusive
    else if (fahrenheit >= 32 && fahrenheit <=50) {
        return "Cold";
    }

    //Returns "cool" if between 51°F and 70°F inclusive
    else if (fahrenheit >= 51 && fahrenheit <= 70) {
        return "Cool";
    }

    //Returns "warm" if between 71°F and 85°F inclusive
    else if (fahrenheit >= 71 && fahrenheit <=85){
        return "Warm";
    }

    //Returns "hot" if above 85°F
    else {
        return "Hot";
    }
}
//Test Cases
//Celsius to Fahrenheit
console.log(celsiusToFahrenheit(0)); //32
console.log(celsiusToFahrenheit(100)); //212
console.log(celsiusToFahrenheit(-40)); //-40

//Fahrenheit to Celsius
console.log(fahrenheitToCelsius(32)); //0
console.log(fahrenheitToCelsius(68)); //20
console.log(fahrenheitToCelsius(212)); //100

//Temperature Descriptions
console.log(getTemperatureDescription(25)); //Freezing
console.log(getTemperatureDescription(75)); //Warm
console.log(getTemperatureDescription(95)); //Hot
