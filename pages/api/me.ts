import { validateToken } from "../../helpers/auth";

function handler(req, res, user) {
  res.status(200).json(user);
}

export default validateToken(handler);
