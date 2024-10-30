const getUserIdFromToken = (savedToken) => {
  if (savedToken) {
    try {
      const payload = JSON.parse(atob(savedToken.split(".")[1]));
      return payload.sub;
    } catch (error) {
      console.error("Token çözülürken hata oluştu:", error);
    }
  }
  return null;
};

export default getUserIdFromToken;
