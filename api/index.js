const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

const User = require("./models/User");
const Post = require("./models/Post");

const app = express();
const uploadMiddleware = multer({ dest: "uploads/" });
const salt = bcrypt.genSaltSync(10);
const secret = "fdfdgfdsbt65765ryryvggh";

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// Database connection
mongoose.connect(
    "mongodb+srv://allyhaas:m1KUtCLOMnzLEPlr@cluster0.teklxhx.mongodb.net/"
);

// Routes
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) return res.status(400).json("User not found");

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign(
                { username, id: userDoc._id },
                secret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json({
                        id: userDoc._id,
                        username,
                    });
                }
            );
        } else {
            res.status(400).json("Wrong credentials");
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
    const { originalname, path } = req.file;
    const ext = originalname.split(".").pop();
    const newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc);
    });
});

app.get("/post", async (req, res) => {
    const posts = await Post.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 })
        .limit(20);
    res.json(posts);
});

app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
});

// Start server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

// m1KUtCLOMnzLEPlr
// mongodb+srv://allyhaas:m1KUtCLOMnzLEPlr@cluster0.teklxhx.mongodb.net/
