export async function requestOTP(username: string) {
  const response = await fetch(
    "https://sau.eaglelionsystems.com/v1.0/chatbirrapi/ldapotp/dash/request/dashops",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sourceapp: "ldapportal",
        otpfor: "login",
      },
      body: JSON.stringify({ username }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to request OTP");
  }

  const data = await response.json();
  if (data.status) {
    return data;
  } else {
    throw new Error("OTP request failed");
  }
}

export async function verifyOTP(otpcode: string, accessToken: string) {
  const response = await fetch(
    "https://sau.eaglelionsystems.com/v1.0/chatbirrapi/ldapotp/dash/confirm/dashops",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sourceapp: "ldapportal",
        otpfor: "login",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ otpcode }),
    }
  );

  if (!response.ok) {
    throw new Error("Invalid OTP");
  }

  const data = await response.json();
  if (data.status) {
    return data;
  } else {
    throw new Error("OTP verification failed");
  }
}

export async function verifyPIN(pin: string, accessToken: string) {
  const response = await fetch(
    "https://sau.eaglelionsystems.com/v1.0/chatbirrapi/ldapauth/dash/pinops/passwordLogin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        sourceapp: "ldapportal",
        otpfor: "login",
      },
      body: JSON.stringify({ password: pin }),
    }
  );

  if (!response.ok) {
    throw new Error("Invalid PIN");
  }

  return response.json();
}

// export async function checkAuthStatus(accessToken: string | null) {
//   if (!accessToken) return null;

//   const response = await fetch(
//     "https://sau.eaglelionsystems.com/v1.0/chatbirrapi/ldapauth/dash/auth-status",
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     }
//   );

//   if (!response.ok) return null;
//   return response.json();
// }

// export async function logout() {
//   await fetch(
//     "https://sau.eaglelionsystems.com/v1.0/chatbirrapi/ldapauth/dash/logout",
//     {
//       method: "POST",
//       credentials: "include",
//     }
//   );

//   localStorage.removeItem("accesstoken");
// }
