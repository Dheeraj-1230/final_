$(function(){

   //declare variables
   var myArray;
   var inputLength;
   var reading = false;
   var counter;
   var action;
   var frequency = 200;
   //on page load hide elements we don't need, leave only text area and start button
   $("#new").hide();
   $("#resume").hide();
   $("#pause").hide();
   $("#controls").hide();
   $("#result").hide();
   $("#error").hide();
  
   //click on Start Reading
   $("#start").click(function(){
      $("#save").hide();
   //get text and split it to words inside an array  //\s matches spaces, tabs, new lines, etc and + means one or more.
   myArray = $("#userInput").val().split(/\s+/);
  
   //get the number of words
   inputLength = myArray.length;
  
   if(inputLength>1){
   reading = true;
  
   $("#start").hide();
   $("#error").hide();
   $("#userInput").hide();
   $("#new").show();
   $("#pause").show();
   $("#result").show();
   $("#controls").show();
   $("#browse").hide();

   $("#progressslider").attr("max", inputLength-1);
   counter = 0;
   $("#result").show();
   $("#result").text(myArray[counter]);
  
   action = setInterval(read, frequency);
  
   }else{
   $("#error").show();
   }
  
   });


   //Click on New
   $("#new").click(function(){
   //reload page
   location.reload();
   });
  
   //Click on Pause
   $("#pause").click(function(){
   //stop reading and switch to none reading mode
   clearInterval(action);
   reading = false;
  
   //hide pause and show resume
   $("#pause").hide();
   $("#resume").show();
  
   });
  
   //Click on Resume
   $("#resume").click(function(){
  
   //start reading
   action = setInterval(read, frequency);
  
   //go back to reading mode
   reading = true;
  
   //hide resume and show pause
   $("#resume").hide();
   $("#pause").show();
  
   });
  
   //Change fontSize
   $("#fontsizeslider").on("slidestop",
  function(event,ui){
   //refresh the slider
   $("#fontsizeslider").slider("refresh");
  
   //get the value of slider
   var slidervalue =
  parseInt($("#fontsizeslider").val());
  
   $("#result").css("fontSize", slidervalue);
   $("#fontsize").text(slidervalue);
   });
  
   //change speed
   $("#speedslider").on("slidestop", function(event,ui){
  
   //refresh the slider
   $("#speedslider").slider("refresh");
  
   //get the value of slider
   var slidervalue =
  parseInt($("#speedslider").val());
  
   $("#speed").text(slidervalue);
   
   //stop reading
   clearInterval(action);
  
   //change frequency
   frequency = 60000/slidervalue;
  
   //resume reading if we are in reading mode
   if(reading){
   action = setInterval(read, frequency);
   }
   });
  
   //progress slider
  $("#progressslider").on("slidestop", function(event,ui){
  
   //refresh the slider
   $("#progressslider").slider("refresh");
  
   //get the value of slider
   var slidervalue =
  parseInt($("#progressslider").val());
  
   //stop reading
   clearInterval(action);
  
   //change counter
   counter = slidervalue;
  
   //change word
   $("#result").text(myArray[counter]);
  
   //change value of progress
  
  $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
  
   //resume reading if we are in reading mode
   if(reading){
   action = setInterval(read, frequency);
   }
   });
   //functions
  
   function read(){
   if(counter == inputLength-1){//last word
   clearInterval(action);
   reading = false; //move to none reading mode
   $("#pause").hide();
   }else{
   //counter goes up by one
   counter++;
  
   //get word
   $("#result").text(myArray[counter]);
  
   //change progress slider value and refresh
  
  $("#progressslider").val(counter).slider('refresh');
  
   //change text of percentage
  
  $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
   }
  
  
  
   }
   // $("#save").click(function(){
   //  $.mobile.changePage("index2.html");
   
   // }
  
  });