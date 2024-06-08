// app/api/auth/success.js

const { db } = require("../../../db");
const { users } = require("../../../db/schema");
const {
  getKindeServerSession,
} = require("@kinde-oss/kinde-auth-nextjs/server");
const { eq } = require("drizzle-orm");

export async function GET(req, res) {
  try {
    const { getUser, getOrganization } = getKindeServerSession();
    const user = await getUser();
    const { orgCode } = await getOrganization();

    if (!user || user == null || !user.id) {
      throw new Error(
        "something went wrong with authentication: " + JSON.stringify(user)
      );
    }

    const dbUser = db.select().from(users).where(eq(users.id, user.id)).get();

    if (!dbUser) {
      db.insert(users)
        .values({
          id: user.id,
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
        })
        .run();
    }

    res.writeHead(302, { Location: "http://localhost:3000/" });
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
