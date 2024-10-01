import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const historyFilePath = path.resolve(__dirname, '../data/history.json')

let history = []

const loadHistory = () => {
  try {
    const dataBuffer = fs.readFileSync(historyFilePath)
    const dataJSON = dataBuffer.toString()
    history = JSON.parse(dataJSON)
  } catch (e) {
    history = []
  }
}

const saveHistory = () => {
  const dataJSON = JSON.stringify(history, null, 2)
  fs.writeFileSync(historyFilePath, dataJSON)
}

export const getHistory = (req, res) => {
  loadHistory()
  res.send(history)
}

export const getHistorySection = (req, res) => {
  const id = Number(req.params.id)
  loadHistory()
  const foundHistorySection = history.find(
    (historySection) => historySection.id === id
  )
  res.send(foundHistorySection)
}

export const createHistorySection = (req, res) => {
  const historySection = req.body
  loadHistory()
  history.push(historySection)
  saveHistory()
  res.send(
    `History Section with the name ${historySection.section} has been added to the database!`
  )
}

export const deleteHistorySection = (req, res) => {
  const id = Number(req.params.id)
  loadHistory()
  history = history.filter((historySection) => historySection.id !== id)
  saveHistory()
  res.send(
    `History Section with the id ${id} has been deleted from the database.`
  )
}

export const updateHistorySection = (req, res) => {
  const id = Number(req.params.id)
  const { section, p1, p2, title, image, description } = req.body
  loadHistory()
  const historySection = history.find(
    (historySection) => historySection.id === id
  )
  if (section) historySection.section = section
  if (p1) historySection.p1 = p1
  if (p2) historySection.p2 = p2
  if (title) historySection.title = title
  if (image) historySection.image = image
  if (description) historySection.description = description
  saveHistory()
  res.send(`History Section with the id ${id} has been updated`)
}
