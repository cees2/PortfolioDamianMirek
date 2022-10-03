const DOMAIN = `http://127.0.0.1:3000/`;

const LOGIN_URL = `${DOMAIN}/api/v1/login`;
const CREATE_ACCOUND_URL = `${DOMAIN}/api/v1/signup`;

export const accountAJAXManager = async (inputData, login = true) => {
  try {
    const response = await fetch(login ? LOGIN_URL : CREATE_ACCOUND_URL, {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      const {
        error: { message },
      } = data;
      if (
        message === "EMAIL_NOT_FOUND" ||
        message === "INVALID_EMAIL" ||
        message === "INVALID_PASSWORD"
      ) {
        throw new Error("Invalid email or password.");
      } else if (message.startsWith("TOO_MANY_ATTEMPTS_TRY_LATER"))
        throw new Error("Too many attemps. Try again later.");
      else if (message === "EMAIL_EXISTS")
        throw new Error("Provided email already exists.");
      else throw new Error("Something went wrong");
    }

    return {
      token: data.idToken,
      userId: data.localId,
    };
  } catch (err) {
    throw err;
  }
};
