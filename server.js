//Setting the bot up and the required things
var express = require('express'),
    app = express(),   
    Twit = require('twit'),
    config = {    
      twitter: {
        consumer_key: process.env.CONSUMER_KEY, //Gets the consumer, and access api keys as provited in the process.env file. Not included inthis repo bc.... Nah
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter);

app.use(express.static('public'));

//This bot uses cron-job.org. Other free sites are also available. Cron-job is easiest to set up imo

app.all(`/${process.env.BOT_ENDPOINT}`, function(req, res){

  T.post('statuses/update', { status: countdownMessage() }, function(err, data, response) {
    if (err){
      console.log('error!', err);
      res.sendStatus(500);
    }
    else{
      res.sendStatus(200);
    }
  });
});

var listener = app.listen(process.env.PORT, function(){
  console.log('Countdown bot is running on port ' + listener.address().port);
});

var one_day = 1000 * 60 * 60 * 24 
//The date here is the date that you want to have the bot count down to.
var present_date = new Date();
var countdown_day = new Date(present_date.getFullYear(), 8, 17) 

// To Calculate next year's Christmas if passed already. 
if (present_date.getMonth() == 8 && present_date.getdate() > 17) 
    countdown_day.setFullYear(countdown_day.getFullYear() + 1) 
  
// To Calculate the result in milliseconds and then converting into days 
var Result = Math.round(countdown_day.getTime() - present_date.getTime()) / (one_day); 
  
// To remove the decimals from the (Result) resulting days value 
var Final_Result = Result.toFixed(0); 

// Returns the message as the status.
function countdownMessage() {
  
  var status = '';
  
   if(Final_Result > 0)  //Start of the  caltulation for the date. Syntax for the message can be changed here. 
{

	status += 'There are ' + Final_Result +  ' days left until the release of #Cyberpunk2077 #CP2077 #2077';
}
else
{
 //Final status
    status += 'Wake up samurai. #Cyberpunk2077 releases today!';
}
  
  return status;
  
};