import express from "express";
import dotenv from "dotenv";
import session from "express-session";

import path from "path";
import { fileURLToPath } from "url";

import bodyParser from "body-parser";

import { Pool } from "pg";
import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import usermanageRoutes from "./routes/usermanageRoutes.js";
import officerRoutes from "./routes/officerRoutes.js";
import userprofileRoutes from "./routes/userprofileRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/*const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Goverment Citizen Services",
  password: "123",
  port: 5432,
});
export default pool; // صادر کردن pool
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

function requireLogin(req, res, next) {
  console.log("Checking login..."); //
  if (!req.session.userId) {
    return res.redirect("/signin");
  }
  next();
}
export { requireLogin };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.redirect("/user/userDashboard"); //
    }
    res.redirect("/signin"); //
  });
});

app.use(express.json());

//routes
app.use("/", authRoutes);

app.use("/", requestRoutes);
app.use("/", serviceRoutes);
app.use("/", usermanageRoutes);
app.use("/", officerRoutes);
app.use("/", userprofileRoutes);
app.use("/", notificationRoutes);
app.listen(PORT, () => {
  console.log("app is listening");
});
