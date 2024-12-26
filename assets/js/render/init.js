document.addEventListener("DOMContentLoaded", function () {
    pageTransition();
    const lenis = new Lenis({
        autoRaf: true,
    });
    initBarbaTransitions();

    if (innerWidth >= 992) {
        scrollTextX();
        initCursorFollower();
    }

    if (innerWidth <= 991) {
        scrollTextMobile();
    }

    setupSplits();
    scrollBannerXX();
    imageMove();
    fadeInUp();

    includeSVG('#title-contact', 'assets/img/contact.svg');
    includeSVG('#title-about', 'assets/img/about.svg');
});