import { createTRPCRouter, privateProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
    getProfile: privateProcedure.query(async ({ctx}) => {
        const {db,user} = ctx;
        console.log(user);
        const profile = await db.user.findUnique({
            where: {
                id:user?.id
            }
        })

        return profile;
    })
})