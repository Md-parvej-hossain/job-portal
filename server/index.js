require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//Middleware module
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.slspkzm.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const jobCollection = client.db('careerCode').collection('jobs');
    const applicationCollaction = client
      .db('careerCode')
      .collection('applicatio');

    //get singal data
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobCollection.findOne(query);
      res.send(result);
    });

    //get all data
    app.get('/jobs', async (req, res) => {
      const carsor = jobCollection.find();
      const result = await carsor.toArray();
      res.send(result);
    });

    //job post api
    app.post('/jobs', async (req, res) => {
      const newJob = req.body;
      console.log(newJob);
      const result = await jobCollection.insertOne(newJob);
      res.send(result);
    });

    //job application relatade api
    //crreat a post api
    app.post('/application', async (req, res) => {
      const application = req.body;
      const result = await applicationCollaction.insertOne(application);
      res.send(result);
    });

    // get application data
    app.get('/application', async (req, res) => {
      const carsor = applicationCollaction.find();
      const result = await carsor.toArray();
      res.send(result);
    });

    //quary data load
    //get your application for quary
    app.get('/applications', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const resuld = await applicationCollaction.find(query).toArray();
      //optonal
      //this is a aggregate data
      for (const application of resuld) {
        const jobId = application.jobId;
        const jobQuer = { _id: new ObjectId(jobId) };
        const job = await jobCollection.findOne(jobQuer);
        application.company = job.company;
        application.title = job.title;
        application.company_logo = job.company_logo;
      }
      res.send(resuld);
    });

    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
  }
}

run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Server is runing');
});

app.listen(port, (req, res) => {
  console.log(`server is runung port http://localhost:${port}`);
});
