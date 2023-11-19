require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB");
const Notes = require("./Models/Notes");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const UserModel = require('./Models/User')
// const notesRoute = require("./Routes/Notes");


const app = express();
// app.use(cookieParser())
// app.use(express.static('public'))

const PORT = process.env.PORT || 8000;

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
app.use(cors({
    origin:"http://localhost:3000",
    //origin:["https://shimmering-kheer-34c615.netlify.app"],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true,
    optionSuccessStatus:200
}))


//Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});
    if (!data) {
      throw new Error("An error occured while fetching notes.");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching notes..." });
  }
});

//Get notes by id

app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Notes.findById(noteId);
    if (!data) {
      throw new Error("An error occured while fetching notes.");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching notes..." });
  }
});

//Create notes
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = await Notes.create({ title, description });
    if (!data) {
      throw new Error("An error occured while creating a notes.");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while creating a notes..." });
  }
});

//Update notes
app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;
    const data = await Notes.findByIdAndUpdate(noteId, { title, description });
    if (!data) {
      throw new Error("An error occured while updating a notes.");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while updating a notes..." });
  }
});

//Delete a note by ID
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const data = await Notes.findByIdAndDelete(noteId);
    if (!data) {
      throw new Error("An error occured while updating a notes.");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while updating a notes..." });
  }
});

//Login
app.post("/login",(req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({email:email})
  .then(us =>{
    if(us){
        if(us.password=== password){
            res.json('Success')
        }else{
            res.json('The password is incorrect')
        }
    }else{
        res.json('No record existed')
    }
  })
    
});

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     UserModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//               console.log(user)
//                 bcrypt.compare(password, user.password, (err, response) => {
//                     if (response) {
                    
//                         const token = jwt.sign({ email:user.email, name:user.name },
//                             "jwt-secret-key", { expiresIn: '1d' })
//                             res.cookie('token', token)
                           
//                             return res.json('Success')                                                                                                              
//                     } else {

//                         return res.json('The passowrd is incorrect')
//                     }
//                 })

//             } else {
//                 res.json("No record existed")
//             }
//         })
// })

//Register
// app.post("/register",  (req, res) => {
//     UserModel.create(req.body)
//     .then(user => res.json(user))
//     .catch(err=> res.json(err))
// })


app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ name, email, password: hash })
                .then(employees => res.json('Success'))
                .catch(err => res.json(err))
        }).catch(err => res.json(err))

})


//logout
app.get('/logout',(req, res)=>{
    
    return res.json("Success")
})

//Routess
app.get("/", cors(), (req, res) => {
  res.json("Hellooo Mate!!");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}. Yayyyyy!!!`);
});
