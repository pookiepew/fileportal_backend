module.exports = saveUser = async (name, email, password, userGroup, User) => {
  if (!name || !email || !password)
    throw new Error("Name, Email or Password missing");
  try {
    const user = new User({
      name,
      email,
      password,
      userGroups: [userGroup]
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
