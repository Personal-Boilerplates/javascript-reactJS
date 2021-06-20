/**
 * @param {import('plop').NodePlopAPI} plop
 */
module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Application component creation',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Inform component name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/shared/components/{{pascalCase name}}/index.js',
        templateFile: 'templates/component/index.js.hbs',
      },
      {
        type: 'add',
        path: '../src/shared/components/{{pascalCase name}}/stories.js',
        templateFile: 'templates/component/stories.js.hbs',
      },
      {
        type: 'add',
        path: '../src/shared/components/{{pascalCase name}}/styles.js',
        templateFile: 'templates/component/styles.js.hbs',
      },
      {
        type: 'add',
        path: '../src/shared/components/{{pascalCase name}}/test.js',
        templateFile: 'templates/component/test.js.hbs',
      },
      {
        type: 'add',
        path: '../src/shared/components/{{pascalCase name}}/types.js',
        templateFile: 'templates/component/types.js.hbs',
      },
    ],
  });
};
