export const useGetUserInfo = () => {
  const { name, profilePic, userId, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );

  return { name, profilePic, userId, isAuth };
};
