import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const languagesFilePath = path.resolve(__dirname, '../data/languages.json')

let languages = []

const loadLanguages = () => {
  try {
    const dataBuffer = fs.readFileSync(languagesFilePath)
    const dataJSON = dataBuffer.toString()
    languages = JSON.parse(dataJSON)
  } catch (e) {
    languages = []
  }
}

const saveLanguages = () => {
  const dataJSON = JSON.stringify(languages, null, 2)
  fs.writeFileSync(languagesFilePath, dataJSON)
}

export const getLanguages = (req, res) => {
  loadLanguages()
  res.send(languages)
}

export const getLanguage = (req, res) => {
  const id = Number(req.params.id)
  loadLanguages()
  const foundLanguage = languages.find((language) => language.id === id)
  res.send(foundLanguage)
}

export const createLanguage = (req, res) => {
  const language = req.body
  loadLanguages()
  languages.push(language)
  saveLanguages()
  res.send(`Language with the name ${language.name} added to the database!`)
}

export const deleteLanguage = (req, res) => {
  const id = Number(req.params.id)
  loadLanguages()
  languages = languages.filter((language) => language.id !== id)
  saveLanguages()
  res.send(`Language with the id ${id} deleted from the database.`)
}

export const updateLanguage = (req, res) => {
  const id = Number(req.params.id)
  const { name, image, description, family } = req.body
  loadLanguages()
  const language = languages.find((language) => language.id === id)
  if (name) language.name = name
  if (image) language.image = image
  if (description) language.description = description
  if (family) language.family = family
  saveLanguages()
  res.send(`Language with the id ${id} has been updated`)
}
