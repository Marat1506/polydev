import express from 'express'
import cors from 'cors'
import http from 'http'
import { validationResult } from 'express-validator'
import { checkData } from './validate.js'
import dotenv from 'dotenv'


dotenv.config()

const app = express()
const port = process.env.SERVER_PORT || 3000 

const server = http.createServer(app)

app.use(express.json())
app.use(cors())

app.post('/contact', checkData, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    return res.status(200).json("Ваша заявка принята")
})

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
})