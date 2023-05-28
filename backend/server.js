import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

//Midddle War
app.use(cors());
app.use(json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nrymvre.mongodb.net/?retryWrites=true&w=majority`;

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

    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const courses = await userCollection.findOne(query);
      res.send(courses);
    });

    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/user-role", async (req, res) => {
      const { id } = req.query;
      const { role } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          role: role,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send({ success: true, result });
    });

    app.get("/user-role", async (req, res) => {
      const { email } = req.query;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      res.send(user);
    });

    app.get("/blogs", async (req, res) => {
      const query = {};
      const cursor = blogCollection.find(query);
      const blogs = await cursor.toArray();
      res.send(blogs);
    });
    app.post("/blogs", async (req, res) => {
      const {
        title,
        img,
        category,
        description,
        date,
        blog,
        author,
        email,
        like,
        comment,
      } = req.body;
      const addblog = {
        title: title,
        img: img,
        category: category,
        description: description,
        blog: blog,
        author: author,
        email: email,
        date: date,
        like: like,
        comment: comment,
      };
      const result = await blogCollection.insertOne(addblog);
      res.send(result);
    });

    app.put("/blog-approve", async (req, res) => {
      const { id } = req.query;
      const { approve } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          approve: approve,
        },
      };
      const result = await blogCollection.updateOne(filter, updateDoc, options);
      res.send({ success: true, result });
    });

    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const blog = await blogCollection.findOne(query);
      res.send(blog);
    });

    app.delete("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/edit-blog", async (req, res) => {
      const { id } = req.query;
      const { title, img, category, description, updated, blog } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          title: title,
          img: img,
          category: category,
          description: description,
          blog: blog,
          updated: updated,
        },
      };
      const result = await blogCollection.updateOne(filter, updateDoc, options);
      res.send({ success: true, result });
    });

    app.put("/blog-likes", async (req, res) => {
      const { id } = req.query;
      const { like } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          like: like,
        },
      };
      const result = await blogCollection.updateOne(filter, updateDoc, options);
      res.send({ success: true, result });
    });

    app.put("/blog-comments", async (req, res) => {
      const { id } = req.query;
      const { comment } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          comment: comment,
        },
      };
      const result = await blogCollection.updateOne(filter, updateDoc, options);
      res.send({ success: true, result });
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
