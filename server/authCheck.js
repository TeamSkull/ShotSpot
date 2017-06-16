exports.checkSession = (session) => {
  if (session.user) {
    return session.user;
  } else {
    return false;
  }
}