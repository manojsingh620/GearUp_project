const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        typeName: joi.string().required(),
        ownName: joi.string().required(),
        price: joi.number().required().min(0),
        state: joi.string().required(),
        location: joi.string().required(),
        pincode: joi.number().required(),
        phoneNumber: joi.number().required(),
        email: joi.string().required(),
        image: joi.string().allow("", null),
        discription: joi.string().required(),
    }).required(),
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required(),
});