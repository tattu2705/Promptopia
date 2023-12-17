import { connectedToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request, { params }) => {
    try {
        await connectedToDB()
        const text = params.text
        if (!text) {
            return new Response("Invalid text", { status: 400 })
        }
        const prompts = await Prompt.find({ $or: [{ prompt: { '$regex': text } }, { tag: { '$regex': text } }] }).populate('creator')
        return new Response(JSON.stringify(prompts), {
            status: 200,
        })
    }
    catch (err) {
        return new Response("Fail to fetch prompts", { status: 500 })
    }
}