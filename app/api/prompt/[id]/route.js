import { connectedToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request, { params }) => {
    try {
        await connectedToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) {
            return new Response("Prompt not found", { status: 404 })
        }

        return new Response(JSON.stringify(prompt), {
            status: 200,
        })
    }
    catch (err) {
        return new Response("Fail to fetch prompts", { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectedToDB()
        const existingPrompt = await Prompt.findById(params.id)

        if (!prompt) {
            return new Response("Prompt not found", { status: 404 })
        }

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    }
    catch (err) {
        return new Response('Fail to update prompt', { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectedToDB()
        await Prompt.findByIdAndDelete(params.id)
        return new Response('Prompt deleted succesfully', { status: 200 })
    }
    catch (err) {
        return new Response('Fail to delete prompt', { status: 500 })
    }
}