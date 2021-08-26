function all_love(e){

$('#love-list-'+e).addClass('act');

$('#bg').show();

$('#bg').click(
function() {
$('#love-list-'+e).removeClass('act');
$('#bg').hide();
});

}
