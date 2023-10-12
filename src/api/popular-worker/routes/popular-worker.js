'use strict';

/**
 * popular-worker router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::popular-worker.popular-worker');
