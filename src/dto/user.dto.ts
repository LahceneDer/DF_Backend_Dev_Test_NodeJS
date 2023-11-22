import { IsNotEmpty } from 'class-validator'
import { Types } from 'mongoose';


export class addFavoritesInputs {
    constructor(userId: string, movieId: Types.ObjectId) {
        this.userId = userId;
        this.movieId = movieId
    }

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    movieId: Types.ObjectId;
}

export class deleteFavoritesInputs {
    constructor(userId: string, movieId: Types.ObjectId) {
        this.userId = userId;
        this.movieId = movieId
    }

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    movieId: Types.ObjectId;
}