export const loginFb = async () => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    "2349961725231282",
    {
      permissions: ["public_profile"],
    }
  );
  if (type === "success") {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture,first_name,middle_name,last_name`
    );
    const responseJson = await response.json();
    console.log(responseJson)
    return responseJson;
  }
  return null;
};
