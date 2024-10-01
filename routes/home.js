import express from 'express'
import {
  getHome,
  createHomeSection,
  getHomeSection,
  deleteHomeSection,
  updateHomeSection,
} from '../controllers/home.js'

const router = express.Router()

router.get('/', getHome)

router.get('/:id', getHomeSection)

router.post('/', createHomeSection)

router.delete('/:id', deleteHomeSection)

router.patch('/:id', updateHomeSection)

export default router
