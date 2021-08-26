$('body').on("click", 'a', function(mi) {
mi.preventDefault();
url = $(this).attr('href');
load(url, false);});
var state = {name: location.href, page: document.title};
window.history.pushState(state, document.title, location.href);
$(window).on("popstate", function(){
if(history.state){
load(history.state.name, true);}});
function load(link,pop){
$("load").append('');
$.get(link,"", function(data_html){
var title = data_html.split('<title>')[1].split('</title>')[0];
var body = data_html.split('<load>')[1].split('</load>')[0];
$("title").text(title);
$("load").html(body);
if(pop != true){
var state = {name: link, page: title};
window.history.pushState(state, title, link);}
$('html,body').animate({scrollTop:0},'fast','linear');}).fail(function(){
window.alert('Trang bạn yêu cầu không có');
$('.loader').fadeOut('slow', 'swing');
})
}
