$(document).ready(function(){
   // Initialize Firebase
   var config = {
    apiKey: "AIzaSyDgWAefDx0Ug9gxZEk6ZJ7YQxhQNCkkS4o",
    authDomain: "train-schedule-f8568.firebaseapp.com",
    databaseURL: "https://train-schedule-f8568.firebaseio.com",
    projectId: "train-schedule-f8568",
    storageBucket: "",
    messagingSenderId: "966377261176"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on('click', function(){
    event.preventDefault()
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);
  
    database.ref().push({
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency
    });

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
  })
  database.ref().on("child_added",function(childSnapshot){
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;

    var timeConverted = moment(trainTime, "HH:mm").subtract(1,"years");
    console.log(timeConverted);
    
    var current = moment();
    console.log("Current Time: "+ moment(current).format("hh:mm"));

    var diffTime = moment().diff(moment(timeConverted),"minutes");
    console.log("Difference in Time: " + diffTime);

    var tremainder = diffTime % frequency;
    console.log(tremainder);

     var minsTillTrain =  frequency - tremainder;
     console.log(("Minutes till Train; " + minsTillTrain));

    //  next train
    var nextTrain = moment().add(minsTillTrain,"minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

    var next = moment(nextTrain).format("hh:mm");

    $("#table").append("<tr><td>" + trainName +"</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + minsTillTrain + "</td></tr>");
  })   
    
})