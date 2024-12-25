document.addEventListener("DOMContentLoaded", function () {
    pageTransition();
    const lenis = new Lenis({
        autoRaf: true,
    });
    initCursorFollower();
    initBarbaTransitions();

    if (innerWidth >= 992) {
        scrollText();
    }
    
    scrollTextMobile();
    setupSplits();

    includeSVG('#title-contact', 'assets/img/contact.svg');
    includeSVG('#title-about', 'assets/img/about.svg');
});