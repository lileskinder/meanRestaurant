const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    food: {
        type: String,
        require: true
    },

    price: {
        type: String,
        require: true
    }
});

const reviewSchema = mongoose.Schema({
    rate: {
        type: Number,
        min: 1,
        max: 5,
        require: true
    },

    reviewer: {
        type: String,
        require: true
    },

    review: String
})

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    address: {
        type: String,
        require: true
    },

    menu: [menuSchema],
    reviews: [reviewSchema]
});

mongoose.model("Restaurant", restaurantSchema, "restaurants");