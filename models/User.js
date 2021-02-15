const { model, Schema } = require("mongoose");

const requiredString = { type: String, required: true };

const userSchema = new Schema(
  {
    name: requiredString,
    email: requiredString,
    password: requiredString,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
