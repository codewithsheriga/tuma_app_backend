// @ts-nocheck
'use strict';

/**
 * profile router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::profile.profile', ({Strapi})=> ({
    async createMe(ctx){
        try{
            const user = ctx.state.user;
            if(!user){
                return ctx.badRequest(401, [{ messages: "No authorized user found!"}]);
            }
         const  result = await strapi.entityService.create('api::profile.profile', {
                data: {
                    fullName: ctx.request.body.fullName,
                    email: user.email,
                    image: ctx.request.body.image,
                    phoneNumber: ctx.request.body.phoneNumber,
                    user: user.id
                }
            });
            return result;
        } catch (err){
            return ctx.badRequest(500, [{ messages: [{id: 'Error'}]}]);
        }
    },
    async getMe(ctx){
        try{
            const user = ctx.state.user;
            if(!user){
                return ctx.badRequest(401, [{ messages: "No authorized user found!"}]);
            }
        const    result = await strapi.db.query('api::profile.profile').findOne({
                where:{
                    user:{
                        id: {
                            $eq: user.id
                        }
                    }
                },
                populate: {
                    image: true,
                }
            });
            return result;
        } catch (err){
            return ctx.badRequest(500, [{ messages: [{id: 'Error'}]}]);
        }
    }
}));
