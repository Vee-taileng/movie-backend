import express from "express"

const router = express.Router()

router.get('/hello', (rq, res)=>{
  res.json({message: "Hello World!"})
})

export default router