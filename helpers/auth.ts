import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../db/prisma";

export function validateToken(handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { ACCESS_TOKEN: token } = req.cookies;
    let user;
    if (token) {
      try {
        const { id } = jwt.verify(token, process.env.SECRET);
        user = await prisma.user.findUniqueOrThrow({
          where: { id },
          //   select: { id: true, name: true, email: true },
        });
      } catch (error) {
        res.status(401).json({ error: "Not Authorized" });
        return;
      }
      handler(req, res, user);
    }
    res.status(401).json({ error: "Not Authorized" });
  };
}
