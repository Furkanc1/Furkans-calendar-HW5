// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// $ = triggers jquery Link`
$(function () {
  
  // SHOWS DATE ON HEADER
  function updateCurrentDate() {
    //current date
    var currentDate = new Date();
    // select the element by id
    var dateElement = document.getElementById("dateTime");
    // date outline
    var dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
    
    dateElement.textContent = currentDate.toLocaleDateString(undefined,dateOptions);
  }
  
  // CALLS DATE FUNCTION
  updateCurrentDate();
  
  // keeps refreshing date to match with day.js library
  setInterval(function () {
    updateCurrentDate();
    updateCurrentDate();
  }, 20000);

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  // EVENT LISTENER FOR SAVE BUTTON ( WILL SAVE USER INPUT INTO LOCAL STORAGE )
  const timeBlocks = document.querySelectorAll(".time-block");

    $(".saveBtn").on("click", function () {
      var userText = $(this).siblings(".description").val();
      var timeBlock = $(this).parent().attr("id");
      localStorage.setItem(timeBlock, userText);
      alert("Event Saved");
    });

    // getItem() function for keeping local storage values on HTML post refresh
    function setValuesFromLocalStorage() {
      $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        var storedValue = localStorage.getItem(timeBlockId);
        
        if (storedValue !== null) {
          // Set the stored value in the corresponding textarea
          $(this).find(".description").val(storedValue);
        }
      });
    }

    // Call the function to set values when the page loads
    setValuesFromLocalStorage();
    
    
    
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  // updates timeblocks with day.js Library
  function updateTimeBlocks() {
    var currentHour = moment().hour();
    console.log(currentHour);
    
    $(".time-block").each(function () {
      // takes class (time-block) from HTML, splits value with hyphen character, grabs second integer of created index and parses element into an integer and assigns to variable (hourIndicatedInTimeBlocks) 
      const hourIndicatedInTimeBlocks = parseInt($(this).attr("id").split("-")[1]);

    // if else statements to add/remove (present future past) classes
      if (hourIndicatedInTimeBlocks < currentHour) {
        $(this).addClass("past").removeClass(`present future`);
      } else if (hourIndicatedInTimeBlocks === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // runs function TO UPDATE TIME BLOCK ^^
  updateTimeBlocks();
  // Updates Timeblocks by comparing to day.js Current Time every 20 seconds (logs into console every 20 seconds the hour of current day (1-24)
  setInterval(updateTimeBlocks, 20000);

  // DONE (I THINK)
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
