export const getCurrentUser = () => {
  console.log(localStorage.getItem('token'));
  return localStorage.getItem('token');
  // storageData &&
  // JSON.parse(storageData) &&
  // JSON.parse(JSON.parse(storageData).user) &&
  // JSON.parse(JSON.parse(storageData).user).currentUser
};

export const setAuthLocalStorage = (data) => {
  localStorage.setItem('token', data.accessToken);
};

export const logout = (history) => {
  localStorage.clear();
  history.push('/login');
};
