import mongoose, { Schema, model, models } from "mongoose";

interface IUser {
  email: string;
  password: string;
  role: "admin" | "partner";
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "partner"], required: true },
});

const User = models.User || model<IUser>("User", userSchema);
export default User;
