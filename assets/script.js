// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// $ = triggers jquery Link`
$(function () {
  // var currentHour = new Date().getHours();

  // var timeBlocks = document.querySelectorAll(".time-block");
  // var saveButton = document.querySelectorAll('.saveBtn');

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // for (let i = 0; i < saveButton.length; i++) {
  // saveButton[i].addEventListener("click", function (){

  $(".saveBtn").on("click", function () {
    var userText = $(this).siblings(".description").val();
    var timeBlock = $(this).parent().attr("id");
    localStorage.setItem(timeBlock, userText);
    window.alert("Event Saved");
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function timeUpdate() {
    var currentHour = moment().hour();
    console.log(currentHour);

    //for (let i = 0; i < timeBlocks.length; i++) {
    // const timeBlock = timeBlocks[i];

    $(".time-block").each(function () {
      const hour = parseInt($(this).attr("id").split("-")[1]);

      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }
  timeUpdate();
  setInterval(timeUpdate, 20000);


  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
