const User = require("../models/userModel");

const assignBadges = async (id, karma, badges) => {
  // assign badges
  if (karma >= 100) {
    if (!badges.includes("Pro")) {
      await User.findOneAndUpdate(
        { _id: id },
        {
          $set: { badges: [...badges, "Pro"] },
          // $inc: { karma: 3, posts: 1 },
        }
      );
      console.log("You received a Pro badge");
    }
  } else if (karma >= 50) {
    if (!badges.includes("Adept")) {
      await User.findOneAndUpdate(
        { _id: id },
        {
          $set: { badges: [...badges, "Adept"] },
          // $inc: { karma: 3, posts: 1 },
        }
      );
      console.log("You received a new Adept badge");
    }
  } else if (karma >= 10) {
    if (!badges.includes("Rookie")) {
      await User.findOneAndUpdate(
        { _id: id },
        {
          $set: { badges: [...badges, "Rookie"] },
          // $inc: { karma: 3, posts: 1 },
        }
      );
      console.log("You received a new Rookie badge");
    }
  }
};

module.exports = assignBadges;
