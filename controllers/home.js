import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const homeFilePath = path.resolve(__dirname, '../data/home.json')

let home = []

const loadHome = () => {
  try {
    const dataBuffer = fs.readFileSync(homeFilePath)
    const dataJSON = dataBuffer.toString()
    home = JSON.parse(dataJSON)
  } catch (e) {
    home = []
  }
}

const saveHome = () => {
  const dataJSON = JSON.stringify(home, null, 2)
  fs.writeFileSync(homeFilePath, dataJSON)
}

export const getHome = (req, res) => {
  loadHome()
  res.send(home)
}

export const getHomeSection = (req, res) => {
  const id = Number(req.params.id)
  loadHome()
  const foundHomeSection = home.find((homeSection) => homeSection.id === id)
  res.send(foundHomeSection)
}

export const createHomeSection = (req, res) => {
  const homeSection = req.body
  loadHome()
  home.push(homeSection)
  saveHome()
  res.send(
    `Home Section with the name ${homeSection.section} has been added to the database!`
  )
}

export const deleteHomeSection = (req, res) => {
  const id = Number(req.params.id)
  loadHome()
  home = home.filter((homeSection) => homeSection.id !== id)
  saveHome()
  res.send(`Home Section with the id ${id} has been deleted from the database.`)
}

export const updateHomeSection = (req, res) => {
  const id = Number(req.params.id)
  const { section, p1, p2, title, image, description } = req.body
  loadHome()
  const homeSection = home.find((homeSection) => homeSection.id === id)
  if (section) homeSection.section = section
  if (p1) homeSection.p1 = p1
  if (p2) homeSection.p2 = p2
  if (title) homeSection.title = title
  if (image) homeSection.image = image
  if (description) homeSection.description = description
  saveHome()
  res.send(`Home Section with the id ${id} has been updated`)
}
