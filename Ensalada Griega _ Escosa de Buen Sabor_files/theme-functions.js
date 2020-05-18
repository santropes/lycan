$(window).load(function() {
    $('.content_preloader').fadeOut('slow');
});

$('body').on('click', '.search-modal', function(event) {
    $('#modal_search').modal({backdrop: "static",keyboard :false});
    setTimeout(function(){document.getElementById("search-input").focus();}, 500);
});

function testAnim(x) {
    $('.modal .modal-dialog').attr('class', 'modal-dialog  modal-lg  ' + x + '  animated_new');
};

$('.modal').on('show.bs.modal', function (e) {
      testAnim('fadeInUp');
});

$('.modal').on('hide.bs.modal', function (e) {
      testAnim('fadeOutUp');
});

$('.modal-dialog .close').click(function(event) {
    $('#search-input').val('');
    $('#result-search-p').empty();
    $('#result-search-r').empty();
});

$("#search-input").keyup(function(e){
    var search = $(this).val().trim();
    var lang_s = $('#lang-search').val();
    if (search != '') {
    	if (search.length >= 3) {
    		$.ajax({
    			url: '/~escosaco/wp-admin/admin-ajax.php',
    			type: 'POST',
    			dataType: 'JSON',
    			data: {'action' : 'ajaxsearch', data_search : search, lang : lang_s},
    			beforeSend: function(){
    				$('#result-search-p').html('<div class="loader-p"> <div class="inner one"></div><div class="inner two"></div><div class="inner three"></div></div>');
                    $('#result-search-r').html('<div class="loader-p"> <div class="inner one"></div><div class="inner two"></div><div class="inner three"></div></div>');
    			}
    		}).done(function(response) {
    			$('#result-search-p').html(response.items_p);
                $('#result-search-r').html(response.items_r);
    		}).fail(function() {
    			console.log("error");
    		});
    	}else{
    		$('#result-search').empty();
    	}
    }else{
    	$('#result-search').empty();
    }
});


$('#form-search').submit(function(event) {
	event.preventDefault();
});

$(document).ready(function() {
    var obj_act_top = $(document).scrollTop();
    if(obj_act_top > 50){
        //$('.container-menu').addClass('menu-fix').stop().animate({top : '0'}, 0);
    }else{
        //$('.container-menu').removeClass('menu-fix');
    }

    //if (home_v) {
        var controller = $.superscrollorama();
        controller.addTween(
            '#section-escosa-scroll',  
            (new TimelineLite()).append([
            TweenMax.fromTo($('#section-escosa-scroll .img-mov'), 1, {
                css: {
                    bottom: -50
                },
                immediateRender: true
                }, {
                css: {
                    bottom: 40
                }
            })
            ]), 1000 // scroll duration of tween
        );

        controller.addTween('#resena .animate_e', TweenMax.from( $('#resena .animate_e'), .6, {css:{opacity: 0}}));
        controller.addTween('.textos-anima', TweenMax.from( $('.textos-anima'), .6, {css:{opacity: 0}}));
        controller.addTween('#fly-it-left-1', TweenMax.from( $('#fly-it-left-1'), .25, {css:{right:'-200%'}, ease:Quad.easeInOut}));
        controller.addTween('#img-retail', TweenMax.from( $('#img-retail'), .6, {css:{opacity: 0}}));
    //}
});

$(function(){
    var obj = $(document);       
    var obj_top = obj.scrollTop(); 
    obj.scroll(function(){
        var obj_act_top = $(this).scrollTop();  
        if(obj_act_top > obj_top){
            /*if (obj_top > 50) {
                $('.container-menu').addClass('menu-fix').animate({top : '0'}, 0);
            }else{
                $('.container-menu').removeAttr('style');
                $('.container-menu').removeClass('menu-fix');
            }*/
        }else{
            /*if (obj_top > 50) {
                $('.container-menu').addClass('menu-fix').animate({top : '0'}, 0);
            }else{
                $('.container-menu').removeClass('menu-fix').animate({top : '0'}, 0);
                $('.container-menu').removeAttr('style');
            }*/  
        }
        obj_top = obj_act_top;                  
    });
});

