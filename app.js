// const args = require("minimist")(process.argv.slice(2));

// console.log(args["name"]); //joe

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question(`What's your name?`, (name) => {
//   console.log(`Hi ${name}!`);
//   readline.close();
// });

// const inquirer = require("inquirer");

// let questions = [
//   {
//     type: "input",
//     name: "name",
//     message: "What's your name?",
//   },
//   {
//     type: "password",
//     mask: " *",
//     name: "password",
//     message: "Enter your Password",
//   },
// ];

// inquirer.prompt(questions).then((answers) => {
//   console.log(`Hi ${answers["name"]}!`);
//   console.log("Korrekt!");
// });
const args = process.argv.slice(2);
const passwordName = args[0];
console.log(`You want to know the password of ${passwordName}`);
