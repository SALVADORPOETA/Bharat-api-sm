import express from 'express'
import bodyParser from 'body-parser'
import homeRoutes from './routes/home.js'
import historyRoutes from './routes/history.js'
import languagesRoutes from './routes/languages.js'

const app = express()
const PORT = 5000

app.use(bodyParser.json())

app.use('/home', homeRoutes)
app.use('/history', historyRoutes)
app.use('/languages', languagesRoutes)

app.get('/', (req, res) => {
  res.send('Hello from Homepage.')
})

app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
)
