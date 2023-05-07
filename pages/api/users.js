import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    if (!req.body) return res.status(400).json({ error: "Data is missing" });
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: "User email already exists" });
    } else {
      if (password.length < 6) {
        return res
          .status(409)
          .json({ error: "Password should be at least 6 characters long" });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);

      const userDoc = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.json(userDoc);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
