'use strict'

//Importa o app, o debug e o http que vai processar as requisições http
const app = require('../src/app');
const debug = require('debug')('nodestr:server');
const http = require('http');

//Obtem a porta da config process.env.PORT ou seta a porta 3000 por default
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Instancia o http
const server = http.createServer(app);

//Aponta a porta que o serviço vai escutar
server.listen(port);
server.on('error', onError); //Função a ser chamada em caso de erro
server.on('listening', onListening); //Função a ser chamada no evento listening
console.log("API rodando na porta " + port);

function normalizePort(val){
    const port = parseInt(val, 10);

    if (isNaN(port)){
        return val;
    }

    if (port >= 0){
        return port;
    }
    return false;
}

//Tratamento de erro ao executar a API, ex: privilégios ou portas 
function onError(error){
    if (error.syscall != 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

    switch (error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);

}