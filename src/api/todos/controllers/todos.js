'use strict';

/**
 * todos controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::todos.todos');
