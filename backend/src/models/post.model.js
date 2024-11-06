import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
    {
        post: {
            type: String, 
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
    
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        comments : {
            type : Schema.Types.ObjectId,
            ref : "Tweet"
        },
        likes : {
            type :  Schema.Types.ObjectId,
            ref : "Like"
        }

    }, 
    {
        timestamps: true
    }
)



export const Post = mongoose.model("Post", postSchema)