var table;

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

if (rows == null || cols == null)
{
    showalert("Warning! Please add inputs to the rows/columns field(s).","alert-danger");
}

concentration = $("#concentration-field").val();

table = document.getElementById("table");
for (var i = 0; i < rows; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < cols; j++) {
        var td = document.createElement('td');
        if (concentration < Math.floor((Math.random() * 100) + 1)) {
            td.className = "white";
        } else {
            td.className = "black";
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
document.body.appendChild(table);


}


$(document).on("click", "td", function(){
if ($(this).hasClass('white'))
	{
		$(this).css("background-color","#EB0955");
  }
});
