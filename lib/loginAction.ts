"use server";

import { LoginActionResult } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginAction = async (value: {
  email: string;
  password: string;
}): Promise<LoginActionResult> => {
  // const cookie = (await cookies()).get("session")?.value ?? "";
  // const { currentAccountId, email } = await JSON.parse(cookie);

  try {
    const response = await fetch(`${process.env.API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: value.email, password: value.password }),
    });

    if (!response.ok) {
      if (response.status === 404)
        return { isError: true, message: "Fetch Route Not Found" };
      const { message } = await response.json();
      return { isError: true, message };
    }

    const { url, session } = await response.json();

    // const res = await fetch(`${process.env.API}/accounts/validation-account`, {
    //   method: "POST",
    //   cache: "no-cache",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     accountId: session.currentAccountId,
    //     role: "quizer",
    //     email: session.email,
    //   }),
    // });
    // if (!res.ok) {
    //   console.log("account role is not quizer");
    //   return { isError: true, message: "Account Role Not Match!" };
    // }

    (await cookies()).set("session", session);
    return { isError: false, message: "WellCome!" };
  } catch (err) {
    return { isError: true, message: "Faild To Fetch" };
  }
};

export default LoginAction;
