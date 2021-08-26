function opennav() {

document.getElementById("sidebar").style.left = "0";
$("div#overlay").addClass("active");

$("div#overlay").click(
function() {
document.getElementById("sidebar").style.left = "-300px";
$("div#overlay").removeClass("active");
});

}

function closenav() {
 document.getElementById("sidebar").style.left = "-300px";
$("div#overlay").removeClass("active");
}
