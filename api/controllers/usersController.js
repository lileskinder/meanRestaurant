const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");


module.exports.register = function (req, res) {
    console.log("controller register:");
    bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
        if (!err) {
            const newUser = {
                username: req.body.username,
                password: hashedPassword,
                name: req.body.name,
            };

            User.create(newUser, function (err, user) {
                if (err) {
                    console.log(err)
                    res.status(500).json(err);
                } else {
                    res.status(201).json(user);
                }
            })
        }

    })

}

module.exports.login = function (req, res) {

    console.log("controller Login");
    const username = req.body.username;
    const password = req.body.password;
  

    User.findOne({ username: username }).exec(function (err, user) {
        if (err) {
            res.status(500).json(err);
        }
        console.log("er", err)
        console.log("user", user)
        if (user) {
           
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    console.log("Err", err)
                    res.status(400).json({ "message": "unauthorized" });
                } else {
                    if (result) {
                        console.log("User found", user);
                        const token = jwt.sign({ name: user.name }, "cs572", { expiresIn: 3600 })
                        res.status(200).json({ success: "true", token: token });
                    }
                }
            })
        } else {
            res.status(400).json({ "message": "unauthorized 2" });
        }
    })
}

module.exports.authenticate = function (req, res, next) {
    const headerExists = req.headers.authorization;

    if (headerExists) {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        jwt.verify(token, "cs572", function(err, decodedToken) {
            if(err) {
                console.log("JWT verify error ", err);
                res.status(401).json({message: "Unauthorized"})
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({message: "Token Missing"})
    }
}