// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
const defaultConfig = require('./protractor.conf');
let prodConfig = {
  params: {
    env: "prod"
  },
  baseUrl: 'http://0.0.0.0:4200/',
};
exports.config = Object.assign(defaultConfig.config, prodConfig);