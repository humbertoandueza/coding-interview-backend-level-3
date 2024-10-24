import Hapi from '@hapi/hapi'
import 'dotenv/config'
import { connectDB } from './db'
import { MODE } from './enviroments'
import { defineRoutes } from './routes'

const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
    })

    defineRoutes(server)
    if(MODE !== 'test') {
        connectDB()
    }
    return server
}

export const initializeServer = async () => {
    const server = getServer()
    await server.initialize()
    return server
}

export const startServer = async () => {
    const server = getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
};