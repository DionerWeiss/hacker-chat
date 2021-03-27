

import Events from 'events'
import CliConfig from './src/cliConfig.js';
import EventManager from './src/eventManager.js';
import SocketClient from './src/socket.js';
import TerminalController from "./src/terminalController.js";

const [nodePath, filePath, ...commands] = process.argv

const config = CliConfig.parseArguments(commands)
console.log(config);

const componentEmitter = new Events()

const socketClient = new SocketClient(config)
await socketClient.initialize()
const eventManager = new EventManager({ componentEmitter, socketClient })
const data = { 
    roomId: config.room,
    username: config.username
}

eventManager.joinRoomAndAwaitForMessages(data)
const controller = new TerminalController()

await controller.initializeTable(componentEmitter)