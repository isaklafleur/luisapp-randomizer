"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const teamSchema = new Schema({
  name: String,
  owner: {
    type: ObjectId,
    ref: "User"
  }
  // members: [{ type: ObjectId, ref: 'User' }]
});

const Team = mongoose.model("Team", teamSchema);

module.exports = {
  Team
};
