export const loginUserAction = (user) => {
  return {
    type: 'LOGIN',
    payload: user,
  };
};

export const setUserAction = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const logoutUserAction = () => ({
  type: 'LOGOUT',
});