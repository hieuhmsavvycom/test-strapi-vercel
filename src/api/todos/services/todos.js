'use strict';

/**
 * todos service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::todos.todos');
