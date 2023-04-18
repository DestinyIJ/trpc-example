import { t } from "../trpc";
import { z } from 'zod'
import { observable } from '@trpc/server/observable'
import { EventEmitter } from 'stream'


// const userProcedure = t.procedure.input(v => {
//     if(typeof v === "string") return v
    
//     throw new Error("Invalid input: Expected string")
// })

const userProcedure = t.procedure.input(z.object({ userId: z.string() }))

// export const userRouter = t.router({
//     getUser: userProcedure.query(() => {
//         return { id: 1, name: "Namor"}
//     })
// })

const eventEmitter = new EventEmitter()

export const userRouter = t.router({
    getUser: t.procedure.query(() => {
        return { id: 1, name: "Namor"}
    }),
    get: userProcedure.query(({ input }) => {
        return { id: input.userId, name: "Hello"}
    }),
    update: userProcedure
        .input(z.object({ name: z.string()}))
        .output(z.object({ id: z.string(), name: z.string()}))
        .mutation(req => {
            eventEmitter.emit("update", req.input.userId)
            return { id: req.input.userId, name: req.input.name }
    }),
    onUpdate: t.procedure.subscription(() => {
        return observable<string>(emit => {
            eventEmitter.on("update", emit.next)

            return () => {
                eventEmitter.off("update", emit.next)
            }
        })
    })
})