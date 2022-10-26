import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../db/prisma";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });

    if (!bcrypt.compareSync(password, user.password))
      throw new Error("Invalid password");

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        timestamp: Date.now(),
      },
      process.env.SECRET,
      { expiresIn: "8h" }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      })
    );

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    // console.error(error);
    res.status(401).json({ error: "Incorrect email address or password" });
  }
}
