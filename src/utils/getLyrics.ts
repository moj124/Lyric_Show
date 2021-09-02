// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";

// URL of the page we want to scrape
const url = "https://www.azlyrics.com/lyrics/maverickcitymusic/champion.html";

// Async function which scrapes the data
 async function getLyrics() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems = $("div .text-center");
    // Stores data for all songs
    const songs: {name:string,text:string}[] = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx: number, el:string) => {
      // Object holding data for each song/jurisdiction
      const song = { name: "", text: "" };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      song.name = $(el).children("b").text().replace(/['"]+/g, "");
      song.text = $(el).children("div:nth-of-type(5)").text();
      // Populate songs array with song data
      if (song.text.length !== 0) {
        songs.push(song);
      }
    });
    // Logs songs array to the console
    console.dir(songs);
    // Write songs array in songs.json file
    fs.writeFile(
      "./src/" + songs[0].name.toLowerCase() + ".json",
      JSON.stringify(songs, null, 2),
      (err:unknown) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      }
    );
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
// getLyrics();
export {getLyrics}

