module.exports = hashPassword = async (password, bcrypt) => {
  if (!password) throw new Error("No password supplied");
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};
