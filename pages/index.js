import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schokland._UNESCO-Werelderfgoed_actm_27.jpg/1024px-Schokland._UNESCO-Werelderfgoed_actm_27.jpg",
//     address: "123 React Street, React Town, RE4 6CT",
//     description: "A great React meetup",
//   },
//   {
//     id: "m2",
//     title: "Second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Lifeguard_stand%2C_Miami_Beach.jpg/1024px-Lifeguard_stand%2C_Miami_Beach.jpg",
//     address: "158 Next Close, London, SE5 4ET",
//     description: "A NextJS event for noobs",
//   },
// ];

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// // any code written in here will only run on the server
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an api

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://nathanifill:MongoDB123!@cluster0.pbm2uza.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
// only used in the build process, not on the server or the client

export default HomePage;
