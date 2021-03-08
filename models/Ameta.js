const { model, Schema, Types } = require('mongoose');

const ametaSchema = new Schema(
  {
    trip: { type: Types.ObjectId, ref: 'Trip' },
    jobs: [{ type: Types.ObjectId, ref: 'Job' }],
    lane: { type: Types.ObjectId, ref: 'Lane' },
    userGroups: [{ type: Types.ObjectId, ref: 'UserGroup' }],
    creator: { type: Types.ObjectId, ref: 'User' }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('Ameta', ametaSchema);
