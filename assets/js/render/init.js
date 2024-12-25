document.addEventListener("DOMContentLoaded", function () {
    pageTransition();
    const lenis = new Lenis({
        autoRaf: true,
    });
    initCursorFollower();
    initBarbaTransitions();

    if (innerWidth >= 992) {
        scrollTextX();
    }
    
    scrollTextMobile();
    setupSplits();
    scrollBannerXX();
    imageMove();

    includeSVG('#title-contact', 'assets/img/contact.svg');
    includeSVG('#title-about', 'assets/img/about.svg');
});