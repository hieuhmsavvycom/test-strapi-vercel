"use strict";

/**
 * todos controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::todos.todos", ({ strapi }) => ({
  async find(ctx) {
    const { user } = ctx.state;
    const { query } = ctx;
    const result = await strapi.service("api::todos.todos").find({
      ...query,
      userId: user.id,
    });
    return result;
  },

  async findOne(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;
    const result = await strapi.service("api::todos.todos").findOne(id, {
      userId: user.id,
    });
    return result;
  },

  async create(ctx) {
    const { user } = ctx.state;
    const { data: todo } = ctx.request.body;
    const result = await strapi.service("api::todos.todos").create({
      data: { ...todo, userId: user.id },
    });
    return result;
  },

  async update(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;
    const { data: todo } = ctx.request.body;
    const checkTodo = await strapi.service("api::todos.todos").findOne(id, {
      userId: user.id,
    });

    if (!checkTodo) {
      ctx.response.status = 404;
      return;
    }

    const result = await strapi.service("api::todos.todos").update(id, todo);
    return result;
  },

  async delete(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;
    const result = await strapi.service("api::todos.todos").delete(id, {
      userId: user.id,
    });
    return result;
  },
}));
