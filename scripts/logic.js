var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

$(window).on('load', function() { // makes sure the whole site is loaded 
  $('#status').fadeOut(); // will first fade out the loading animation 
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(350).css({'overflow':'visible'});
})

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


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

function showGridInputAlert(alertType, time) {
  
      $("#cols-div").addClass(alertType);
      $("#rows-div").addClass(alertType);
  
  setTimeout(function() {
      $("#cols-div").removeClass(alertType);
      $("#rows-div").removeClass(alertType);

  }, time);
  
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
  
    if ($("#generateArrayBtn").hasClass('disabled'))   {
    showalert("<strong>Error!</strong> You must <strong>wait</strong> until the graph search finishes.", "alert-danger");
    return;
  }
  
  
  startCell=null;
  finishCell=null;
  
  rows = $("#rows-field").val();
  cols = $("#cols-field").val();
  concentration = $("#concentration-field").val();
  
  if (isMobile == true && cols > 10) {
    showalert("<strong>Warning!</strong> Mobile devices may not display the grid correctly if the <strong>Rows</strong> and <strong>Columns</strong> field values are <strong>greater</strong> than 10.", "alert-warning");
    
    showGridInputAlert("has-warning", 2000);
  }
  
  $("#viewArrayBtn").removeClass("disabled");
  $("#traverseBtn").removeClass("disabled");
  selectStack = 0;


  if (rows == "" && cols == "") {
    showalert("<strong>Error!</strong> The <strong>Rows</strong> and <strong>Columns</strong> fields are empty.", "alert-danger");
    
    showGridInputAlert("has-error", 2000);
    
    return;
  } 
  else if (rows == "") {
      showalert("<strong>Error!</strong> The <strong>Rows</strong> field is empty.", "alert-danger");
      
      $("#rows-div").addClass("has-error");
  
  setTimeout(function() {
      $("#rows-div").removeClass("has-error");

  }, 2000);
    
      return;
    }

   else if (cols == "") {
      showalert("<strong>Error!</strong> The <strong>Columns</strong> field is empty.", "alert-danger");
      
            $("#cols-div").addClass("has-error");
  
  setTimeout(function() {
      $("#cols-div").removeClass("has-error");

  }, 2000);
      
     return;
    }
  
    else if (rows != cols)
  {
    showalert("<strong>Error!</strong> The <strong>Rows</strong> and <strong>Columns</strong> fields must have <strong>equal</strong> values.", "alert-danger");
    
    showGridInputAlert("has-error", 2000);
    
    return;
  }
  
  if (rows < 0 || rows > 100)
    {
      showalert("<strong>Error!</strong> The <strong>Rows</strong> field must a <strong>value</strong>  between 0 and 100.", "alert-danger");
      
    $("#rows-div").addClass("has-error");
  
  setTimeout(function() {
      $("#rows-div").removeClass("has-error");

  }, 2000);
      
      return;
    }
  
  if (cols < 0 || cols > 100)  
    {
      showalert("<strong>Error!</strong> The <strong>Columns</strong> field must a <strong>value</strong>  between 0 and 100.", "alert-danger");
      
    $("#cols-div").addClass("has-error");
  
  setTimeout(function() {
      $("#cols-div").removeClass("has-error");

  }, 2000);
      
      return;
    }
  
  if (concentration < 0 || concentration > 100)
    {
          showalert("<strong>Error!</strong> The <strong>Concentration</strong> field must a <strong>value</strong>  between 0 and 100.", "alert-danger");
      
    $("#concentration-div").addClass("has-error");
  
  setTimeout(function() {
      $("#concentration-div").removeClass("has-error");

  }, 2000);
      
      return;
    }

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
    
    else if (selectStack == 2 && myTableArray[hovered_row][hovered_col].getColor() == "green") {
      $(this).addClass('greenDeny');
    }

  },
  mouseleave: function() {
    //stuff to do on mouse leave
    $(this).removeClass('deny');
    $(this).removeClass('greenDeny');    
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
  
  (function theLoop() {
  setTimeout(function () {
	  
	  
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
	
	// recursion
    if (queue.length > 0) {
      theLoop();       
    }
	
	if (queue.length == 0 && newLocation.status != 'white')
	{
            // if "white", the location is either an obstacle or has been visited
            showalert("<strong>Hmmm...</strong> It looks like the end point <strong>cannot</strong> be reached.", "alert-warning");
	    $("#generateArrayBtn").removeClass("disabled");    
	}
	
  }, 75);
})();
  

    // No valid path found
    if (finishCell == null)
    {
      showalert("<strong>Hmmm...</strong> It looks like you did not place an <strong>end point</strong>.", "alert-warning");  
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
	
  
  
  findShortestPath([startCell.getRow(),startCell.getCol   ()], myTableArray);
  
  $("#traverseBtn").addClass("disabled");
    $("#generateArrayBtn").addClass("disabled");	
}

function highlightPath(newLocation)  {
	
	
  var highlightedRow;
  var highlightedCol;
  
  
  (function theLoop(i) {
  setTimeout(function () {
            highlightedRow = newLocation.pathCoord[i][0];
            highlightedCol = newLocation.pathCoord[i][1];
    
            myTableArray[highlightedRow][highlightedCol].setColor("yellow");
  
			dumpArray();
    if (i < newLocation.pathCoord.length - 2) {
	  i++;
      theLoop(i);       // Call the loop again, and pass it the current value of i
    }
	
	else if (i >= 0)
		$("#generateArrayBtn").removeClass("disabled");
	
	else
		i++;
	
  }, 100);
})(2);




    

}





 $(".btn").on("click", function (event) {         
            if ($(this).hasClass("disabled")) {
                event.stopPropagation()
            } else {
                $('#applyRemoveDialog').modal("show");
            }
        });
