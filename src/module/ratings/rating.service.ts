import { TRating } from "./rating.interface";
import { Rating } from "./rating.model";


const addRatingIntoDB = async (payload: TRating,userId: string, recipeId: string) => {
    const ratingData = {
        ...payload,
        user: userId,
        recipeId:recipeId
    }
    console.log('Rating-Data', ratingData);
    const result = await Rating.create(ratingData)
    return result
}

const getAllRatingByIdFromDB = async (id: string) => {
    try {
        const result = await Rating.find({recipeId: id}).populate({
            path: 'rating'
        })
        .populate({
           path: 'user',
            select: 'userName email followers following'
        })
        return result
    } catch (error) {
        console.log(error);
    }
}
// const CommentDeletedFromDB = async (id: string) => {
//     try {
//         console.log('from service id',id);
        
//         const result = await Comment.deleteOne({_id: id})
//         console.log('result from service', result);
        
//         return result
//     } catch (error) {
//         console.log(error);
//     }
// }
// const updateCommentFromDB = async (id: string,payload:TComment) => {
//     try {
//         console.log('from service id',id);
//         const updateComment = await Comment.findByIdAndUpdate(id, payload, {
//             new: true,
//             runValidators: true
//         })
//         return updateComment
//     } catch (error) {
//         console.log(error);
//     }
// }


export const ratingServices = {
addRatingIntoDB,
getAllRatingByIdFromDB
    // CommentDeletedFromDB,
    // updateCommentFromDB
}