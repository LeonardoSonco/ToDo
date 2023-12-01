import axios from "axios";

export { login };

async function login(username: string, password: string) {
  const endpoint = "https://parseapi.back4app.com/login";

  const params = {
    username: username,
    password: password,
  };

  const headers = {
    "X-Parse-Application-Id": "pJoTe98MO9Nsgr84JTf2o7uZzWDDmpLogBUQNtYp",
    "X-Parse-REST-API-Key": "iCmrkT5LChgoHLKTWzOYRwGRNXK997bj1hsRnjUS",
    "X-Parse-Revocable-Session": "1",
  };

  try {
    const response = await axios.get(endpoint, {
      params,
      headers,
    });
    // Do stuff after successful login

   

    return response.data;
  } catch (error: any) {
    console.error("Error while logging in user", error);
    return false;
  }
}
