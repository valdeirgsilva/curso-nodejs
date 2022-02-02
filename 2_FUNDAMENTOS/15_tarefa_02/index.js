const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer.prompt([
  {
    name: 'nome',
    message: 'Qual é o seu nome?',
    validate: function(input) {
      if (typeof input !== 'string') {
        return 'Você precisa digitar um nome aqui';
      }
      return true;
    },
  },
  {
    name: 'idade',
    message: 'Qual a sua idade?',
    filter: function(input) {
      return Number(input);
    },
    validate: function(input) {
      if (input !== input) {
        return 'Digite um número para idade';
      } else if (input <= 0) {
        return 'Um valor nulo ou negativo não é apropriado para idade';
      } else {
        return true;
      }
    },
  },
])
.then((answers) => {
  if (!answers.nome) {
    throw new Error('O nome é obrigatório');
  }

  console.log(chalk.bgYellow.black(
    `Você se chama ${answers.nome} e tem ${answers.idade} ano`
    + (answers.idade > 1 ? 's.' : '.')
  ));
})
.catch((err) => {
  console.log(chalk.bgRed(err));
});
