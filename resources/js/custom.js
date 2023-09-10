(function ($) {
    "use strict";

    var trp_online = {
        
        /* ============================================================ */
        /* PRELOADER
        /* ============================================================ */
        preloader: function(){
            $(window).on('load', function() {
                $(".preloader").fadeOut();     
            });
        },


        /* ============================================================ */
        /* Sidebar/Mobile Menu
        /* ============================================================ */
        sidebarMenu: function(){
            //Clone Mobile Menu
            function cloneMobileMenu($cloneItem, $mobileLoc) {
                var $combinedmenu = $($cloneItem).clone();
                $combinedmenu.appendTo($mobileLoc);
            }
            cloneMobileMenu(".nav-main .main-menu", ".sidebar-menu .main-menu");

            // Humbergur Menu Click and sidebar expanded
            $('.main-header .sidebar-toggle').on("click", function() {
                event.preventDefault();
                $('.sidebar-menu').toggleClass('expand-menu');
                $('body').toggleClass('expand-menu');
            });

            // Mobile Menu
            function mobileNav($selector, $parentSelector) {
                var $mobileNav = $($selector);
                $mobileNav.on("click", function() {
                    $($selector).toggleClass('expand-menu');
                });

                var $closeButton = $($parentSelector).find(".close-menu");
                $closeButton.each(function(){
                    var $self = $(this);
                    $self.on("click", function() {
                        $self.parent($parentSelector).toggleClass('expand-menu');
                        $('body').removeClass("expand-menu");
                    });
                });

                $(document).on('click', function(e) {
                    var $selectorType = $($parentSelector).add($mobileNav);
                    if ($selectorType.is(e.target) !== true && $selectorType.has(e.target).length === 0) {
                        $($parentSelector).removeClass("expand-menu");
                        $('body').removeClass("expand-menu");
                    }          
                });
            }
            mobileNav('.main-header .sidebar-toggle', '.sidebar-menu');
	

            $('.nav-main .main-menu ul.menu-bar li a, .sidebar-menu .close-menu').on('click', function(){
                $('.sidebar-menu').removeClass('expand-menu');
            });

            //Expanded Menu Submenu Toggle and SlideUp-Down
            $(document).ready(function(){
                $('.sidebar-menu .main-menu li.item-has-children > a').on('click', function() {
                    $('.sidebar-menu .main-menu li.item-has-children .mega-menu, .sidebar-menu .main-menu li.item-has-children .drop-menu').each(function() { 
                        if($(this).is(":visible")) { 
                            $(this).slideUp(); 
                        }
                    }); 
                    if($(this).parent('li').children('.mega-menu, .drop-menu').length) {
                        if(!$(this).parent('li').children('.mega-menu, .drop-menu').is(":visible")) { 
                            $(this).parent('li').children('.mega-menu, .drop-menu').slideToggle();
                        }
                        return false; 
                    }
                });
                $('.sidebar-menu .main-menu li.item-has-children .mega-menu-header').on('click', function() {
                    $('.sidebar-menu .main-menu li.item-has-children .mega-menu-column').each(function() { 
                        if($(this).is(":visible")) { 
                            $(this).slideUp(); 
                        }
                        return false; 
                    }); 
                    if($(this).siblings('.mega-menu-column').children('ul').length) {
                        if(!$(this).siblings('.mega-menu-column').children('ul').is(":visible")) {
                            $(this).siblings('.mega-menu-column').children('ul').slideToggle();
                        }
                    }
                });
            });
        },


        /* ============================================================ */
        /* Random
        /* ============================================================ */
        commonActivation: function(){
           
            // $('.prod-gallery-thumb').owlCarousel({
            //     items: 6,
            //     pagination: false,
            //     rewindNav: true,
            //     itemsTablet : [768, 4]
            // });

            // Popover Activation
            var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
            var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl)
            })


            // Credit Card Number Formation
            var formatCardNumber = $('.cc-number').length;
            if(formatCardNumber) {
                $('.cc-number').formatCardNumber();
            }



            /* ============================================================ */
            /* PRODUCT DETAILS CUSTOMER REVIEW RATING STAR
            /* ============================================================ */            
            // Visualizing things on Hover
            $('.rating-stars li').on('mouseover', function() {
                var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
                // Now highlight all the stars that's not after the current hovered star
                $(this).parent().children('li.star').each(function(e) {
                    if (e < onStar) {
                        $(this).addClass('hover');
                    } else {
                        $(this).removeClass('hover');
                    }
                });
            }).on('mouseout', function() {
                $(this).parent().children('li.star').each(function(e) {
                    $(this).removeClass('hover');
                });
            });
            // Action to perform on click 
            $('.rating-stars li').on('click', function() {
                var onStar = parseInt($(this).data('value'), 10); // The star currently selected
                var stars = $(this).parent().children('li.star');

                for ( var i = 0; i < stars.length; i++) {
                    $(stars[i]).removeClass('selected');
                }

                for ( var i = 0; i < onStar; i++) {
                    $(stars[i]).addClass('selected');
                }
            });
           

            // Product Details Navigation Menu Sticky
            var sticky_prod_navigation = $(".product-description .navigation");
            if(sticky_prod_navigation.length) {
                $(function() {
                    var navPos = sticky_prod_navigation.position().top;            
                    $(window).scroll(function() {    
                        if(navPos>0 && $(window).scrollTop()>navPos) {              
                            $(".navigation").addClass("sticky-top");
                        } else {
                            $(".navigation").removeClass("sticky-top");
                        }
                    });
                });                
            }
        },

        /* ============================================================ */
        /* Banner Slider
        /* ============================================================ */
        bannerSlider: function() {
            var bannerSlider = $('.banner-slider');
            bannerSlider.owlCarousel({
                items: 1,
                loop: 1,
                dots: 1,
                nav: !1,
                autoplay: 1,
                autoplaySpeed: 800,
                autoplayTimeout: 10000,
            });
        },
        /* ============================================================ */
        /* Featured Product slider
        /* ============================================================ */
        productSlider: function() {

            // Product Single Sidebar Suggested Product Slider
            var ps_s_sug_prod = $('.product-description .suggested-products .product-slider');
            ps_s_sug_prod.owlCarousel({
                items: 1,
                loop: !1,
                dots: !1,
                nav: !1,
                margin: 20,
                autoplay: 1,
                autoplaySpeed: 800,
                autoplayTimeout: 10000,
            }); 

            // Product Single Suggested Product Slider
            var sugg_productSlider = $('.suggested-buy .product-slider');
            sugg_productSlider.owlCarousel({
                items: 1,
                loop: !1,
                dots: 1,
                nav: !1,
                margin: 20,
                autoplay: 1,
                autoplaySpeed: 800,
                autoplayTimeout: 10000,
                responsive: {
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3,
                    },
                    992: {
                        items: 4,
                    },
                    1200: {
                        items: 5,
                    }
                }
            }); 

            // hoempage Featured Product Slider
            var productSlider = $('.product-slider');
            productSlider.owlCarousel({
                items: 1,
                loop: 1,
                dots: 1,
                nav: !1,
                margin: 20,
                autoplay: !1,
                autoplaySpeed: 800,
                autoplayTimeout: 10000,
                responsive: {
                    768: {
                        items: 2,
                        nav: !1
                    },
                    992: {
                        items: 3,
                        nav: 1,
                        dots: !1
                    },
                    1200: {
                        items: 4,
                        nav: 1,
                        dots: !1
                    }
                }
            });
            
            $('.brands-slider').slick({
                rows: 1,
                dots: false,
                arrows: true,
                infinite: true,
                speed: 300,
                slidesToShow: 5,
                slidesToScroll: 1,
                prevArrow: '<button class="slide-arrow prev-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/> </svg></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/> </svg></button>',
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            arrows: true,
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            arrows: false,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            arrows: false,

                        }
                    }  
                ]
            });

            // Product Quick View Modal Gallery
            $('.main-image-holder').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                infinite: true,
                speed: 300,
                asNavFor: '.gallery-nav',
            });

            $('.gallery-nav').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '.main-image-holder',
                dots: false,
                centerMode: false,
                focusOnSelect: true,
                autoplay: false,
            });

            $('.modal').on('shown.bs.modal', function (e) {
                // Run Slick Slider on Modal
                $('.main-image-holder, .gallery-nav').slick('setPosition');
              
            });                        
        },

        /* ============================================================ */
        /* ElevateZoom
        /* ============================================================ */
        elevateZoom: function() {
            var image = $('.product-image img');
            //var zoomConfig = {};
            var zoomActive = false;
            
            zoomActive = !zoomActive;
            if(zoomActive) {
                if ($(image).length > 0){
                    $(image).elevateZoom({
                        cursor: "crosshair",
                        easing : true, 
                        gallery:'pr_item_gallery',
                        galleryActiveClass: "active",
                        // zoomType: "inner",
                        // scrollZoom : true
                    }); 
                }
            }
            else {
                $.removeData(image, 'elevateZoom');//remove zoom instance from image
                $('.zoomContainer:last-child').remove();// remove zoom container from DOM
            }
        },
        /* ============================================================ */
        /* Light Gallery
        /* ============================================================ */
        lightGallery: function() {
            // Product Review image popup
            $(".review-item .images").lightGallery({
                selector: '.zoom',
                share: false,
                download: false
            });
            $(".file-preview").lightGallery({
                selector: '.zoom',
                share: false,
                download: false,
                thumbnail: false,
            });
            $(".ticket-details .attachment").lightGallery({
                selector: '.zoom',
                share: false,
                download: false,
                thumbnail: false,
            });
        },

        /* ============================================================ */
        /* Testimonial Carousel
        /* ============================================================ */
        testimonial_carousel: function() {
            
            var testimonial_slider = $('.testimonial-carousel ');
            testimonial_slider.owlCarousel({
                items: 1,
                loop: 1,
                dots: 1,
                nav: !1,
                autoplay: 1,
                autoplaySpeed: 1000,
                autoplayTimeout: 8000,
                margin: 30,
            });
        },

        /* ============================================================ */
        /* Sticky Menu
        /* ============================================================ */
        sticky_menu: function() {
            var fixed_top = $(".site-header");
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 100) {
                    fixed_top.addClass("is-sticky");
                } else {
                    fixed_top.removeClass("is-sticky");
                }
            });


            // var sticky_dsc_nav = $(".product-description .navigation");
            // $(window).on('scroll', function () {
            //     if ($(this).scrollTop() > 1000) {
            //         sticky_dsc_nav.addClass("is-sticky");
            //     } else {
            //         sticky_dsc_nav.removeClass("is-sticky");
            //     }
            // });
        },

        /* ============================================================ */
        /* Scroll Top
        /* ============================================================ */
        scroll_to_top: function() {
            $('body').append(
                "<a href='#top' id='scroll-top' class='topbutton btn-hide'><span class='fas fa-level-up-alt'></span></a>"
            );
            var $scrolltop = $('#scroll-top');
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > $(this).height()) {
                    $scrolltop.addClass('btn-show').removeClass('btn-hide');
                } else {
                    $scrolltop.addClass('btn-hide').removeClass('btn-show');
                }
            });
            $("a[href='#top']").on('click', function () {
                $('html, body').animate(
                    {
                        scrollTop: 0,
                    },
                    'normal'
                );
                return false;
            });
        },


        /* ============================================================ */
        /* Background Image
        /* ============================================================ */
        background_image: function() {
            $("[data-bg-color], [data-bg-image], [data-bg-particles]").each(function() {
                var $this = $(this);
    
                if( $this.hasClass("pt-separate-bg-element") ){
                    $this.append('<div class="pt-background">');
    
                    // Background Color    
                    if( $("[data-bg-color]") ){
                        $this.find(".pt-background").css("background-color", $this.attr("data-bg-color") );
                    }
    
                    // Background Image
                    if( $this.attr("data-bg-image") !== undefined ){
                        $this.find(".pt-background").append('<div class="pt-background-image">');
                        $this.find(".pt-background-image").css("background-image", "url("+ $this.attr("data-bg-image") +")" );
                        $this.find(".pt-background-image").css("background-size", $this.attr("data-bg-size") );
                        $this.find(".pt-background-image").css("background-position", $this.attr("data-bg-position") );
                        $this.find(".pt-background-image").css("opacity", $this.attr("data-bg-image-opacity") );
    
                        $this.find(".pt-background-image").css("background-size", $this.attr("data-bg-size") );
                        $this.find(".pt-background-image").css("background-repeat", $this.attr("data-bg-repeat") );
                        $this.find(".pt-background-image").css("background-position", $this.attr("data-bg-position") );
                        $this.find(".pt-background-image").css("background-blend-mode", $this.attr("data-bg-blend-mode") );
                    }
    
                    // Parallax effect    
                    if( $this.attr("data-bg-parallax") !== undefined ){
                        $this.find(".pt-background-image").addClass("pt-parallax-element");
                    }
                }
                else {
    
                    if(  $this.attr("data-bg-color") !== undefined ){                        
                        $this.css("background-color", $this.attr("data-bg-color") );
                        if( $this.hasClass("btn") ) {
                            $this.css("border-color", $this.attr("data-bg-color"));
                        }
                    }
    
                    if( $this.attr("data-bg-image") !== undefined ){
                        $this.css("background-image", "url("+ $this.attr("data-bg-image") +")" );    
                        $this.css("background-size", $this.attr("data-bg-size") );
                        $this.css("background-repeat", $this.attr("data-bg-repeat") );
                        $this.css("background-position", $this.attr("data-bg-position") );
                        $this.css("background-blend-mode", $this.attr("data-bg-blend-mode") );
                    }
                }
            });
        },


        initializ: function() {
			trp_online.preloader();
			trp_online.sidebarMenu();
			trp_online.elevateZoom();
			trp_online.commonActivation();
			trp_online.bannerSlider();
			trp_online.productSlider();
			trp_online.testimonial_carousel();
			trp_online.sticky_menu();
			trp_online.lightGallery();
			trp_online.background_image();
		}

    };
    $(function() {
		trp_online.initializ();
	});


})(jQuery);