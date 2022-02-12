const express = require('express');
const router = express.Router();

/* GET quotes listing. */
router.get('/', function(req: any, res: { json: (arg0: { data: { quote: string; author: string; }[]; meta: { page: number; }; }) => void; }, next: any) {
  res.json({
    data: [
      {
        quote: 'First, solve the problem. Then, write the code.',
        author: 'John Johnson'
      }
    ],
    meta: {
      page: 1
    }
  });
});

module.exports = router;