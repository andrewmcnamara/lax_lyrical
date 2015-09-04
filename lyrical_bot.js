var unirest = require('unirest');

const API_KEY=process.env.LYRICS_API_KEY;

console.log(API_KEY);

module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var lyric = req.body.text;

  console.log(API_KEY);
  console.log(lyric);

  // avoid infinite loop
  if (userName !== 'slackbot') {
    unirest.get("http://api.lyricsnmusic.com/songs?api_key="+API_KEY+"&lyrics="+lyric).end(function (response){
    	console.log(response.body);
    return res.status(200).json({text: 'Gotit'});
	});
  } else {
    return res.status(200).end();
  }
}
