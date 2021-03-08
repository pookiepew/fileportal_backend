const { model, Schema, Types } = require('mongoose');

const requiredString = { type: String, required: true };

const userSchema = new Schema(
  {
    name: requiredString,
    email: requiredString,
    password: requiredString,
    userGroups: [{ type: Types.ObjectId, ref: 'UserGroup' }]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
