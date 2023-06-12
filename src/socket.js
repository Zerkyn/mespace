import {io} from 'socket.io-client'

const URL = process.env.SERVER_PORT === 'production' ? undefined : `http://localhost:4455`

export const socket = io(URL, {
    autoConnect: false
})