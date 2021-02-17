module.exports = createJwtToken = async (user, expiresIn, jwt, config) => {
  const payload = { user: { id: user._id } };
  try {
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn });
    return token;
  } catch (error) {
    throw error;
  }
};
