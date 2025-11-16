const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// static serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend started on http://localhost:${PORT}`));
