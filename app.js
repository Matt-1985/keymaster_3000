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
const fs = require("fs").promises;
const args = process.argv.slice(2); //durch slice wird ein neues array umgewandelt für bessere lesbarkeit
const wantedPWDFor = args[0]; // 0 = erste position im neuen arry die angesteuert wird

const masterPassword = "test";

async function getData() {
  const promise = await fs.readFile("./db.json", "utf8"); // asyncrone functionen laufen nebeneinander ; "warte bis recht was kommt und dann gibb es nach links und dannn die nächgste Zeile"
  const data = await JSON.parse(promise); //JSON ist für umwandlung und verarbeitung des Objektes
  return data;
}

async function validateAccess() {
  const rules = [
    {
      type: "password",
      name: "answer",
      message: "Enter your password",
    },
  ];

  const { answer } = await inquirer.prompt(rules); // questions ist das "questions" aus Zeile 48 // await prompt ist das warten auf die nutzer eingabe  //"password" kopiert "password" asus Zeile 51 (destrcution)
  if (answer !== masterPassword) {
    console.error("Nice try...try again");
    return; // return bedeutet in diesem zusammenhang das beenden der funktion
  }
  console.log("wow...how'd you managed?");

  const passwordSafe = await getData();

  const password = passwordSafe[wantedPWDFor];
  if (password) {
    console.log(`${wantedPWDFor}: ${password}`);
  } else {
    console.log("Password not found...you fraud!");
  }
}

validateAccess();
