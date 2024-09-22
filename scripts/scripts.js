$(() => {

    new WOW().init();

    const burger = $('#burger');
    const sidebar = $('#sidebar');
    const closeMenu = $('#close-menu');
    const callOrder = $('.call-btn');
    const knowMore = $('#know-more');
    const descriptionButton = $('.description-button');
    const getConsultation = $('.get-consultation');
    const galleryItems = $('.gallery-items-hide');
    const showMore = $('#show-more');
    const firstOpen = $('#first-open');
    const download = $('.button-download');
    const inputNameConsultation = $('#input-name-consultation');
    const inputPhoneConsultation = $('#input-phone-consultation');
    const errorInput = $('.error-input');
    const getConsultationInfo = $('#get-consultation-info');
    const orderSuccessConsultation = $('#order-success-consultation');
    const inputNameExcursion = $('#input-name-excursion');
    const inputPhoneExcursion = $('#input-phone-excursion');
    const orderSuccessExcursion = $('#order-success-excursion');
    const tooltipButtons = $('.tooltip-button');
    const toolTips = $('.tooltip');

    $(document).click(function (event) {
        const pointers = $('.pointer');
        if (!pointers.toArray().some(pointer => pointer.contains(event.target))) {
            toolTips.hide;
        }
    })

    tooltipButtons.click(function (event) {
        toolTips.hide();
        const tooltip = $(event.target).find('.tooltip');
        tooltip.show();
    })


    burger.click(function () {
        sidebar.css({
            display: 'flex',
        });
        closeMenu.click(function () {
            sidebar.css({
                display: 'none',
            });
        });
    });

    callOrder.click(function () {
        getConsultation[0].scrollIntoView({behavior: 'smooth'});
    });

    knowMore.click(function () {
        getConsultation[0].scrollIntoView({behavior: 'smooth'});
    });

    descriptionButton.click(function () {
        getConsultation[0].scrollIntoView({behavior: 'smooth'});
    });

    showMore.click(function () {
        galleryItems.css({
            display: 'flex',
        });
        firstOpen[0].scrollIntoView({behavior: 'smooth'});
        showMore.hide();
    });

    $('.open-popup').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom',
        zoom: {
            enabled: true,
            duration: 400,
            easing: 'ease-in-out',
            opener: function (openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });

    download.click(function () {
        let fileUrl = 'files/constructive_solution.pdf';
        let link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl;
        link.click();
    });


    $(".house-slide").slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0",
        prevArrow: $('.slider-prev'),
        nextArrow: $('.slider-next'),
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: false,
                    nextArrow: false,
                }
            }
        ]
    });

    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true
    });

    $("#button-get-consultation").click(onConsultation);

    inputNameConsultation.on('keydown', () => {
        if (inputNameConsultation.val()) {
            inputNameConsultation.removeClass('input-error');
            errorInput.hide();
        }
    });

    inputPhoneConsultation.on('keydown', () => {
        if (inputPhoneConsultation.val()) {
            inputPhoneConsultation.removeClass('input-error');
            errorInput.hide();
        }
    });


    function onConsultation(e) {
        e.preventDefault();

        errorInput.hide();
        orderSuccessConsultation.hide();
        let hasError = false;
        if (!inputNameConsultation.val()) {
            inputNameConsultation.addClass('input-error');
            inputNameConsultation.next().show();
            hasError = true;
        }
        if (!inputPhoneConsultation.val()) {
            inputPhoneConsultation.css({
                border: '2px solid red',
            });
            inputPhoneConsultation.next().show();
            hasError = true;
        }
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: inputNameConsultation.val(), phone: inputPhoneConsultation.val()}
            })
                .done(function (message) {
                    if (message.success) {
                        getConsultationInfo.hide();
                        orderSuccessConsultation.show();
                    } else {
                        alert('Возникла ошибка при заполнении формы. Повторите попытку.')
                    }
                });
        }
    };

    $("#form-action-popup").click(onExcursion);

    inputNameExcursion.on('keydown', () => {
        if (inputNameExcursion.val()) {
            inputNameExcursion.removeClass('input-error');
            errorInput.hide();
        }
    });

    inputPhoneExcursion.on('keydown', () => {
        if (inputPhoneExcursion.val()) {
            inputPhoneExcursion.removeClass('input-error');
            errorInput.hide();
        }
    });

    function onExcursion(e) {
        e.preventDefault();

        errorInput.hide();
        orderSuccessExcursion.hide();
        let hasError = false;
        if (!inputNameExcursion.val()) {
            inputNameExcursion.css({
                border: '2px solid red',
            });
            inputNameExcursion.next().show();
            hasError = true;
        }
        if (!inputPhoneExcursion.val()) {
            inputPhoneExcursion.css({
                border: '2px solid red',
            });
            inputPhoneExcursion.next().show();
            hasError = true;
        }
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: inputNameExcursion.val(), phone: inputPhoneExcursion.val()}
            })
                .done(function (messagePopup) {
                    if (messagePopup.success) {
                        $('.excursion-popup').hide();
                        orderSuccessExcursion.show();
                    } else {
                        alert('Возникла ошибка при заполнении формы. Повторите попытку.')
                    }
                });
        }
    };

})