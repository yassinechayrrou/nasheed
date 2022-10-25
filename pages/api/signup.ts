import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../db/prisma";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const salt = bcrypt.genSaltSync();
  const { name, email, password } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (error) {
    // console.error(error);
    res.status(401).json({ error: "User already exists" });
    return;
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
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
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res.status(200).json({ id: user.id, name: user.name, email: user.email });
}
