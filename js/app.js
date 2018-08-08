// $(document).ready(function(){
// var trainData = new firebase("")
// }




// TODO: Replace with your project's config object. You can find this
// by navigating to your project's console overview page
// (https://console.firebase.google.com/project/your-project-id/overview)
// and clicking "Add Firebase to your web app"
 // Initialize Firebase
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDkqeA4K_IvmzEihlehG5cRS3qmhWboLDQ",
    authDomain: "fir-click-counter-5f122.firebaseapp.com",
    databaseURL: "https://fir-click-counter-5f122.firebaseio.com",
    projectId: "fir-click-counter-5f122",
    storageBucket: "fir-click-counter-5f122.appspot.com",
    messagingSenderId: "730529417096"
  };
  firebase.initializeApp(config);
  
  // Reference to the recommendations object in your Firebase database
  var database = firebase.database();
  
  // Save a new recommendation to the database, using the input in the form

  $("#btn").on("click", function(e) 
  {
      e.preventDefault();  
      //console.log(e);

      // Get input values from each of the form elements
      var trainName = $("#trainName").val()
      var destination = $("#destination").val()
      var trainTime = $("#firstTrainTime").val()
      var frequency = $("#frequency").val()
      //console.log(trainName);

      var newTrain = 
      {
          trainName: trainName,
          destination: destination,
          trainTime: trainTime,
          frequency: frequency
      };

      console.log(newTrain);
      //adds the object newTrain into the firebase db
      database.ref().push(newTrain);

      console.log(newTrain.trainName);
      console.log(newTrain.destination);
      console.log(newTrain.trainTime);
      console.log(newTrain.frequency);

      //after user submits clear the text fields
      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTrainTime").val("");
      $("#frequency").val("");
  });

  //Firebase event for adding myTrain to the database 
//and autopopulates a table of html when a user adds an entry
database.ref().on("child_added", function(snapshot, prevChildKey) 
{
  // Store everything into a variable.
  var name = snapshot.val().trainName;
  var destination = snapshot.val().destination;
  var firstTime = snapshot.val().trainTime;
  var frequency = snapshot.val().frequency;

  //call the nextTrain fx to return time left
  //timeLeft
  var timeLeft= nextTrain(frequency, firstTime);

  //Next train will arrive based on the current time and the nextArrival
  //nextArrivall = currentTime + timeLeft
  var nextArrival = moment().add(timeLeft, "minutes")

  //use jquery to append to the html document
  // Add each train's data into the table
  $(".table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + moment(nextArrival).format("hh:mm A") + "</td><td>" + timeLeft + "</td></tr>");


   // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

//create code to convert times to determine the next time
//in order to know when the next train is we need to know 
//1. The frequency
//2. the initial time
function nextTrain(myFreq, myTime)
{
    //creating an instance of the moment object, firstTimeConverted and passes
    // myTime, and the format. The firstTimeConverted object is then pushed back one year 
    //by calling the subtract function and passes 1 year.
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(myTime, "hh:mm A").subtract(1, "years");
    //console.log(firstTimeConverted);

    //creating variable for currentTIme via moment function
    var currentTime = moment();

    // First calculates the difference  between the current time and the firstTIme (in mins)

    //diffTime = current time - first converted time = the difference in minutes
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    //to determine the leftover time: diffTime mod myFreq
    // modular divide the time difference by the frequency
    //to determine the leftover time based on the frequency
    var leftoverTime = diffTime % myFreq;

    //to determine time left until next train 
    //will based on the difference between the frequency and the leftover time
    var minNextTrain = myFreq - leftoverTime;

    return minNextTrain;
}


console.log(nextTrain(10, "12:00"));







   