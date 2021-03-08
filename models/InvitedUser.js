const { model, Schema, Types } = require('mongoose');

const InvitedUserSchema = new Schema(
  {
    email: { type: String, required: true },
    invitedBy: { type: Types.ObjectId, ref: 'User' },
    userGroups: [{ type: Types.ObjectId, ref: 'UserGroup' }],
    accepted: { type: Boolean, default: false },
    token: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model('InvitedUser', InvitedUserSchema);
