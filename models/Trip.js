const { model, Schema, Types } = require('mongoose');

const tripSchema = new Schema(
  {
    number: { type: Number, required: true },
    jobs: [{ type: Types.ObjectId, ref: 'Job' }],
    creator: { type: Types.ObjectId, ref: 'User', required: true },
    lane: { type: Types.ObjectId, ref: 'Lane' },
    userGroups: [{ type: Types.ObjectId, ref: 'UserGroup' }],
    done: { type: Boolean, default: false }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('Trip', tripSchema);
