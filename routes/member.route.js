const express = require("express");
const { getMember, createMember } = require("../controllers/member.controller");

const router = express.Router();

router.get("/", getMember);
router.post("/", createMember);

module.exports = router;
