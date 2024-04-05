import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import Parser from 'rss-parser';

// create a new parser object
const parser = new Parser();

dotenv.config();

const app: Express = express();
app.use(cors())
const port = process.env.PORT || 3000;
//Creates an interface for the feed
interface Feed {
  title: string;
  link: string;
  pubDate: string;
  enclosure: string;
  content: string;
 } 

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

//New endpoint for the rss feed
app.get("/nasa-rss", async (req: Request, res: Response) => {

  // parse the feed
  console.log("Getting RSS feed")
  const feed = await parser.parseURL('https://nasa.gov/feeds/iotd-feed/');
  var sendToFront = {};
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
  console.log(`[server]: Server is running at http://localhost:${port}`);
});