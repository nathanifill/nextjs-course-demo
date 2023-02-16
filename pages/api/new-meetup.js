import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://nathanifill:MongoDB123!@cluster0.pbm2uza.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db("meetups");

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted." });
    // does this need to be returned?
  }
}

export default handler;
