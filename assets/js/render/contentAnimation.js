(function () {
    gsap.registerPlugin(ScrollTrigger);

    function contentAnimation() {
        let tl = gsap.timeline();

        tl.to("h1", {
            duration: 1,
            opacity: 1,
            ease: "power3.inOut",
            delay: 1,
        });
    }

    function scrollText() {
        const blocks = document.querySelectorAll('.block');
        const titleElement = document.querySelector('.title');

        blocks.forEach((block) => {
            ScrollTrigger.create({
                trigger: block,
                start: "top 100%",
                end: "bottom 100%",
                scrub: 2,
                markers: true,
                onEnter: () => {
                    updateTitle(block.dataset.title);
                },
                onEnterBack: () => {
                    updateTitle(block.dataset.title);
                }
            });
        });

        function updateTitle(newTitle) {
            if (titleElement.textContent !== newTitle) {
                titleElement.textContent = newTitle;
            }
        }
    }

    function scrollTextMobile() {
        const blocks = document.querySelectorAll('.block-mobile');
        const titleMobileElement = document.querySelector('.title-mobile');

        if (blocks.length > 0) {
            const firstTitle = blocks[0].dataset.title;
            ScrollTrigger.create({
                trigger: blocks[0],
                start: "top 100%",
                end: "bottom 100%",
                scrub: 2,
                markers: true,
                onEnter: () => {
                    if (titleMobileElement) {
                        titleMobileElement.textContent = firstTitle;
                        titleMobileElement.style.opacity = 1;
                    }
                },
                onLeave: () => {
                    if (titleMobileElement) {
                        titleMobileElement.style.opacity = 0;
                    }
                },
                onEnterBack: () => {
                    if (titleMobileElement) {
                        titleMobileElement.textContent = firstTitle;
                        titleMobileElement.style.opacity = 1;
                    }
                },
                onLeaveBack: () => {
                    if (titleMobileElement) {
                        titleMobileElement.style.opacity = 0;
                    }
                }
            });
        };

        function updateTitle(newTitle) {
            titleMobileElement.textContent = newTitle;
        }
    }

    function setupSplits() {
        const targets = document.querySelectorAll(".split-text");

        targets.forEach((target) => {
            // Lấy nội dung gốc và tách thành từng từ
            const text = target.textContent.trim();
            const words = text.split(/\s+/); // Tách theo khoảng trắng
            target.innerHTML = ""; // Xóa nội dung gốc

            // Bọc từng từ trong <span>
            words.forEach((word) => {
                const span = document.createElement("span");
                span.textContent = word;
                span.style.display = "inline-block"; // Hiển thị như một khối
                span.style.opacity = 0; // Bắt đầu từ ẩn
                span.style.transform = "translateY(10px)"; // Vị trí ban đầu
                span.style.marginRight = "0.3em"; // Khoảng cách giữa các từ
                target.appendChild(span);
            });

            // Tạo Intersection Observer
            const observer = new IntersectionObserver(
                ([entry], observer) => {
                    if (entry.isIntersecting) {
                        // Khi phần tử xuất hiện, chạy animation
                        const spans = target.querySelectorAll("span");
                        spans.forEach((span, index) => {
                            setTimeout(() => {
                                span.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                                span.style.opacity = 1;
                                span.style.transform = "translateY(0)";
                            }, index * 50); // Độ trễ 100ms giữa các từ
                        });

                        // Ngừng quan sát sau khi chạy xong
                        observer.unobserve(target);
                    }
                },
                { threshold: 0.1 } // Kích hoạt khi 10% của phần tử xuất hiện
            );

            observer.observe(target);
        });
    }

    function includeSVG(sectionToShow, svgURL) {
        var svgContainer = document.querySelector(sectionToShow);
        if (svgContainer) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', svgURL, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var newSVG = xhr.responseText;
                    svgContainer.insertAdjacentHTML('beforeend', newSVG);
                    var svgDoc = svgContainer.querySelector('svg');
                    var paths = svgDoc.querySelectorAll('.path-class, #path-id');
                }
            };
            xhr.send();
        }
    }

    window.contentAnimation = contentAnimation;
    window.scrollText = scrollText;
    window.setupSplits = setupSplits;
    window.includeSVG = includeSVG;
    window.scrollTextMobile = scrollTextMobile;
})();
