import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import User from '@models/user'
import { connectedToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({ profile }) {
            console.log(profile)
            try {
                await connectedToDB();
                const userExist = await User.findOne({ email: profile.email })

                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.email,
                        image: profile.picture
                    })
                }
                return true
            } catch (err) {
                console.log(err)
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST }