(function () {
    function pageTransition(){
        let tl = gsap.timeline();
    
        tl.to(".transition", {
            duration: 0.5,
            scaleY:1,
            transformOrigin: "bottom",
            ease: "power4.inOut"
        });
    
        tl.to(".transition", {
            duration: 0.5,
            scaleY:0,
            transformOrigin: "top",
            ease: "power4.inOut",
            delay: 0.3
        });
    }

    function initBarbaTransitions() {
        barba.init({
            sync: true,
            transitions: [{
                async leave(data) {
                    const done = this.async();
                    pageTransition();
                    await delay(500);
                    done();
                },
    
                async enter(data) {
                    contentAnimation();
                },
    
                async once(data) {
                    contentAnimation();
                }
            }]
        });
    }

    window.pageTransition = pageTransition;
    window.initBarbaTransitions = initBarbaTransitions;
})();
