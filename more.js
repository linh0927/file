$(document).ready(function () {
if ($(".more:hidden").length > 0) {
$(".more").slice(0, 10).fadeIn(600, 'swing');
}
if ($(".more:hidden").length == 0) {
$("#loadmore").hide();
}
$("#loadmore").on('click', function (e) {
e.preventDefault(); //familychat.tk-blogging.gq
$(".more:hidden").slice(0, 10).slideDown(600);
if ($(".more:hidden").length < 1) {
$("#loadmore").fadeOut("fast");
}
});
});
