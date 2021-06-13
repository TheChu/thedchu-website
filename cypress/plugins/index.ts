/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
import * as fs from 'fs-extra';
import * as path from 'path';

const getConfigurationByFile = (stage) => {
  const pathToConfigFile = path.resolve('cypress', `cypress.${stage}.json`);

  return fs.readJson(pathToConfigFile);
};

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (_, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const stage = config.env.stage || 'development';

  return getConfigurationByFile(stage);
};
