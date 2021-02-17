module.exports = createJwtToken = async (payload, expiresIn, jwt, config) => {
  try {
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn });
    return token;
  } catch (error) {
    throw error;
  }
};
