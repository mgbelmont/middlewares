const express = require('express')

const server = express()

function middleware (request, response, next){
    console.log('middleware externo')
    next()
}

function factoryMiddleware(){
    return function(request, response, next){
        console.log('middleware factory')
        next()
    }
}

server.use(express.json())
server.use(middleware)
server.use(factoryMiddleware())

server.use((request , response, next) => {
    console.log('middleware a nivel de aplicación')
    next()
},(request , response, next)=>{
    console.log('middleware a nivel de aplicación 2')
    next()
})

server.use((request , response, next)=>{
    console.log('middleware a nivel de aplicación 3')
    next()
})

server.get('/', (request, response, next)=>{
    console.log('middleware a nivel de ruta')
    next()
},(request , response)=>{
    response.json({ message: 'API Middleware' })
})

server.get('/a', (request, response)=>{
    response.json({ message: 'ruta a' })
})

server.listen(8080, ()=>{
    console.log('Server listening')
})