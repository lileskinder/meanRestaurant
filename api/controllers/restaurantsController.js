const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");

module.exports.restaurantGetAll = function (req, res) {
    let offset = 0;
    let count = 10;
    const maxCount = 15;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ "message": "Offset or count is not a number" });
    }

    maxCount < count ?
        res.status(400).json({ "message": "Count exceeded the max count" }) :

        Restaurant.find().skip(offset).limit(count).exec(function (err, restaurants) {
            const response = {
                status: 200,
                message: restaurants
            }

            if (err) {
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(response.message);
        });
}

module.exports.restaurantGetOne = function (req, res) {
    const resId = req.params.resId;
    console.log("Res Id ", resId);
    (resId.length !== 24) ?
        res.status(400).json({ "message": "Restaurant ID not proper format" }) :
        Restaurant.findById(resId).exec(function (err, restaurant) {
            const response = {
                status: 200,
                message: restaurant
            }
            if (err) {

                response.status = 500;
                response.message = error;
            } else if (!restaurant) {
                response.status = 400;
                response.message = { "message": "Can not find the restaurant" };
            }
            res.status(response.status).json(response.message);
        })
}

module.exports.restaurantDeleteOne = function (req, res) {
    const resId = req.params.resId;
    console.log("Res Id ", resId);
    (resId.length !== 24) ?
        res.status(400).json({ "message": "Restaurant ID not proper format" }) :
        Restaurant.findByIdAndDelete(resId).exec(function (err, restaurant) {
            const response = {
                status: 200,
                message: restaurant
            }
            if (err) {

                response.status = 500;
                response.message = error;
            } else if (!restaurant) {
                response.status = 400;
                response.message = { "message": "Can not find the restaurant" };
            }
            res.status(response.status).json(response.message);
        })
}

module.exports.restaurantAddOne = function (req, res) {
    console.log("posting new restaurant");

    const newRestaurant = {
        name: req.body.name,
        address: req.body.address,
        menu: [],
        reviews: []
    }

    req.body.name && req.body.address ?
        Restaurant.create(newRestaurant, function (err, restaurant) {
            const response = {
                status: 201,
                message: restaurant
            }
            if (err) {
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(response.message);

        }) : res.status(200).json({ "message": "Name or Address is not found" });
}


module.exports.restaurantFullUpdateOne = function (req, res) {
    const resId = req.params.resId;
    (resId.length != 24) ?
        res.status(404).json({ "message": "RequiestParam Restaurant ID is not propper format" }) :
        Restaurant.findById(resId).exec(function (err, restaurant) {
            const response = {
                status: 204,
                message: restaurant
            };

            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!restaurant) {
                response.status = 404;
                response.message = { "message": "restaurant ID not found" };
            }

            if (response.status !== 204) {
                res.status(response.status).json(response.message);
            } else {
                if (!req.body.name && !req.body.address) {
                    res.status(400).json({"message" : "name or address is required"})
                } else {
                    restaurant.name = req.body.name;
                    restaurant.address = req.body.address;
                    restaurant.save(function (err, updatedRestaurant) {
                        (err) ?
                            res.status(500).json(err) :
                            res.status(201).json(updatedRestaurant);
                    });
                }

            }
        });
};

module.exports.restaurantPartialUpdateOne = function (req, res) {
    console.log("restaurantsFullUpdateOne requiest recieved")
    const resId = req.params.resId;
    resId.length != 24 ?
        res.status(404).json({ "message": "RequiestParam Restaurant ID is not propper format" }) :
        Restaurant.findById(resId).exec(function (err, restaurant) {
            const response = {
                status: 204,
                message: restaurant
            };

            if (err) {
                console.log("Error finding restaurant");
                response.status = 500;
                response.message = err;
            } else if (!restaurant) {
                response.status = 404;
                response.message = { "message": "restaurant ID not found" };
            }

            if (response.status !== 204) {
                res.status(response.status).json(response.message);
            } else {

                if (req.body.name) {
                    restaurant.name = req.body.name;
                }

                if (req.body.address) {
                    restaurant.address = req.body.address;
                }
                restaurant.save(function (err, updatedRestaurant) {
                    console.log("this is here ");
                    (err) ?
                        res.status(500).json(err) :
                        res.status(201).json(updatedRestaurant);
                })
            }
        });
}