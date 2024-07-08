const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => console.log(err));
//connection method
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allchats = [
    {
        from: "bushra",
        to: "shafak",
        message: "Hey there! Just wanted to check in and see how you're doing. Let me know if you want to grab coffee sometime this week. 😊",
        created_at: new Date()
    },
    {
        from: "arzoo",
        to: "sonu",
        message: "Hey! Remember to pick up groceries on your way home. I'll start dinner when you get here. See you soon!",
        created_at: new Date()
    },
    {
        from: "iffat",
        to: "aman",
        message: "Good morning! Don't forget about the meeting at 10 AM today. See you there",
        created_at: new Date()
    }
];

Chat.insertMany(allchats);