"use server";

import { LoginActionResult } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginAction = async (value: { email: string; password: string }): Promise<LoginActionResult> => {
  console.log(value);
  try {
    const response = await fetch(`${process.env.API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: value.email, password: value.password }),
    });

    if (!response.ok) {
      if(response.status === 404) return {isError: true, message: "Fetch Route Not Found"}
      const {message} = await response.json();
      return {isError: true, message}
    }

    const { url, session } = await response.json();

    (await cookies()).set("session", session);
    return {isError: false, message: "WellCome!"}
  } catch (err) {
    return {isError: true, message: "Faild To Fetch"}
  }
};

export default LoginAction;
