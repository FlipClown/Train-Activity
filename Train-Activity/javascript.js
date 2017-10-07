 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDOX84-0f2HItYss9dWoy4lyZsINSB16Ek",
    authDomain: "train-activity-e1023.firebaseapp.com",
    databaseURL: "https://train-activity-e1023.firebaseio.com",
    projectId: "train-activity-e1023",
    storageBucket: "train-activity-e1023.appspot.com",
    messagingSenderId: "553563987678"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Real Time

  var updateTime = function(){
  	var now = moment().format('hh:mm');
  	$('#currentTime').html(now);
  }

  $(document).ready(function(){
    updateTime();
    setInterval(updateTime, 1000);
});



$('#submit').on('click', function(){

	// Retrieve user inputs 
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	var frequency = $('#frequency').val().trim();

	// Object for new train 
	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	
	database.ref().push(newTrain);

	$('#trainName').val('');
	$('#destination').val('');
	$('#firstTrain').val('');
	$('#frequency').val('');



	return false;

});


database.ref().on('child_added', function(childSnapshot, prevChildKey) {

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;


	$('.table > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
		+ frequency + "</td><td>" + "Delayed" + "</td><td>" + "Unknown" + "</td></tr>");

});
