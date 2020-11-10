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
console.log("KeyMaster3000");

const masterPassword = "test";

const inquirer = require("inquirer");

let questions = [
  {
    type: "input",
    name: "name",
    message: "What's your name?",
  },
  {
    type: "checkbox",
    name: "mood",
    message: "How are you today?",
    choices: ["good", "bad", "mehhh"],
  },
  {
    type: "password",
    name: "password",
    message: "Enter your password",
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(`Hi ${answers["name"]}!`);

  if (answers["mood"] === "good") {
    console.log("Nice!");
  } else if (answers["mood"] === "bad") {
    console.log("oh nooo");
  }

  if (answers["password"] === masterPassword) {
    console.log("Tippi Toppi");
  } else {
    console.log("Not today Satan");
  }
});
