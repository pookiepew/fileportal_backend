const { model, Schema, Types } = require('mongoose');

const laneSchema = new Schema(
  {
    name: { type: String, required: true },
    creator: { type: Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model('Lane', laneSchema);
