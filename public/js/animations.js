$(".alert").fadeTo(15000, 500).slideUp(500, function() {
	$(".alert").alert('close');
});

$(function() {
	$('[data-toggle="tooltip"]').tooltip();
});