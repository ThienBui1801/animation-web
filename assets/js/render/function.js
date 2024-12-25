(function () {
    gsap.registerPlugin(ScrollTrigger);

    function delay(n) {
        n = n || 2000;
        return new Promise(done => {
            setTimeout(() => {
                done();
            }, n);
        });
    }

    function initCursorFollower() {
        const cursorFollower = document.querySelector('.cursor-follower');
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 1,
                ease: 'power3.out'
            });
        });
        ScrollTrigger.create({
            trigger: 'html',
            start: 'top center',
            onEnter: () => {
                gsap.to(cursorFollower, {
                    width: 40,
                    height: 40,
                    backgroundColor: 'rgba(255, 0, 0, 0.8)',
                    duration: 0.2
                });
            },
            onLeave: () => {
                gsap.to(cursorFollower, {
                    width: 20,
                    height: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    duration: 0.2
                });
            },
            onEnterBack: () => {
                gsap.to(cursorFollower, {
                    width: 40,
                    height: 40,
                    backgroundColor: 'rgba(255, 0, 0, 0.8)',
                    duration: 0.2
                });
            },
            onLeaveBack: () => {
                gsap.to(cursorFollower, {
                    width: 20,
                    height: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    duration: 0.2
                });
            }
        });

        document.querySelectorAll('[data-cursor]').forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (element.dataset.cursor === 'logo') {
                    gsap.to(cursorFollower, {
                        width: 40,
                        height: 40,
                        borderRadius: 0,
                        backgroundColor: 'rgba(0, 0, 255, 0.8)',
                        duration: 0.2
                    });

                    const logoRect = element.getBoundingClientRect();
                    const logoCenterX = logoRect.left + logoRect.width / 2;
                    const logoCenterY = logoRect.top + logoRect.height / 2;

                    document.addEventListener('mousemove', moveCursorWithinLogo);

                    function moveCursorWithinLogo(e) {
                        const offsetX = Math.min(Math.max(e.clientX - logoCenterX, -20), 20);
                        const offsetY = Math.min(Math.max(e.clientY - logoCenterY, -20), 20);

                        gsap.to(cursorFollower, {
                            x: logoCenterX + offsetX,
                            y: logoCenterY + offsetY,
                            duration: 1,
                            ease: 'power3.out'
                        });
                    }

                    element.addEventListener('mouseleave', () => {
                        document.removeEventListener('mousemove', moveCursorWithinLogo);
                        gsap.to(cursorFollower, {
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            duration: 1
                        });
                    }, {
                        once: true
                    });
                }
            });
        });
    }

    
    
    window.delay = delay;
    window.initCursorFollower = initCursorFollower;
})();