import { connectedToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request) => {
    try {
        await connectedToDB()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), {
            status: 200,
        })
    }
    catch (err) {
        return new Response("Fail to fetch prompts", { status: 500 })
    }
}