$('#menu-menu-principal > li:nth-of-type(3) > a, #menu-menu-principal-ingles > li:nth-of-type(3) > a').click(function(event) {
    event.preventDefault();
    if ($('.container-submenu').is(':visible')){
        $('.sub-menu').stop().fadeOut();
        $('.container-submenu').stop().fadeOut();
    }else{
        $('.sub-menu').stop().fadeOut();
        $('.container-submenu').stop().fadeIn();
    }
});

$('#menu-menu-principal > li:nth-of-type(2) > a, #menu-menu-principal-ingles > li:nth-of-type(2) > a').click(function(event) {
    event.preventDefault(); 
    if ($(this).siblings('.sub-menu').is(':visible')){
        $('.container-submenu').stop().fadeOut();
        $(this).siblings('.sub-menu').stop().fadeOut();
    }else{
        if ($(window).width() < 769) {
            $(this).siblings('ul').prepend('<div class="btn-close-submenu" style = "padding:15px;"><img src="'+SITEURL+'/wp-content/themes/escosa2.0/images/back_menu.png" alt=""><h4>REGRESAR</h4></div>');
        }
        $('.container-submenu').stop().fadeOut();
        $(this).siblings('.sub-menu').stop().fadeIn();
    }
});

$(document).on("click",function(e) {
    if ($(window).width() > 992) {
        if (languaje == "es") {
            var container = $("#menu-menu-principal");
        }else{
            var container = $("#menu-menu-principal-ingles");
        }

        if (!container.is(e.target) && container.has(e.target).length === 0) { 
            $('.sub-menu').stop().fadeOut();
            $('.container-submenu').stop().fadeOut();
        }        
    }
});

if (page_contact == true){
    var onloadCallback = function() {
        captcha_footer = grecaptcha.render('captcha-footer', {
            'sitekey': '6LeNizgUAAAAAG3Uys6GTlvpOaXGy_2qq3W2nKDY'
        });

        captcha_contact = grecaptcha.render('captcha-contact', {
            'sitekey': '6LeNizgUAAAAAG3Uys6GTlvpOaXGy_2qq3W2nKDY'
        });
    }
}else{
    var onloadCallback = function() {
        captcha_footer = grecaptcha.render('captcha-footer', {
            'sitekey': '6LeNizgUAAAAAG3Uys6GTlvpOaXGy_2qq3W2nKDY'
        });
    }
}

$('body').on('click','.btn-responsive-menu',function(event) {
    if ($('#container-menu-ei ul.menu').is(':hidden')) {
        $('#container-menu-ei ul.menu').stop().fadeIn();
        $('#menu-menu-principal').prepend('<span class = "btn-responsive-menu close-add unica"><img src = "'+SITEURL+'/wp-content/themes/escosa2.0/images/close-menu.png"> Cerrar</span>');
        $('body').css('overflow', 'hidden');
    }else if($('#container-menu-ei ul.menu').is(':visible')){
        $('#container-menu-ei ul.menu').stop().fadeOut();
        $('.close-add').remove();
        $('body').css('overflow', 'visible');
    }
});

if (carrusel == true) {
    $(document).ready(function(){
        $("#clientes").flexisel({
            visibleItems: 4,
            itemsToScroll: 1,         
            autoPlay: {
                enable: true,
                interval: 3000,
                pauseOnHover: false
            }        
        });
    });
}

if (category == true) {
    var page = 2;
    var hijo = 8;
    $(window).scroll(function(){
        if  ($('#container-pv .col-lg-3:nth-child('+hijo+')').offset().top - $(window).scrollTop() <= 200){
            if (category == true) {
                loadProductsCats(term, page);
                page++;
                hijo = 8 * (page - 1);
            }
        }
    }); 
}

if (category_import == true) {
    var page_i = 2;
    var hijo_i = 8;
    $(window).scroll(function(){
        if  ($('#container-pv .col-lg-3:nth-child('+hijo_i+')').offset().top - $(window).scrollTop() <= 200){
            if (category_import == true) {
                loadProductsImports(term, page_i);
                page_i++;
                hijo_i = 8 * (page_i - 1);
            }
        }
    });
}

if (all_import == true) {
    var page_ia = 2;
    var hijo_ia = 8;
    $(window).scroll(function(){
        if  ($('#container-pv .col-lg-3:nth-child('+hijo_ia+')').offset().top - $(window).scrollTop() <= 280){
            if (all_import == true) {
                allProductsImports(id_post, page_ia);
                page_ia++;
                hijo_ia = 8 * (page_ia - 1);
            }
        }
    });   
}

