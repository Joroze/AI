var Cell = (function() {
  // "private" variables 
  //var color;

  //var row;
  //var col;

  // constructor
  function Cell(x, y, color) {
    this._row = x;
    this._col = y;
    this._color = color;

    //alert("Cell created: " + color + " " + "(" + row + ", " + col + ")");
  };

  // add the methods to the prototype so that all of the 
  // Foo instances can access the private static
  Cell.prototype.getRow = function() {
    return this._row;
  }

  Cell.prototype.getCol = function() {
    return this._col;
  }

  Cell.prototype.getColor = function() {
    return this._color;
  };
  Cell.prototype.setColor = function(color) {
    this._color = color;
  };

  Cell.prototype.toString = function() {
    return this._color;
  }

  return Cell;
})();

var myTableArray = [];
var selectStack = 0;
var selected_row;
var selected_col;
var startCell;
var finishCell;

function showalert(message, alerttype) {

  $('#alert_placeholder').append('<div id="alertdiv" class="alert ' + alerttype + '"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>')

  setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs

    $("#alertdiv").remove();

  }, 5000);
}

function BreadthFirst() {

}

function dumpArray() {

  var arrayModalText = "";

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      arrayModalText += myTableArray[i][j] + " ";
    }
    arrayModalText += "<br>";
  }

  $('#arrayModalText').html(arrayModalText);

  var table = document.getElementById("table");
  while (table.firstChild != null) {
    table.removeChild(table.firstChild);
  }

  for (var i = 0; i < rows; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < cols; j++) {
      var td = document.createElement('td');
      if (myTableArray[i][j].getColor() == "white") {
        td.className = "white";
      } else if (myTableArray[i][j].getColor() == "green") {
        td.className = "green";
      } else if (myTableArray[i][j].getColor() == "red") {
        td.className = "red";
      } else if (myTableArray[i][j].getColor() == "blue") {
        td.className = "blue";
      } else if (myTableArray[i][j].getColor() == "yellow") {
        td.className = "yellow";
      } else {
        td.className = "black";
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);

}

function generateArray() {
  $("#viewArrayBtn").removeClass("disabled");
  $("#traverseBtn").removeClass("disabled");
  selectStack = 0;
  rows = $("#rows-field").val();
  cols = $("#cols-field").val();

  if (rows == "" && cols == "") {
    showalert("<strong>Error!</strong> The <strong>Rows</strong> and <strong>Columns</strong> fields are empty.", "alert-danger");
  } else {
    if (rows == "") {
      showalert("<strong>Error!</strong> The <strong>Rows</strong> field is empty.", "alert-danger");
    }

    if (cols == "") {
      showalert("<strong>Error!</strong> The <strong>Columns</strong> field is empty.", "alert-danger");
    }
  }
  concentration = $("#concentration-field").val();

  myTableArray = [];
  var color;

  for (var i = 0; i < rows; i++) {
    myTableArray[i] = [];
    for (var j = 0; j < cols; j++) {
      var random = Math.floor((Math.random() * 100) + 1);
      if (concentration < random) {
        color = "white";
      } else if (concentration > random) {
        color = "black";
      }

      myTableArray[i][j] = new Cell(i, j, color);
    }
  }

  dumpArray();

  //alert(myTableArray); // alerts the entire array

  //alert(myTableArray[1][0]); // Alerts the first tabledata of the first tablerow

}

$(document).on({
  mouseenter: function() {
    //stuff to do on mouse enter
    var hovered_row = $(this).closest('tr').index();
    var hovered_col = $(this).closest('td').index();

    if (selectStack == 2 && myTableArray[hovered_row][hovered_col].getColor() == "white") {
      $(this).addClass('deny');
    }

  },
  mouseleave: function() {
    //stuff to do on mouse leave
    $(this).removeClass('deny');
  }
}, "td"); //pass the element as an argument to .on

$(document).on('click', "td", function(event) {

  selected_row = $(this).closest('tr').index();
  selected_col = $(this).closest('td').index();

  if ($(this).hasClass('white')) {

    if (selectStack == 0) {
      myTableArray[selected_row][selected_col].setColor("green");
      startCell = myTableArray[selected_row][selected_col];
      selectStack++;
    } else if (selectStack == 1) {
      myTableArray[selected_row][selected_col].setColor("red");
      finishCell = myTableArray[selected_row][selected_col];
      selectStack++;
    }
      else {
$("#table").pulse({opacity: 0.8}, {duration : 100, pulses : 5});
      }

  } else if ($(this).hasClass('green')) {
    if (selectStack > 1) {
      showalert("<strong>Error!</strong> Remove the  <strong>red</strong> block first!", "alert-danger");

      return;
    }
    myTableArray[selected_row][selected_col].setColor("white")
    selectStack = 0;
  } else if ($(this).hasClass('red')) {
    myTableArray[selected_row][selected_col].setColor("white")
    selectStack--;
  }

  dumpArray();

});

