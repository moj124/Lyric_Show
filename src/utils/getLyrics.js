// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");


// URL of the page we want to scrape
// const url = "https://www.azlyrics.com/lyrics/maverickcitymusic/champion.html";
// const url = "https://www.azlyrics.com/lyrics/christomlin/howgreatisourgod.html";
const url = 'https://www.azlyrics.com/lyrics/drake/way2sexy.html';
// Async function which scrapes the data
 async function getLyrics(url) {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems= $("div .text-center");
    // Stores data for all songs
    const songs = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      // Object holding data for each song/jurisdiction
      const song = { name: "", text: "" };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      song.name = $(el).children("b").text().replace(/['"]+/g, "");
      song.text = $(el).children("div:nth-of-type(5)").text().split('\n');
      // Populate songs array with song data
      if (song.text.length > 1) {
        songs.push(song);
      }
    });
    // Logs songs array to the console
    console.log(songs);
    // Write songs array in songs.json file
    fs.writeFile(
      "./src/" + songs[0].name.toLowerCase() + ".json",
      JSON.stringify(songs, null, 2),
      (err) => {
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
getLyrics(url);

