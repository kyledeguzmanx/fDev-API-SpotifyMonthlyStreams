const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const PORT = 8000;

request("https://en.wikipedia.org/wiki/List_of_most-streamed_artists_on_Spotify", (error, response, html) =>{
  if(!error && response.statusCode == 200){
    
    const $ = cheerio.load(html);
    let stats = [];
    let numbers = [];
    const newsfeed = $(".mw-body .mw-body-content .mw-parser-output .wikitable tbody td a");
    //console.log(newsfeed.html());

    $(".mw-body .mw-body-content .mw-parser-output .wikitable tbody tr td").each((i,el) => {
      const item = $(el).html();
      if(numbers.length < 20 && !isNaN(parseFloat(item))){
        numbers.push(item);
      }
      //console.log(i + ": " + item);
    })
     $(".mw-body .mw-body-content .mw-parser-output .wikitable tbody td a").each((i,el) => {
      const item = $(el).text().replace(/[0-9]/g, '').replace(/[\[\]']+/g,'');
      if(stats.length < 20 && item != ""){
        stats.push(item);
      }
      //console.log(i + ": " + item);
    })
    
    console.log(stats, numbers);
    let returnObj = [];
    for( var i=0 ; i < stats.length; i++){
      returnObj.push({
        rank: i+1,
        artist: stats[i],
        monthlyListeners: numbers[i]
      });
    }
    console.log (returnObj);

     app.get("/", (req,res) => {
             res.json(returnObj);
         })

        app.listen(PORT, () => console.log(`server running on ${PORT}`)); //starts server and listens on port 8000
  }
  else{
    console.log("error")
  }
})
