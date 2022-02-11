const request = require("request");
const cheerio = require("cheerio");
const express = require("express");

request("https://en.wikipedia.org/wiki/List_of_most-streamed_artists_on_Spotify", (error, response, html) =>{
  if(!error && response.statusCode == 200){
    const $ = cheerio.load(html);
    let stats = [];

    $(".mw-body .mw-body-content .mw-parser-output .wikitable tbody td a").each((i,el) => {
      const item = $(el).text().replace(/[0-9]/g, '').replace(/[\[\]']+/g,'');
      if(stats.length < 20 && item != ""){
        stats.push(item);
      }
      //console.log(i + ": " + item);
    })
    console.log(stats);
  }
  else{
    console.log("error")
  }
})
