//
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
const inquirer = require("inquirer");
const masterPassword = "test";
const fs = require("fs").promises;
const args = process.argv.slice(2);
const actualPassword = args[0];

async function getData() {
  const promise = await fs.readFile("./db.json", "utf8");
  const data = await JSON.parse(promise);
  return data;
}

const questions = [
  {
    type: "password",
    name: "password",
    message: "Enter your password",
  },
];

async function validateAccess() {
  const answers = await inquirer.prompt(questions);
  if (answers.password !== masterPassword) {
    console.error("Nice try...try again");
    return;
  }
  console.log("wow...how'd you managed?");

  const passwordSafe = await getData();

  const password = passwordSafe[actualPassword];
  if (password) {
    console.log(`${actualPassword}: ${password}`);
  } else {
    console.log("Endlevel!");
  }
}

validateAccess();
