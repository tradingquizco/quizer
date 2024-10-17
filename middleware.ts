import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  if (nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  const sessionToken = (await cookies()).get("sessionToken")?.value;
  const sessionId = (await cookies()).get("sessionId")?.value
  if (!sessionId || !sessionToken)
    return NextResponse.redirect(
      new URL(process.env.LOGIN_URL!.toString(), req.url)
    );

  try {
    const response = await fetch(
      `${process.env.API}/sessionValidation`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sessionToken,
          sessionId,
          role: "quizer",
        }),
      }
    );
    if (!response.ok) {
      return NextResponse.redirect(
        new URL(process.env.LOGIN_URL!.toString(), req.url)
      );
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
