const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//call 
main().then(() => {
    console.log("connection successful");
})
    .catch((err) => console.log(err));
//connection method
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

// new route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

//create route
app.post("/chats", (req, res) => {
    let { from, to, message } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date()
    });
    newChat.save().then((res) => {
        console.log("chat was saved");
    }).catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

//update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { message: newMsg } = req.body;
    let updatedchat = await Chat.findByIdAndUpdate(id, { message: newMsg }, { runValidators: true, new: true });
    console.log(updatedchat);
    res.redirect("/chats");
});

//delete route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedchat = await Chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
});

app.get("/", (req, res) => {
    res.send("root is working");
})
app.listen(8080, () => {
    console.log("server is listening on port");
})
