import { CreateExpressContextOptions } from "@trpc/server/adapters/express"

export function createContext() {
    return {
        isAdmin: true,
    }
}

export function oldCreateContext({ req, res }: CreateExpressContextOptions) {
    return {
        isAdmin: true,
        req,
        res
    }
}