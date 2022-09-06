import inqui from 'inquirer';

const askWhatVersion = () => {
  const questions = [
    {
      name: 'version',
      type: 'input',
      message: 'What version you want to create for this test cases ?',
      default: "0.0.1",
    },
  ];
  return inqui.prompt(questions);
};

const askWhichFunctions = (listFunctions) => {
  const questions = [
    {
      name: 'function_name',
      type: 'list',
      message: 'Which function you want to make a test case for ?',
      default: 0,
      choices: listFunctions
    },
  ];
  return inqui.prompt(questions);
};

const askFunctionDefinition = (functionName) => {
  const questions = [
    {
      name: 'function_definition',
      type: 'input',
      message: `What is the definition of "${functionName}" function ?`,
    },
  ];
  return inqui.prompt(questions);
};

const askHowMuchTestCases = (functionName) => {
  const questions = [
    {
      name: 'number_of_test_cases',
      type: 'input',
      message: "How many test cases do you want to make ?",
      validate: (input) => {
        const inputNumber = Number(input);
        if (!inputNumber) {
          return "You need to provide a number!"
        }

        return true;
      }
    },
  ];
  return inqui.prompt(questions);
};

const askTestCaseDefinition = (orderTestCase) => {
  const questions = [
    {
      name: 'test_case_definition',
      type: 'input',
      message: `What is the definition of test case ${orderTestCase + 1} ?`,
    },
  ];
  return inqui.prompt(questions);
};

const askInputFunction = (orderInput) => {
  const questions = [
    {
      name: 'input_value',
      type: 'input',
      message: `What is the value of parameter ${orderInput + 1} ?`,
    },
    {
      name: 'input_type',
      type: 'list',
      message: `What is the type of parameter ${orderInput + 1} ?`,
      default: 0,
      choices: ["string", "number", "boolean"],
    },
  ];
  return inqui.prompt(questions);
};

const askOutputFunction = (orderTestCase) => {
  const questions = [
    {
      name: 'output_value',
      type: 'input',
      message: `What is the value of output test case ${orderTestCase + 1} ?`,
    },
    {
      name: 'output_type',
      type: 'list',
      message: `What is the type of output test case ${orderTestCase + 1} ?`,
      default: 0,
      choices: ["string", "number", "boolean"],
    },
  ];
  return inqui.prompt(questions);
};

const inquirer = {
  askWhatVersion,
  askWhichFunctions,
  askFunctionDefinition,
  askHowMuchTestCases,
  askTestCaseDefinition,
  askInputFunction,
  askOutputFunction,
};

export default inquirer;

