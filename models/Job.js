const { model, Schema, Types } = require('mongoose');

const jobSchema = new Schema(
  {
    number: { type: Number, required: true },
    trip: { type: Number, required: true },
    files: [{ type: Types.ObjectId, ref: 'File' }],
    info: { type: String },
    creator: { type: Types.ObjectId, ref: 'User', required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('Job', jobSchema);
