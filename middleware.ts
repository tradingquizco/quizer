import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  if (nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return NextResponse.redirect(new URL("/login", req.url));

  const { currentAccountId, email } = await JSON.parse(cookie);
  console.log(currentAccountId);
  try {
    const response = await fetch(
      `${process.env.API}/accounts/validation-account`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          accountId: currentAccountId,
          role: "quizer",
          email,
        }),
      }
    );
    if (!response.ok) {
      console.log("account role is not quizer");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (err) {
    console.log(err);
  }
}

export const config = {
  matcher: [
    "/",
    "/create-quiz",
    "/my-quizzes",
    "/login",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
// export default function middleware() {}