$(document).ready(function blink() {
  $('span.blinking').fadeOut(1000).fadeIn(1000, blink);
});

// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
var findShortestPath = function(startCell, myTableArray) {
  var distanceFromTop = startCell[0];
  var distanceFromLeft = startCell[1];

  // Each "location" will store its coordinates
  // and the shortest path required to arrive there
  var location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    pathCoord: [startCell[0],startCell[1]],
    status: "Start"
  };

  // Initialize the queue with the start location already inside
  var queue = [location];

  // Loop through the grid searching for the goal
  while (queue.length > 0) {
    // Take the first location off the queue
    var currentLocation = queue.shift();

    // Explore North
    var newLocation = exploreInDirection(currentLocation, 'North', myTableArray);
    if (newLocation.status === 'Goal') {
      highlightPath(newLocation);      
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
      
    }

    // Explore East
    var newLocation = exploreInDirection(currentLocation, 'East', myTableArray);
    if (newLocation.status === 'Goal') {
      highlightPath(newLocation);
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore South
    var newLocation = exploreInDirection(currentLocation, 'South', myTableArray);
    if (newLocation.status === 'Goal') {
      highlightPath(newLocation);
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore West
    var newLocation = exploreInDirection(currentLocation, 'West', myTableArray);
    if (newLocation.status === 'Goal') {
      highlightPath(newLocation);
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
  }


    // No valid path found
    if (finishCell == null)
    {
      showalert("<strong>Hmmm...</strong> It looks like the end point <strong>cannot</strong> be found.", "alert-warning");
    } else {
      showalert("<strong>Hmmm...</strong> It looks like the end point <strong>cannot</strong> be reached.", "alert-warning");
    }
  return false;

};

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
var locationStatus = function(location, myTableArray) {
  var gridSize = myTableArray.length;
  
  var dft = location.distanceFromTop;
  var dfl = location.distanceFromLeft;

  if (location.distanceFromLeft < 0 ||
      location.distanceFromLeft >= gridSize ||
      location.distanceFromTop < 0 ||
      location.distanceFromTop >= gridSize) {

    // location is not on the grid--return false
    return 'Invalid';
  } else if (myTableArray[dft][dfl].getColor() == "red") {
     showalert("<strong>Done!</strong> A path has been <strong>created</strong>.", "alert-success");
    return 'Goal';
  } else if (myTableArray[dft][dfl].getColor() != "white") {
    // location is either an obstacle or has been visited
    return 'Blocked';
  } else {
    return 'Valid';
  }
};


// Explores the grid from the given location in the given
// direction
var exploreInDirection = function(currentLocation, direction, myTableArray) {
  var newPath = currentLocation.path.slice();
  newPath.push(direction);
  
  var dft = currentLocation.distanceFromTop;
  var dfl = currentLocation.distanceFromLeft;

  if (direction === 'North') {
    dft -= 1;
  } else if (direction === 'East') {
    dfl += 1;
  } else if (direction === 'South') {
    dft += 1;
  } else if (direction === 'West') {
    dfl -= 1;
  }
  
  var newPathCoord = currentLocation.pathCoord.slice();
  newPathCoord.push([dft,dfl]);


  
  var newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    pathCoord: newPathCoord,
    status: 'Unknown'
  };
  
  newLocation.status = locationStatus(newLocation, myTableArray);

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === 'Valid') {
    myTableArray[newLocation.distanceFromTop][newLocation.distanceFromLeft].setColor("blue");
    dumpArray();
  }

  return newLocation;
};


// OK. We have the functions we need--let's run them to get our shortest path!

// Think of the first index as "distance from the top row"
// Think of the second index as "distance from the left-most column"

function traverse() {
  if ($("#traverseBtn").hasClass('disabled'))   {
    showalert("<strong>Error!</strong> You must <strong>generate</strong> a <strong>new</strong> 2D Array grid first.", "alert-danger");
    return;
  }
  
  if (startCell == null)
    {
     showalert("<strong>Error!</strong> You must <strong>place</strong> a <strong>start position</strong> on the 2D Array grid first.", "alert-danger");
    return;
    }
  
  console.log(findShortestPath([startCell.getRow(),startCell.getCol   ()], myTableArray));
  
  $("#traverseBtn").addClass("disabled");
}

function highlightPath(newLocation)  {
  var highlightedRow;
  var highlightedCol;

  for (var i = 2; i < newLocation.pathCoord.length - 1; i++) {
            highlightedRow = newLocation.pathCoord[i][0];
            highlightedCol = newLocation.pathCoord[i][1];
    
            myTableArray[highlightedRow][highlightedCol].setColor("yellow");
}
  
  dumpArray();
}

 $(".btn").on("click", function (event) {         
            if ($(this).hasClass("disabled")) {
                event.stopPropagation()
            } else {
                $('#applyRemoveDialog').modal("show");
            }
        });
