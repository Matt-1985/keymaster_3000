const inquirer = require("inquirer");

async function askForMasterPassword() {
  const { masterPassword } = await inquirer.prompt([
    {
      type: "input",
      name: "masterPassword",
      message: "What is the super duper secret master password?",
    },
  ]);

  return masterPassword;
}

async function askForNextStep() {
  const nextStep = await inquirer.prompt([
    {
      type: "list",
      name: "searchAndAdd",
      message: "What do you want to do?",
      choices: ["Search", "Add"],
    },
  ]);

  return nextStep;
}

exports.askForMasterPassword = askForMasterPassword;
exports.askForNextStep = askForNextStep;
