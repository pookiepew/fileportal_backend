const { model, Schema, Types } = require('mongoose');

const jobSchema = new Schema(
  {
    number: { type: Number, required: true },
    trip: { type: Types.ObjectId, ref: 'Trip' },
    file: [
      {
        id: { type: Types.ObjectId, ref: 'File' }
      }
    ],
    creator: { type: Types.ObjectId, ref: 'User', required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('Job', jobSchema);
