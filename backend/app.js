const { usersRoute } = require("./routes/usersRoute")

const express = require("express");

const app = express();
const cors = require("cors");

app.use(cors({
    origin:"*"
}))

app.use(express.json());

app.use("/users", usersRoute)

app.listen(3000,(req,res)=>{
    console.log("Server is listening on port 3000");
})


app.post("/",(req,res)=>{
    console.log(req.body)
    res.send("1")
})
