$(function(){
	$('div.arrow').click(function(){
   	// меняем значение стрелки на противоположный
   	if($(this).hasClass('arrow-up')) {
   		$(this).removeClass('arrow-up').addClass('arrow-down');
   		$(this).parents('.container').find('div.main-d').removeClass('open').addClass('close');

   	} else if ($(this).hasClass('arrow-down')) {
   		$(this).removeClass('arrow-down').addClass('arrow-up');
   		$(this).parents('.container').find('div.main-d').removeClass('close').addClass('open');
   	}
   });
});

// добавления/удаления класса
jQuery.fn.myAddClass = function (classTitle) {
	return this.each(function() {
		var oldClass = jQuery(this).attr('class');
		oldClass = oldClass ? oldClass : '';
		jQuery(this).attr('class', (oldClass+' '+classTitle).trim());
	});
}
jQuery.fn.myRemoveClass = function (classTitle) {
	return this.each(function() {
		var oldClassString = ' '+jQuery(this).attr('class')+' ';
		var newClassString = oldClassString.replace(new RegExp(' '+classTitle+' ','g'), ' ').trim()
		if (!newClassString)
			jQuery(this).removeAttr('class');
		else
			jQuery(this).attr('class', newClassString);
	});
}

$(window).on('load', function () {
	//Dom svg
	var svgObject = document.getElementById('map'); 
	if ('contentDocument' in svgObject) {
		var svgDom = svgObject.contentDocument;
	}

	//при наведении на строку списка подсвечиваем соответствующую область
	$('#list-regions li').hover(
		function () {
			var id = $(this).attr('id');
			$('#'+id, svgDom).myAddClass('selec');
		}, 
		function () {
			var id = $(this).attr('id');
			$('#'+id, svgDom).myRemoveClass('selec');
		});

	//при наведении на названии города подсвечиваем соответствующую область
	$('.region-title').hover(
		function () {
			var id = $(this).attr('id');
			$('#r'+id, svgDom).myAddClass('selec');
		}, 
		function () {
			var id = $(this).attr('id');
			$('#r'+id, svgDom).myRemoveClass('selec');
		});

	//при наведении на область подсвечиваем соответствующую строку списка
	$(svgDom.getElementsByClassName('area')).hover(
		function () {
			var id = $(this).attr('id');
			$('#list-regions #'+id).addClass('sel');
		}, 
		function () {
			var id = $(this).attr('id');
			$('#list-regions #'+id).removeClass('sel');
		});
});