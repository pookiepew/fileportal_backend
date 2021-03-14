const { model, Schema, Types } = require('mongoose');

const jobSchema = new Schema(
  {
    numbers: {
      SRG: { type: Number },
      LUB: { type: Number }
    },
    trip: { type: Types.ObjectId, ref: 'Trip' },
    files: [{ type: Types.ObjectId, ref: 'File' }],
    lane: { type: Types.ObjectId, ref: 'Lane' },
    userGroups: [{ type: Types.ObjectId, ref: 'UserGroup' }],
    info: { type: String },
    creator: { type: Types.ObjectId, ref: 'User', required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('Job', jobSchema);