function loadProductsCats(term, paged){
    $.ajax({
        url: "/~escosaco/wp-admin/admin-ajax.php",
        type:'POST',
        dataType: 'JSON',
        data: {'action' : 'infinite_scroll', cat : term, page : paged},
        beforeSend: function(){
            $('.loader-products').fadeIn('fast');
        }
    }).done(function(response) {
        $('.loader-products').fadeOut('fast');
        if (response.items != "") {
            $('#container-pv').append(response.items)
        }else{
            category = false;
        }
    }).fail(function(response){});
}

function loadProductsImports(term, paged){
    $.ajax({
        url: "/~escosaco/wp-admin/admin-ajax.php",
        type:'POST',
        dataType: 'JSON',
        data: {'action' : 'infinite_scroll_imp', cat : term, page : paged},
        beforeSend: function(){
            $('.loader-products').fadeIn('fast');
        }
    }).done(function(response) {
        $('.loader-products').fadeOut('fast');
        if (response.items != "") {
            $('#container-pv').append(response.items)
        }else{
            category_import = false;
        }
    }).fail(function(response){});
}

function allProductsImports(term, paged){
    $.ajax({
        url: "/~escosaco/wp-admin/admin-ajax.php",
        type:'POST',
        dataType: 'JSON',
        data: {'action' : 'infinite_scroll_all', parent : term, page : paged},
        beforeSend: function(){
            $('.loader-products').fadeIn('fast');
        }
    }).done(function(response) {
        $('.loader-products').fadeOut('fast');
        if (response.items != "") {
            $('#container-pv').append(response.items)
        }else{
            all_import = false;
        }
    }).fail(function(response){});
}

$(document).ready(function() {
    $(window).resize(function(event) {
        if ($(window).width() < 769) {
            $('#container-menu-ei ul.menu').stop().fadeOut('fast');
            $('.close-add').remove();
        }else{
            $('#container-menu-ei ul.menu').stop().fadeIn('fast');
        }
    });

    if (is_sing == true) {
        $('#menu-menu-principal li:nth-of-type(3), #menu-menu-principal-ingles li:nth-of-type(3)').addClass('current_page_ancestor');
    }

    if(is_sing_r == true){
        $('#menu-menu-principal li:nth-of-type(5), #menu-menu-principal-ingles li:nth-of-type(5)').addClass('current_page_ancestor');
    }

    if(is_sing_n == true){
        $('#menu-menu-principal li:nth-of-type(2), #menu-menu-principal-ingles li:nth-of-type(2)').addClass('current_page_ancestor');
    }
});

$('body').on('click', '.btn-close-submenu', function(event) {
   $('.container-submenu').stop().fadeOut();
   $('.sub-menu').stop().fadeOut();
   setTimeout(function(){$('#menu-menu-principal > li:nth-of-type(2) > a').siblings('ul').find('.btn-close-submenu').remove();}, 250);
});
//contacto
$(document).ready(function(e) {
    $('#contact').bootstrapValidator({
         container: '#messages',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            nombre: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese su nombre </br>'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese su email </br>'
                    },
                    emailAddress: {
                        message: 'El correo electronico no es valido </br>'
                    }
                }
            },
             telefono: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese su Teléfono </br>'
                    }
                }
            },
            como: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese una opcion valida </br>'
                    }
                }
            },
            mensaje: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese un mensaje </br>'
                    }
                }
            }

        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: SITEURL+"/wp-content/themes/escosa2.0/includes/form.php",
            data : $('#contact').serialize(),
            beforeSend: function() {
                
            }
        }).done(function(response, textStatus, jqXHR ) {
            if (response.result == true) {                  
                $('#messages').html('<div class="alert alert-success alert-white rounded"><div class="icon"><i class="fa fa-times-circle"></i></div>'+response.message+'</div>');
                $('.btn').attr('disabled', false);
            }else if(!response.result){
                $('#messages').html('<div class="alert alert-danger alert-white rounded"><div class="icon"><i class="fa fa-times-circle"></i></div>'+response.message+'</div>');
                $('.btn').attr('disabled', false);
            }
        
        }).fail(function(jqXHR,textStatus,errorThrown) {

        });
    });
  });