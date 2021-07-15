const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");

module.exports.reviewsGetAll = function (req, res) {
    const resId = req.params.resId;
    (resId.length !== 24) ?
        res.status(400).json({ "message": "Restaurant id is not the propper format" }) :
        Restaurant.findById(resId).select("reviews").exec(function (err, restaurant) {
            const response = {
                status: 200,
                message: restaurant
            }
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!restaurant) {
                response.status = 404;
                response.message = { "message": "Restaurant id is not found" };
            }

            res.status(response.status).json(response.message);
        })
}

module.exports.reviewsGetOne = function (req, res) {
    const resId = req.params.resId;
    const reviewId = req.params.reviewId;

    (resId.length !== 24 || reviewId.length !== 24) ?
        res.status(400).json({ "message": "Restaurant id or menuId not propper format" }) :
        Restaurant.findById(resId).exec(function (err, restaurant) {

            if (!restaurant) {
                res.status(400).json({ "message": "Restaurant id not found" });
            } else {
                const review = restaurant.reviews.id(reviewId);
                const response = {
                    status: 200,
                    message: review
                }

                if (err) {
                    response.status = 500;
                    response.message = err;
                } else if (!review) {
                    response.status = 404;
                    response.message = { "message": "Review id not found" };
                }

                res.status(response.status).json(response.message);
            }
        });
}

module.exports.reviewDeleteOne = function (req, res) {
    const resId = req.params.resId;
    const reviewId = req.params.reviewId;
    (resId.length !== 24 || reviewId.length !== 24) ?
        res.status(400).json({ "message": "RequiestParam Restaurant ID or review ID is not propper format" }) :
        Restaurant.findById(resId).exec(function (err, restaurant) {
            if (!restaurant) {
                res.status(400).json({ "message": "Restaurant id not found" });
            } else {
                const review = restaurant.reviews.id(reviewId);
                const response = {
                    status: 204,
                    message: restaurant.reviews
                }
                if (err) {
                    response.status = 500;
                    response.message = err
                } else if (!review) {
                    response.status = 404;
                    response.message = { "message": "review id is not found" };
                }

                if (response.status !== 204) {
                    res.status(response.status).json(response.message);
                } else {
                    review.remove();
                    restaurant.save(function (err, updatedRestaurant) {
                        (err) ?
                            res.status(500).json(err) :
                            res.status(200).json(updatedRestaurant.reviews);
                    });
                }
            }
        });
}

module.exports.reviewAddOne = function (req, res) {
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
                if (!req.body.rate || !req.body.reviewer) {
                    res.status(400).json({ "message": "Rate or Reviewer name are required" })
                } else {
                    restaurant.reviews.rate = parseInt(req.body.rate);
                    restaurant.reviews.reviewer = req.body.reviewer;
                    restaurant.reviews.review = req.body.review;

                    restaurant.reviews.push(req.body);
                    restaurant.save(function (err, updatedRestaurant) {
                        (err) ?
                            res.status(500).json(err) :
                            res.status(201).json(updatedRestaurant.reviews);
                    });
                }
            }
        });
}



module.exports.reviewFullUpdateOne = function (req, res) {
    const resId = req.params.resId;
    const reviewId = req.params.reviewId;

    (resId.length != 24 || reviewId.length != 24) ?
        res.status(400).json({ "message": "RequiestParam Restaurant ID or review Id is not propper format" }) :
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
                const doc = restaurant.reviews.id(reviewId);
                if (!doc) {
                    res.status(404).json({ "message": "review not found" });
                } else {

                    if (!req.body.rate || !req.body.reviewer || !req.body.review) {
                        res.status(404).json({ "message": "review, reviewer or rate are required" });
                    } else {
                        doc.rate = parseInt(req.body.rate);
                        doc.reviewer = req.body.reviewer;
                        doc.review = req.body.review;

                        restaurant.save(function (err, updatedRestaurant) {
                            (err) ?
                                res.status(500).json(err) :
                                res.status(201).json(updatedRestaurant.reviews.id(reviewId));
                        });
                    }
                }
            }
        });
}

module.exports.reviewPartialUpdateOne = function (req, res) {
    const resId = req.params.resId;
    const reviewId = req.params.reviewId;

    (resId.length != 24 || reviewId.length != 24) ?
        res.status(400).json({ "message": "RequiestParam Restaurant ID or review Id is not propper format" }) :
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
                const doc = restaurant.reviews.id(reviewId);
                if (!doc) {
                    res.status(404).json({ "message": "review not found" });
                } else {
                    
                    if (req.body.rate) {
                        doc.rate = parseInt(req.body.rate);
                    }

                    if (req.body.reviewer) {
                        doc.reviewer = req.body.reviewer;
                    }

                    if (req.body.review) {
                        doc.review = req.body.review;
                    }

                    restaurant.save(function (err, updatedRestaurant) {
                        (err) ?
                            res.status(500).json(err) :
                            res.status(201).json(updatedRestaurant.reviews.id(reviewId));
                    });

                }
            }
        });
}