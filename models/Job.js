const { model, Schema, Types } = require('mongoose');

const jobSchema = new Schema(
  {
    SRG_number: { type: Number },
    LUB_number: { type: Number },
    trip: { type: Number },
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
