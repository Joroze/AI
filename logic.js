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


$(document).on("click", "td", function(event){
if ($(this).hasClass('white'))
	{
		$( this ).toggleClass("pink");
		
    var rowindex = $(this).closest('tr').index();
    var colindex = $(this).closest('td').index();    
    alert("(" + rowindex + ", " + colindex + ")" );

  }
});

