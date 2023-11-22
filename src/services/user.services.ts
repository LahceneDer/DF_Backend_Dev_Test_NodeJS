import { Types } from "mongoose";
import User, { IUser } from "../models/User";

export class UserService {
  private userModel: typeof User

  constructor(userModel: typeof User) {
      this.userModel = userModel
  }

  public async findUserByIdOrUsername(id?: string, username?: string) {
    if (!id && !username) {
      throw new Error("Either id or username must be provided");
    }
  
    if (id) {
      const user = await User.findOne({ _id: id });
      return user;
    }
  
    const user = await User.findOne({ username });
  
    if (!user) {
      return null;
    }
  
    return user;
  }

  public async addFavorite(user: IUser, movieId: Types.ObjectId) {
    const currentUser = new User(user)
    currentUser.favorites.push(movieId)

    const updatedUser = await currentUser.save()

    return updatedUser
  }

  public async deleteFavorite(user: IUser, movieId: Types.ObjectId) {
    const updatedUser = User.updateOne({_id: user._id},
      {$pull: { favorites: movieId }})

    return updatedUser
  }

  public async getFavorite(id: any) {
    const user = this.userModel.findById(id, {_id: 0, favorites: 1}).populate("favorites")
    return user
  }


}


