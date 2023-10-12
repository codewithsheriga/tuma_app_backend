'use strict';

/**
 * popular-worker service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::popular-worker.popular-worker');
