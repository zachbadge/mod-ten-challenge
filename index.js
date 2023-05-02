const inquirer = require('inquirer');
const fs = require('fs');
const prompt = require("prompt-sync")();
const { Circle, Triangle, Square } = require("c:/Users/zachb/OneDrive/Desktop/bootcamp/mod-challenges/mod-ten-challenge/lib/shapes.js");

function writeToFile(fileName, answers) 
{
    let svgString = "";

    svgString =
      '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
      
    svgString += "<g>";

    svgString += `${answers.shape}`;
  
    let shapeChoice;
    if (answers.shape === "Triangle") {
      shapeChoice = new Triangle();
      svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === "Square") {
      shapeChoice = new Square();
      svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
      shapeChoice = new Circle();
      svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }
  
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;

    svgString += "</g>";

    svgString += "</svg>";
  
    fs.writeFile(fileName, svgString, (err) => {
      err ? console.log(err) : console.log("Generated logo.svg");
    });
  }

function userInput(){
    return inquirer.prompt([
    {
        type: "input",
        name: "text",
        message: "What text would you like on your logo? (Three characters max.)",
        
    },

    {
        type: "input",
        name: "textColor",
        message: "Choose text color (Enter color name OR a hexadecimal code (six numbers) )",
        
    },

    {
        type: "list",
        name: "shape",
        message: "What shape would you like the logo to have?",
        choices: ["Circle", "Triangle", "Square", ],
        
    },

    {
        type: "input",
        name: "shapeBackgroundColor",
        message: "Choose shapes color (Enter color name OR a hexadecimal code (six numbers) )",
        
    },

    ])

    .then((answers) => {
        if (answers.text.length > 3) 
        {
          console.log("Must enter a value of no more than 3 characters");
        } 
        else 
        {
          writeToFile("logo.svg", answers);
        }
      });
}

prompt();