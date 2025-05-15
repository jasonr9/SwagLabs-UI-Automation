// Sin importaciones, define el objeto directamente

/** @type {import('@cucumber/cucumber/api').IConfiguration} */
module.exports = {
  default: {
    require: [
      'features/step-definitions/**/*.ts',
      'src/support/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ['html:reports/report.html'],
    paths: ['features/**/*.feature'],
    parallel: 1,
    publishQuiet: true,
    worldParameters: {
      baseUrl: 'https://example.com'
    },
    defaultTimeout: 150000
  }
};

