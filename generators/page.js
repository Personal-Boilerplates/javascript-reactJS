/**
 * @param {import('plop').NodePlopAPI} plop
 */
module.exports = function (plop) {
  plop.setGenerator('page', {
    description: 'Application page creation',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Inform page name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/pages/{{pascalCase name}}/index.js',
        templateFile: 'templates/page/index.js.hbs',
      },
      {
        type: 'add',
        path: '../src/pages/{{pascalCase name}}/styles.js',
        templateFile: 'templates/page/styles.js.hbs',
      },
      {
        type: 'add',
        path: '../src/pages/{{pascalCase name}}/types.js',
        templateFile: 'templates/page/types.js.hbs',
      },
    ],
  });
};
