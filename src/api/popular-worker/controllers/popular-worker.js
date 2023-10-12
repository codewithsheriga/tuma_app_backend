'use strict';

/**
 * popular-worker controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::popular-worker.popular-worker');
