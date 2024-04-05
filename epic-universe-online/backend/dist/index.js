"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const rss_parser_1 = __importDefault(require("rss-parser"));
// import path from 'path'
// create a new parser object
const parser = new rss_parser_1.default();
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT;
// app.get('/', function (req: Request, res: Response) {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });
//New endpoint for the rss feed
app.get("/api/nasa-rss", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // parse the feed
    console.log("Getting RSS feed");
    const feed = yield parser.parseURL('https://nasa.gov/feeds/iotd-feed/');
    // takes the feed and put the necessary information into the Feed interface
    var feedItems = [];
    feed.items.forEach(item => {
        var _a;
        console.log(item.content);
        var feedItem = {
            title: item.title || "No Title",
            link: item.link || "No Link",
            pubDate: (item === null || item === void 0 ? void 0 : item.pubDate) || "No Date",
            enclosure: ((_a = item.enclosure) === null || _a === void 0 ? void 0 : _a.url) || "No Image",
            content: (item === null || item === void 0 ? void 0 : item.content) || "No Description Available"
        };
        feedItems.push(feedItem);
    });
    // send the feed back to the client
    res.send(feedItems);
}));
app.get("/", function (req, res) {
    res.send("API for NASA RSS feed");
});
// app.use(express.static(path.join(__dirname, '..', 'build')));
app.listen(port, () => {
    console.log(`[server]: Server is running at localhost:${port}`);
});
//# sourceMappingURL=index.js.map