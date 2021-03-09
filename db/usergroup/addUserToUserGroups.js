module.exports = addUserToUserGroups = async (userId, userGroupId, UserGroup ) => {
  try {
    const userGroup = await UserGroup.findById(userGroupId)
    if(!userGroup) {
      throw new Error('Usergroup not found')
    }
    userGroup.users.push(userId)
    await userGroup.save()
  } catch (err) {
    throw err
  }
}