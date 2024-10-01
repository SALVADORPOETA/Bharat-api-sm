import express from 'express'
import {
  getLanguages,
  createLanguage,
  getLanguage,
  deleteLanguage,
  updateLanguage,
} from '../controllers/languages.js'

const router = express.Router()

router.get('/', getLanguages)

router.get('/:id', getLanguage)

router.post('/', createLanguage)

router.delete('/:id', deleteLanguage)

router.patch('/:id', updateLanguage)

export default router
