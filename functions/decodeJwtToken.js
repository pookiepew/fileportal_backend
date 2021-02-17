module.exports = decodeJwtToken = async (token, jwt, config, HttpError) => {
  try {
    const decodedToken = await jwt.verify(token, config.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    if (error.message === 'jwt expired') {
      throw new HttpError('Token expired', 401);
    }
    throw error;
  }
};
