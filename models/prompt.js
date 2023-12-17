import mongoose, {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        require: true,
    },
    tag: {
        type: String,
        require: true,
    }
})

const Prompt = models.Prompt || model("Prompt", PromptSchema)

export default Prompt