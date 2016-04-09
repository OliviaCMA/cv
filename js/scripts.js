$(function() {

	var OFFSET = 54;

	$('.progress-bar.to-reveal').viewportChecker({
		classToAdd: 'animated fadeInLeft',
		classToRemove: 'to-reveal',
		offset: 0
	});

	$('.card.to-reveal').viewportChecker({
		classToAdd: 'animated fadeInLeft',
		classToRemove: 'to-reveal',
		offset: 100
	});

	$(window).scroll(function() {
		if ($(window).scrollTop() > $('#about').offset().top - OFFSET - 1) {
			$('#navbar').removeClass('transparent');
			$('#navbar').removeClass('navbar-dark');
			$('#navbar').addClass('navbar-light');
			$('.floating-button').addClass('reverse');
			$('.floating-button').attr('href', '#home');
		} else {
			$('#navbar').addClass('transparent');
			$('#navbar').addClass('navbar-dark');
			$('#navbar').removeClass('navbar-light');
			$('.floating-button').removeClass('reverse');
			$('.floating-button').attr('href', '#about');
		}
	});

	$('.navbar-nav:not(#s-links) .nav-link, .navbar-brand, .floating-button').click(function(event) {
		event.preventDefault();
		var target = $(this).attr('href');
		var targetOffset = $(target).offset().top;
		$('html, body').animate({
			scrollTop: (targetOffset - OFFSET)
		});
	});

	$('a.text-link').click(function() {
		var icon = $(this).find('span');
		if (icon.hasClass('fa-caret-down')) {
			icon.removeClass('fa-caret-down');
			icon.addClass('fa-caret-up');
		} else {
			icon.removeClass('fa-caret-up');
			icon.addClass('fa-caret-down');
		}
	});

	$('#contact-form').submit(function(event) {
		event.preventDefault();
        var form = $(this);
        var submitButton = form.find('button:submit:visible');
		var data = new FormData(this);
        submitButton.button('sending');
        submitButton.addClass('disabled');
        submitButton.attr('disabled', true);
		$.ajax({
			url: form.attr('action'),
			type: form.attr('method'),
        	data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function(data) {
            	var alert = '<div class="alert alert-' + data.status + '">' + data.message + '</div>';
                $(alert).hide().appendTo('#alert-container').slideDown('fast');
                $('.alert').delay(3000).slideUp('fast', function() {
                	$(this).remove();
                });
                submitButton.button('reset');
                submitButton.removeClass('disabled');
                submitButton.attr('disabled', false);
                form.find('input, textarea').val('');
            },
            error: function(jqXHR) {
            	console.log('error', jqXHR);
            	var alert = '<div class="alert alert-danger">Echec de l\'envoi. Veuillez réessayer ultérieurement</div>';
                $(alert).hide().appendTo('#alert-container').slideDown('fast');
                $('.alert').delay(3000).slideUp('fast', function() {
                	$(this).remove();
                });
                submitButton.button('reset');
                submitButton.removeClass('disabled');
                submitButton.attr('disabled', false);
            }
		});
	});

});