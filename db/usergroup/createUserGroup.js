module.exports = createUserGroup = async (name, creator, UserGroup) => {
  try {
    const newUserGroup = new UserGroup({
      name,
      users: [],
      creator,
    });
    await newUserGroup.save();
    return newUserGroup;
  } catch (err) {
    throw err;
  }
};
