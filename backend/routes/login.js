const express = require('express');
const router = express.Router();

router.post('/', (req, res)=>{
    console.log(req.headers)
    res.send(req.body);
})

module.exports = router;