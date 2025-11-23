import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  return new Response(JSON.stringify({
    user: {
      name: session.user.name,
      email: session.user.email,
      role: session.user.role, // ✅ must be included when you create session
    }
  }));
}
