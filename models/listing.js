const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../models/review.js");


const listingSchema = new Schema({
    typeName: {
        type: String,
        require: true,
    },
    ownName: {
        type: String,
        require: true,
    },

    price: {
        type: Number,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    pincode: {
        type: Number,
        require: true,
    },
    phoneNumber: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    image: {
       url:String,
       filename: String,
    },
    discription: {
        type: String,
        require: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }

});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
         await Review.deleteMany({_id:{$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;