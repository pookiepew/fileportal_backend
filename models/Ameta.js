const { model, Schema, Types } = require('mongoose');

const ametaSchema = new Schema(
  {
    trip: { type: Types.ObjectId, ref: 'Trip', required: true },
    jobs: [{ type: Types.ObjectId, ref: 'Job' }],
    lane: { type: String, required: true },
    creator: { type: Types.ObjectId, ref: 'User', required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('Ameta', ametaSchema);
