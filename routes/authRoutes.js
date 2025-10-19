import express from "express";
import bcrypt from "bcryptjs";
import pool from "../app.js"; //

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup", { error: null });
});

router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.render("signup", { error: "All fields are required" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await pool.query(
      "INSERT INTO users (username,email,password,role) VALUES ($1,$2,$3,$4)",
      [username, email, hashedPassword, role]
    );
    res.redirect("signin");
  } catch (err) {
    console.error(err);
    res.render("signup", { error: "User registration failed" });
  }
});

router.get("/signin", (req, res) => {
  res.render("signin", { error: null });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render("signin", { error: "Email and password are required" });
  }
  try {
    const result = await pool.query("SELECT * FROM users where email=$1", [
      email,
    ]);
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("signin", { error: "Invalid email or password" });
    }
    //session
    req.session.userId = user.id;
    req.session.username = user.username;

    // Redirect to appropriate dashboard
    if (user.role === "admin") {
      return res.render("admin/adminDashboard", { username: user.username });
    } else if (user.role === "officer") {
      return res.render("officer/officerDashboard", {
        username: user.username,
        id: req.session.userId,
      });
    } else {
      return res.render("user/userDashboard", {
        username: user.username,
        id: req.session.userId,
      });
    }
  } catch (err) {
    console.error(err);
    res.render("signin", { error: "User registration failed" });
  }
});

export default router;
