import { connectedToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json()
    try {
        await connectedToDB()
        const newPrompt = new Prompt({
            creator: userId, prompt, tag
        })

        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {
            status: 201
        })
    }
    catch (err) {
        console.log(err)
        return new Response("Fail to create new prompt", { status: 500 })
    }
}