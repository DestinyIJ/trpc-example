import express from 'express'
import cors from 'cors'
import ws from 'ws'

import { appRouter } from './routers'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { createContext } from './context'


const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use('/trpc', createExpressMiddleware({ 
    router: appRouter,
    createContext
}))

const server = app.listen(5000)

applyWSSHandler({
    wss: new ws.Server({ server }),
    router: appRouter,
    createContext,
})

export type AppRouter = typeof appRouter