import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT, PRI } from "./config/config.js";
import dbConnect from "./Database/dbconnect.js";
import userRoute from "./routes/user.route.js";
import propertyRoute from "./routes/property.route.js";
import ContactRoute from "./routes/Contact.route.js";
import InquiryRoute from "./routes/Inquiry.route.js";
import uploadRoute from "./route/uploadRoute.js";
import ReviewRoute from './routes/Review.route.js'
import dotenv from "dotenv";
const app = express();
dotenv.config();
dbConnect();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get(PRI, (req, res) => res.send("API is up and running"));

// Routes
app.use(`${PRI}/users`, userRoute);
app.use(`${PRI}/properties`, propertyRoute);
app.use(`${PRI}/contact`, ContactRoute);
app.use(`${PRI}/inquiry`, InquiryRoute);
app.use(`${PRI}/review`, ReviewRoute);
app.use(`${PRI}`, uploadRoute); 

app.listen(PORT || 7600, () => {
    console.log(` Server running at http://localhost:${PORT}${PRI}`);
});

