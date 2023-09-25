const express = require("express");
const router = express.Router();

const serveTemplate = (req, res) => {
  const templateName = req.url.slice(1);
  res.render(templateName || "login");
};

router.use(serveTemplate);

module.exports = router;
