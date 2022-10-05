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
      filters: {
        ...query,
        userId: user.id,
      },
    });
    return result;
  },

  async findOne(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;
    const result = await strapi.service("api::todos.todos").find({
      filters: {
        id,
        userId: user.id,
      },
    });

    if (result.results.length > 0) {
      return result.results[0];
    } else {
      ctx.response.status = 404;
      return {
        data: null,
        error: {
          status: 404,
          name: "NotFoundError",
          message: "Not Found",
          details: {},
        },
      };
    }
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
    const checkTodo = await strapi.service("api::todos.todos").find({
      filters: {
        id,
        userId: user.id,
      },
    });

    if (checkTodo.results.length === 0) {
      ctx.response.status = 404;
      return {
        data: null,
        error: {
          status: 404,
          name: "NotFoundError",
          message: "Not Found",
          details: {},
        },
      };
    }

    const result = await strapi
      .service("api::todos.todos")
      .update(id, { data: todo });
    return result;
  },

  async delete(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;
    const checkTodo = await strapi.service("api::todos.todos").find({
      filters: {
        id,
        userId: user.id,
      },
    });

    if (checkTodo.results.length === 0) {
      ctx.response.status = 404;
      return {
        data: null,
        error: {
          status: 404,
          name: "NotFoundError",
          message: "Not Found",
          details: {},
        },
      };
    }

    const result = await strapi.service("api::todos.todos").delete(id, {
      filters: {
        userId: user.id,
      },
    });
    return result;
  },
}));
