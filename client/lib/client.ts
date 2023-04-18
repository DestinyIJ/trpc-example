import { createTRPCProxyClient, httpBatchLink, loggerLink, wsLink, createWSClient,splitLink } from "@trpc/client"
import { AppRouter } from "../../server/api"


const wsClient = createWSClient(({
    url: "ws://localhost:5000/trpc"
}))

const client = createTRPCProxyClient<AppRouter>({
    links: [
        loggerLink(),
        splitLink({
            condition(op) {
                return op.type === "subscription"
            },
            true: wsLink({
                client: wsClient
            }),
            false: httpBatchLink({
                url: "http://localhost:5000/trpc",
                headers: { Authorization: "TOKEN" }
            })
        }),
    ]
})

document.addEventListener('click', () => {
    client.users.update.mutate({ userId: "123", name: "Hello"})
})

export async function mainTRPC() {
    // const queryResult = await client.sayHi.query()
    // const mutateResult = await client.logToServer.mutate("Hi from Client")
    // const users = await client.users.getUser.query()
    // const user = await client.users.get.query({ userId: "123"})
    // const update = await client.users.update.mutate({ userId: "123", name: "Hello"})
    // const isAdmin = await client.secretData.query()

    client.users.onUpdate.subscribe(undefined, {
        onData(id) {
            console.log("Updated", id)
        },
    })

}

