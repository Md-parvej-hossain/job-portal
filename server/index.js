require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//Middleware module
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

const logger = (req, res, next) => {
  console.log('inside the logger middleware');
  next();
};

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRT, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: 'unauthorized access' });
    }
    res.decode = decode;
    next();
  });
};

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

    // //jwt relatade api
    app.post('/jwt', async (req, res) => {
      const { email } = req.body;
      const user = { email };
      const token = jwt.sign(user, process.env.JWT_ACCESS_SECRT, {
        expiresIn: '1h',
      });
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
      });
      res.send({ success: true });
    });

    // jwt related api
    // app.post('/jwt', async (req, res) => {
    //   const userData = req.body;
    //   const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRT, {
    //     expiresIn: '1d',
    //   });
    //   //set token in  the cookies
    //   res.cookie('token', token, {
    //     httpOnly: true,
    //     secure: false,
    //   });

    //   res.send({ success: true });
    // });
    app.get('/jobs/application', verifyToken, async (req, res) => {
      const email = req.query.email;
      console.log('inside applications api ', req.cookies);
      const query = { hr_email: email };
      const jobs = await jobCollection.find(query).toArray();
      // should use agregate to have optimum data fetching
      for (const job of jobs) {
        const applicationQuery = { jobId: job._id.toString() };
        const application_Count = await applicationCollaction.countDocuments(
          applicationQuery
        );
        job.application_Count = application_Count;
      }
      res.send(jobs);
    });
    //get singal data
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobCollection.findOne(query);
      res.send(result);
    });

    //get all data
    app.get('/jobs', async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.hr_email = email;
      }
      const carsor = jobCollection.find(query);
      const result = await carsor.toArray();
      res.send(result);
    });
    // coud be emale quary
    // app.get('/jobsBtEmailaddress', async (req, res) => {
    //   const email = req.query.email;
    //   const quary = { hr_email: email };
    //   const result = await jobCollection.find(quary).toArray();
    //   res.send(result);
    // });

    app.get('/application/jobs/:job_id', async (req, res) => {
      const job_id = req.params.job_id;
      console.log(job_id);
      const query = { jobId: job_id };
      const result = await applicationCollaction.find(query).toArray();
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
    //status chang
    app.patch('/application/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: req.body.status,
        },
      };
      const resut = await applicationCollaction.updateOne(filter, updatedDoc);
      res.send(resut);
    });

    //quary data load
    //get your application for quary
    app.get('/applications', logger, async (req, res) => {
      const email = req.query.email;
      console.log('inside applications api ', req.cookies);
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
