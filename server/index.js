import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import restoRoutes from "./routes/resto.js";
import comRoutes from "./routes/com.js";
import wilRoutes from "./routes/wilaya.js";

import Restaurant from "./models/Restaurant.js";
import { wilayas } from "./data/index.js";
import {addResto, getNewRestos} from "./controllers/resto.js";
import Wilaya from "./models/Wilaya.js";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });



/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/addRestaurant",upload.single("picture"),addResto);


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/resto", restoRoutes);
app.use("/com", comRoutes);
app.use("/wil",wilRoutes);

app.get("/newest",getNewRestos)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6002;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // Wilaya.insertMany(wilayas);
  })
  .catch((error) => console.log(`${error} did not connect`));