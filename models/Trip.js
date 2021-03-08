const { model, Schema, Types } = require('mongoose');

const tripSchema = new Schema(
  {
    SRG_number: { type: Number },
    LUB_number: { type: Number },
    jobs: [{ type: Types.ObjectId, ref: 'Job' }],
    lane: { type: Types.ObjectId, ref: 'Lane' },
    userGroups: [{ type: Types.ObjectId, ref: 'UserGroup' }],
    done: { type: Boolean, default: false },
    creator: { type: Types.ObjectId, ref: 'User', required: true },
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('Trip', tripSchema);
