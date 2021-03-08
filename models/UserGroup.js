const { model, Schema, Types } = require('mongoose');

const userGroupSchema = new Schema(
  {
    name: { type: String, required: true },
    users: [{ type: Types.ObjectId, ref: 'User' }],
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('UserGroup', userGroupSchema);
