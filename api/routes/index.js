const express = require("express");
const restaurantsController = require("../controllers/restaurantsController");
const menuController = require("../controllers/menuController");
const reviewController = require("../controllers/reviewController")
const usersController = require("../controllers/usersController");

const router = express.Router();

router.route("/restaurants")
    .get(restaurantsController.restaurantGetAll)
    .post(restaurantsController.restaurantAddOne);

router.route("/restaurants/:resId")
    .get(restaurantsController.restaurantGetOne)
    .delete(restaurantsController.restaurantDeleteOne)
    .put(restaurantsController.restaurantFullUpdateOne)
    .patch(restaurantsController.restaurantPartialUpdateOne);

router.route("/restaurants/:resId/menu")
    .get(menuController.menuGetAll)
    .post(menuController.menuAddOne);

router.route("/restaurants/:resId/menu/:foodId")
    .get(menuController.menuGetOne)
    .delete(menuController.menuDeleteOne)
    .put(menuController.menuFullUpdateOne)
    .patch(menuController.menuPartialUpdateOne);


router.route("/restaurants/:resId/reviews")
    .get(reviewController.reviewsGetAll)
    .post(reviewController.reviewAddOne);

router.route("/restaurants/:resId/reviews/:reviewId")
    .get(reviewController.reviewsGetOne)
    .delete(reviewController.reviewDeleteOne)
    .put(reviewController.reviewFullUpdateOne)
    .patch(reviewController.reviewPartialUpdateOne);

router.route("/users")
    .post(usersController.register);

router.route("/users/login")
    .post(usersController.login);


module.exports = router;