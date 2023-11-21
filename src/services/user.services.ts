import User from "../models/User";

export const findUserByIdOrUsername = async (
  id?: string,
  username?: string
) => {
  if (!id && !username) {
    throw new Error("Either id or username must be provided");
  }

  if (id) {
    const user = await User.findOne({ _id: id });
    return user;
  }

  // Find the user by either id or username
  const user = await User.findOne({ username });

  // Check if the user is null
  if (!user) {
    return null;
  }

  return user;
};
