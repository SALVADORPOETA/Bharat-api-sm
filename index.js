import express from 'express'
import bodyParser from 'body-parser'
import homeRoutes from './routes/home.js'
import historyRoutes from './routes/history.js'
import languagesRoutes from './routes/languages.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/home', homeRoutes)
app.use('/history', historyRoutes)
app.use('/languages', languagesRoutes)
app.use('/assets', express.static(path.join(__dirname, '/assets')))

app.get('/', (req, res) => {
  const homePageContent = `
  <html>
    <head>
      <title>Homepage</title>
    </head>
    <body>
      <p>
        This is the homepage. Start to use this API here:   
      </p>
      <ul>
        <li>
          <a href='https://bharat-api-sm.vercel.app/home'>Home Data</a>
        </li>
        <li>
          <a href='https://bharat-api-sm.vercel.app/history'>History Data</a>
        </li>
        <li>
          <a href='https://bharat-api-sm.vercel.app/languages'>Languages Data</a>
        </li>
      </ul>
    </body>
  </html>
  `
  res.send(homePageContent)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
)
