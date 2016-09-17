var table;

var Cell = (function() {
    // "private" variables 
    //var color;
  
    //var row;
    //var col;

    // constructor
    function Cell(x,y,color) {
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
  
    Cell.prototype.toString = function()
    {
        return this._color;
    }

    return Cell;
})();


  function showalert(message,alerttype) {

    $('#alert_placeholder').append('<div id="alertdiv" class="alert ' +  alerttype + '"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')

    setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs


      $("#alertdiv").remove();

    }, 5000);
  }

function generateArray() {

var myNode = document.getElementById("table");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}

rows = $("#rows-field").val();
cols = $("#cols-field").val();

if (rows == "" && cols == "")
{
    showalert("<strong>Error!</strong> The <strong>Rows</strong> and <strong>Columns</strong> fields are empty.","alert-danger");
}
else
{
    if (rows == "")
    {
        showalert("<strong>Error!</strong> The <strong>Rows</strong> field is empty.","alert-danger");
    }

    if (cols == "")
    {
        showalert("<strong>Error!</strong> The <strong>Columns</strong> field is empty.","alert-danger");
    }
}
concentration = $("#concentration-field").val();

  
  var myTableArray = [];
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
  
table = document.getElementById("table");
for (var i = 0; i < rows; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < cols; j++) {
        var td = document.createElement('td');
        if (myTableArray[i][j].getColor() == "white") {
            td.className = "white";
        } else {
            td.className = "black";
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
document.body.appendChild(table);



  
/*$("#table tr").each(function() { 
    var arrayOfThisRow = [];
    var tableData = $(this).find('td');
    if (tableData.length > 0) {
        tableData.each(function() {
          if( $(this).hasClass("white"))
             {
             arrayOfThisRow.push("white");
             }
          else if( $(this).hasClass("black"))
             {
             arrayOfThisRow.push("black");
             }
           });
        myTableArray.push(arrayOfThisRow);
    }
});
*/

alert(myTableArray); // alerts the entire array

//alert(myTableArray[1][0]); // Alerts the first tabledata of the first tablerow
  
}


$(document).on("click", "td", function(event){
if ($(this).hasClass('white'))
	{
		$( this ).toggleClass("pink");
		
    var rowindex = $(this).closest('tr').index();
    var colindex = $(this).closest('td').index();    
    alert("(" + rowindex + ", " + colindex + ")" );

  }
});





