const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

//Midddle War
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://shahedali734:ZtiaCr84CzMzz4V0@cluster0.nrymvre.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const blogCollection = client.db("motion-diary").collection("blogs");
    const userCollection = client.db("motion-diary").collection("users");

    app.put("/users", async (req, res) => {
      const { email, name } = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: name,
          email: email,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send({ success: true, result });
    });

    app.get("/users", async (req, res) => {
      const users = await userCollection.find({}).toArray();
      res.send(users);
    });

    app.get("/blogs", async (req, res) => {
      const query = {};
      const cursor = blogCollection.find(query);
      const blogs = await cursor.toArray();
      res.send(blogs);
    });
    app.post("/blogs", async (req, res) => {
      const { title, img, category, description, date, blog } = req.body;
      const addblog = {
        title: title,
        img: img,
        category: category,
        description: description,
        blog: blog,
        date: date,
      };
      const result = await blogCollection.insertOne(addblog);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello From Motion Diary!");
});

app.listen(port, () => {
  console.log(`Motion Diary Listening On Port ${port}`);
});
