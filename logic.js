var table;


function generateArray() {

var myNode = document.getElementById("table");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}

rows = $("#rows-field").val();
cols = $("#cols-field").val();

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
