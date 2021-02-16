module.exports = decodeJwtToken = async (token, jwt, config) => {
  try {
    const decodedToken = await jwt.verify(token, config.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    throw error;
  }
};
