const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");

module.exports.menuGetAll = function (req, res) {
    const resId = req.params.resId;
    (resId.length !== 24) ?
        res.status(400).json({ "message": "Restaurant id is not the propper format" }) :
        Restaurant.findById(resId).select("menu").exec(function (err, restaurantMenu) {
            const response = {
                status: 200,
                message: restaurantMenu
            }

            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!restaurantMenu) {
                response.status = 404;
                response.message = C
            }
            res.status(response.status).json(response.message);
        });
}

module.exports.menuGetOne = function (req, res) {
    const resId = req.params.resId;
    const foodId = req.params.foodId;

    (resId.length !== 24 || foodId.length !== 24) ?
        res.status(400).json({ "message": "Restaurant id or menuId not propper format" }) :
        Restaurant.findById(resId).exec(function (err, restaurant) {
            if (!restaurant) {
                res.status(400).json({ "message": "Restaurant id not found" });
            } else {
                const doc = restaurant.menu.id(foodId);
                const response = {
                    status: 200,
                    message: doc
                }
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else if (!doc) {
                    response.status = 404;
                    response.message = { "message": "Review id not found" };
                }
                res.status(response.status).json(response.message);

            }
        });
}


module.exports.menuDeleteOne = function (req, res) {
    const resId = req.params.resId;
    const foodId = req.params.foodId;

    (resId.length != 24 || foodId.length != 24) ?
        res.status(400).json({ "message": "RequiestParam Restaurant ID or food IDis not propper format" }) :
        Restaurant.findById(resId).exec(function (err, restaurant) {
            if (!restaurant) {
                res.status(400).json({ "message": "Restaurant id not found" });
            } else {
                const food = restaurant.menu.id(foodId);
                const response = {
                    status: 204,
                    message: food
                }

                if (err) {
                    response.status = 500;
                    response.message = err;
                } else if (!food) {
                    response.status = 404;
                    response.message = { "message": "Food id is not found" };
                }


                if (response.status !== 204) {
                    res.status(response.status).json(response.message)
                }
                else {
                    food.remove();
                    restaurant.save(function (err, updatedRestaurant) {
                        (err) ?
                            res.status(500).json(err) :
                            res.status(200).json(updatedRestaurant.menu);
                    });
                }
            }
        })

}
module.exports.menuAddOne = function (req, res) {
    const resId = req.params.resId;
    (resId.length !== 24) ?
        res.status(400).json({ "message": "RequiestParam Restaurant ID is not propper format" }) :
        Restaurant.findById(resId).exec(function (err, restaurant) {

            const response = {
                status: 201,
                message: restaurant
            }

            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!restaurant) {
                response.status = 404;
                response.message = { "message": "Restaurant id is not found" };
            }
            if (response.status !== 201) {
                res.status(response.status).json(response.message);
            }
            else {
                if (!req.body.food || !req.body.price) {
                    res.status(400).json({ "message": "Food or Price name are required" })
                } else {
                    restaurant.menu.food = req.body.food;
                    restaurant.menu.price = parseFloat(req.body.price);

                    restaurant.menu.push(req.body);
                    restaurant.save(function (err, updatedRestaurant) {
                        (err) ?
                            res.status(500).json(err) :
                            res.status(201).json(updatedRestaurant.menu);
                    });
                }
            }
        });

}

module.exports.menuFullUpdateOne = function (req, res) {
    const resId = req.params.resId;
    const foodId = req.params.foodId;

    (resId.length != 24 || foodId.length != 24) ?
        res.status(400).json({ "message": "RequiestParam Restaurant ID is not propper format" }) :
        Restaurant.findById(resId).exec(function (err, restaurant) {
            const response = {
                status: 204,
                message: restaurant
            }

            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!restaurant) {
                response.status = 404;
                response.message = response.message = { "message": "Restaurant id is not found" };
            }

            if (response.status !== 204) {
                res.status(response.status).json(response.message);
            } else {
                const doc = restaurant.menu.id(foodId);
                if (!doc) {
                    res.status(404).json({ "message": "Food not found" });
                } else {
                    if (!req.body.food || !req.body.price) {
                        res.status(400).json({ "message": "Food or Price name are required" })
                    } else {
                        doc.food = req.body.food;
                        doc.price = req.body.price;
                        restaurant.save(function (err, updatedRestaurant) {
                            (err) ?
                                res.status(500).json(err) :
                                res.status(201).json(updatedRestaurant.menu.id(foodId));
                        });
                    }

                }
            }
        });
}

module.exports.menuPartialUpdateOne = function (req, res) {
    const resId = req.params.resId;
    const foodId = req.params.foodId;

    (resId.length !== 24 || foodId.length !== 24) ?
        res.status(400).json({ "message": "RequiestParam Restaurant ID is not propper format" }) :
        Restaurant.findById(resId).exec(function (err, restaurant) {
            const response = {
                status: 204,
                message: restaurant.menu
            }

            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!restaurant) {
                response.status = 404;
                response.message = response.message = { "message": "Restaurant id is not found" };
            }

            if (response.status !== 204) {
                res.status(response.status).json(response.message);
            } else {
                const doc = restaurant.menu.id(foodId);
                if (!doc) {
                    res.status(404).json({ "message": "review not found" });
                } else {
                    if (req.body.food) {
                        doc.food = req.body.food;
                    }
    
                    if (req.body.price) {
                        doc.price = req.body.price;
                    }
    
                    restaurant.save(function (err, updatedRestaurant) {
                        (err) ?
                            res.status(500).json(err) :
                            res.status(201).json(updatedRestaurant.menu.id(foodId))
                    })
                }
            }
        });
}