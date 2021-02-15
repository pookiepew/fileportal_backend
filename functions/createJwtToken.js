module.exports = createJwtToken = async (user, jwt, config) => {
  const payload = { user: { id: user._id } };
  try {
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '5 days' });
    return token;
  } catch (error) {
    throw error;
  }
};
