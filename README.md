# liri-node-app
An App to read lyrics and utilizing Bands in Town, Spotify, and OMDB apis

Liri will recognize the following commands and get the data from the appropriate API:

1. `node liri.js concert-this <artist/band name here>`
will reach out to bandsintown API and print out Name of venue, Venue location, and Date of Event

2. `node liri.js spotify-this-song '<song name here>'`
will reach out to Spotify API and print out Artist(s), song's name, preview link of the song from Spotify, and the album 

3. `node liri.js movie-this '<movie name here>'`
will reach out the imdb and print out the movie's title, year released, IMDB rating, Rotten Tomatoes rating, Country, Language, Plot, and Actors

4. `node liri.js do-what-it-says`
will read random.txt in the same directory and parse the instructions that are ',' separated from the above list. 

All instructions will also print out the log.txt as well as their results.

Here is a screenshot of the first 3 functions:
![Image of first 3](First3.png)

Here is a screenshot calling do-what-it-says with the following values
Random.txt with the value: concert-this,"Taylor Swift"
then: spotify-this-song,"California Dreaming"
then: movie-this,"Avengers"
![Image of second 3](Second3.png)

log.txt is also provided of the above 6 functions.
