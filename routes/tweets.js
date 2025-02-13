var express = require("express");
var router = express.Router();

const User = require("../models/users");
const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");

/* POST for POSTING */

router.post("/posting/:token", (req, res) => {
  // Check if message not empty
  if (!checkBody(req.body, ["message"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // Check if user is well connected
  User.findOne({ token: req.params.token }).then((data) => {
    if (data) {
      const dayDate = new Date();

      const newTweet = new Tweet({
        message: req.body.message,
        postTime: dayDate,
        firstname: data.firstname,
        username: data.username,
      });

      newTweet.save().then((newDoc) => {
        res.json({
          result: true,
        });
      });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});


/* GET all posted tweets */
router.get("/posting/:token", (req, res) => {})



router.get('/', (req, res) => {
    Tweet.find().then(data => {
      if (data) {
        res.json({ result: true, data : data });
      } else {
        res.json({ result: false, error: 'No tweet found' });
      }
    });
  });


module.exports = router;
