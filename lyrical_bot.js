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
   	 var result = response.body[0]['context'];
     var songDetails  = "*Artist:*"+result['artist']['name']+
     	           "\n*Song Title:*"+result['title']+
     	           "\n*Context*:"+result['context'];
    return res.status(200).json({text: songDetails});
	});
  } else {
    return res.status(200).end();
  }
}
