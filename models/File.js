const { model, Schema, Types } = require('mongoose');

const fileSchema = new Schema(
  {
    name: { type: String, required: true },
    path: { type: String, required: true },
    userGroups: [{ type: Types.ObjectId, ref: 'UserGroup' }],
    creator: { type: Types.ObjectId, ref: 'User', required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('File', fileSchema);
