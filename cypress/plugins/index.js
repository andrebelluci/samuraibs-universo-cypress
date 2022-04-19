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

const { Pool } = require('pg')

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const configJson = require(config.configFile)

  const pool = new Pool(configJson.dbConfig)

  on('task', {
    removeUser(email) {
      return new Promise(function (resolve) {
        pool.query('DELETE FROM public.users WHERE email = $1', [email], function (error, result) {
          if (error) {
            throw error
          }
          resolve({ success: result })
        })
      })
    },
    findToken(email) {
      return new Promise(function (resolve) {
        pool.query('select ut.token ' +
          'from public.users u ' +
          'inner join public.user_tokens ut ' +
          'on u.id = ut.user_id ' +
          'where u.email like $1 ' +
          'order by ut.created_at', [email], function (error, result) {
            if (error) {
              throw error
            }
            resolve({ token: result.rows[0].token })
          })
      })
    }
  })
}
