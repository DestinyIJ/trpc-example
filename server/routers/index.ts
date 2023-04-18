import { t, isAdminProcedure } from "../trpc";
import { userRouter } from './users'

export const appRouter = t.router({
    sayHi: t.procedure.query(() => {
        return "HI!"
    }),
    logToServer: t.procedure.input(v => {
        if(typeof v === 'string') return v;

        throw new Error("Invalid input: Expected String")
    }).mutation((req) => {
        console.log(`Client Says: ${req.input}`)
        return true
    }),
    users: userRouter,
    secretData: isAdminProcedure.query(({ ctx }) => {
        console.log(ctx.user)

        return "Secret Stuff"
    })
})