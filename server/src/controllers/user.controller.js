import User from "../models/User.js";

export async function getUsers(req, res) {
  const { role } = req.query;

  const query = role ? { role } : {};
  const users = await User.find(query).select("_id name email role");

  res.json(users);
}
