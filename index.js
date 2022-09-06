import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import files from './lib/files.js';
import inquirer from './lib/inquirer.js';

clear();

console.log(
  chalk.yellow(
    figlet.textSync('moses', { horizontalLayout: 'full' })
  )
);

if (files.directoryExists('.git')) {
  console.log(chalk.red('Already a Git repository!'));
  process.exit();
}

const run = async () => {
  const labelUserFinishCreateTestCase = 'Finish create test case';
  const listFunctionName = ['subtraction', 'addition', labelUserFinishCreateTestCase];
  const listFunctions = [];
  const parameterLength = 2;

  const version = await inquirer.askWhatVersion();

  for (let i = 0; i < listFunctionName.length; i++) {
    const userTestCases = [];

    // CREATE FUNCTION NAME
    const functionName = await inquirer.askWhichFunctions(listFunctionName);
    const valueFunctionName = functionName?.function_name;

    if (valueFunctionName === labelUserFinishCreateTestCase) {
      break;
    }

    console.log(`
============= Create test case for ${valueFunctionName} =============
    `);

    // CREATE FUNCTION DEFINITION
    const functionDefinition = await inquirer.askFunctionDefinition(valueFunctionName);
    const valueFunctionNameDefinition = functionDefinition?.function_definition;

    // CREATE FUNCTION TEST CASE
    const numberOfTestCases = await inquirer.askHowMuchTestCases();
    const valueNumberOfTestCases = numberOfTestCases?.number_of_test_cases;

    for (let j = 0; j < valueNumberOfTestCases; j++) {
      const inputFunction = [];

      console.log(`
============ Create test case number ${j + 1} for ${valueFunctionName} =============
      `);

      const testCaseDefintion = await inquirer.askTestCaseDefinition(j);
      const valueTestCaseDefintion = testCaseDefintion?.test_case_definition;

      for (let k = 0; k < parameterLength; k++) {
        console.log(`
============ Insert parameter ${k+1} for test case ${j + 1} =============
        `);

        const valueInputFunction = await inquirer.askInputFunction(k);
        
        inputFunction.push({
          order: k,
          value: valueInputFunction?.input_value,
          type: valueInputFunction?.input_type,
        })
      }

      console.log(`
============ Insert output for test case ${j + 1} =============
      `);

      const testCaseOutput = await inquirer.askOutputFunction(j);

      const userTestCase = {
        order: j,
        defintion: valueTestCaseDefintion,
        inputs: inputFunction,
        output: {
          value: testCaseOutput?.output_value,
          type: testCaseOutput?.output_type,
        }
      }

      console.log(`
============ Result test case ${j + 1} =============`);
      console.log(userTestCase);
      console.log(`===================================================
      `);

      userTestCases.push(userTestCase);
    }

    const functionTestCase = {
      function_name: valueFunctionName,
      function_definition: valueFunctionNameDefinition,
      test_case: {
        user_test_cases: userTestCases
      }
    };

    listFunctions.push(functionTestCase);
    const indexFunction = listFunctionName.findIndex(name => name === valueFunctionName);
    listFunctionName.splice(indexFunction, 1);
  }

  const config = {
    "version": version?.version,
    "albar_version": "0.0.1",
    "functions": listFunctions
  };

  console.log(config);
};

run();