const request = require("request");
const cheerio = require("cheerio");
const express = require("express");

request("https://en.wikipedia.org/wiki/List_of_most-streamed_artists_on_Spotify", (error, response, html) =>{
  if(!error && response.statusCode == 200){
    console.log("success");
  }
  else{
    console.log("error")
  }
})
