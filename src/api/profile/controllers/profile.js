// @ts-nocheck
'use strict';

/**
 * profile controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::profile.profile', ({ Strapi }) => ({
    async createMe(ctx) {
        try {
            const user = ctx.state.user;
            if (!user) {
                return ctx.badRequest(401, [{ messages: "No authorized user found!" }]);
            }

            const { fullName, phoneNumber } = ctx.request.body;
            const { files } = ctx.request;

            // Assuming 'image' is the name of the file input in your form
            const image = files.image;

            const result = await strapi.entityService.create('api::profile.profile', {
                data: {
                    fullName,
                    email: user.email,
                    image: image ? image[0] : null,
                    phoneNumber,
                    user: user.id,
                },
            });

            return result;
        } catch (err) {
            return ctx.badRequest(500, [{ messages: [{ id: err.message }] }]);
        }
    },

    async getMe(ctx) {
        try {
            const user = ctx.state.user;
            if (!user) {
                return ctx.badRequest(401, [{ messages: "No authorized user found!" }]);
            }

            const result = await strapi.db.query('api::profile.profile').findOne({
                where: {
                    user: {
                        id: {
                            $eq: user.id,
                        },
                    },
                },
                populate: {
                    image: true,
                },
            });

            return result;
        } catch (err) {
            return ctx.badRequest(500, [{ messages: [{ id: 'Error' }] }]);
        }
    },
}));
