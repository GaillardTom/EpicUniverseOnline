import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import Parser from 'rss-parser';
import path from 'path'
// import path from 'path-browserify';
// create a new parser object
const parser = new Parser();

dotenv.config();

const app: Express = express();
app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'build')));


const port = process.env.PORT;
//Creates an interface for the feed
interface Feed {
  title: string;
  link: string;
  pubDate: string;
  enclosure: string;
  content: string;
 } 

// app.get('/', function (req: Request, res: Response) {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });
//New endpoint for the rss feed
app.get("/api/nasa-rss", async (req: Request, res: Response) => {

  // parse the feed
  console.log("Getting RSS feed")
  const feed = await parser.parseURL('https://nasa.gov/feeds/iotd-feed/');
  // takes the feed and put the necessary information into the Feed interface
  var feedItems: Feed[] = [];
  feed.items.forEach(item => {
    console.log(item.content)
    var feedItem: Feed = {
      title: item.title || "No Title",
      link: item.link || "No Link",
      pubDate: item?.pubDate || "No Date",
      enclosure: item.enclosure?.url || "No Image",
      content: item?.content || "No Description Available"
    }
    feedItems.push(feedItem);

  });
  // send the feed back to the client
  res.send(feedItems);


})
app.listen(port, () => {
  // console.log(`[server]: Server is running at localhost:${port}`);
});