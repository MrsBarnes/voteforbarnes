document.addEventListener("DOMContentLoaded", function () {
    // 🟢 1. jQuery - bigbox/smallbox 관련 기능
    $(".bigboxes").hide();
    $("#firstbig").show();

    $(".smallbox div").mouseenter(function () {
        let smallId = $(this).attr("id");
        let bigId = smallId.replace("small", "big");

        $(".bigboxes").hide();
        $("#" + bigId).fadeIn(300);
    });

    // 🟢 2. Intersection Observer - 애니메이션 트리거
    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => document.getElementById("firstslogun")?.classList.add("animate"), 0);
                setTimeout(() => document.getElementById("secondslogun")?.classList.add("animate"), 1000);
                setTimeout(() => document.getElementById("thirdslogun")?.classList.add("animate"), 2000);
            }
        });
    }, { threshold: 0.5 });

    let thirdPage = document.querySelector("#thirdpage");
    if (thirdPage) observer.observe(thirdPage);

    // 🟢 3. 타이핑 효과
    function typeEffect(element, text, speed, callback) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        typing();
    }

    let andTxt = document.querySelector(".andtxt");
    let whyTxt = document.querySelector(".whytxt");

    if (andTxt && whyTxt) { // 요소가 존재하는 경우에만 실행
        let andTxtContent = "and";
        let whyTxtContent = "Why Bucky?";

        andTxt.textContent = "";
        whyTxt.textContent = "";

        setTimeout(() => {
            andTxt.classList.add("show");
            typeEffect(andTxt, andTxtContent, 150, () => {
                whyTxt.classList.add("show");
                typeEffect(whyTxt, whyTxtContent, 80);
            });
        }, 500);
    }
});

// 🟢 4. 모바일 화면 높이 조정 (주소창 문제 해결)
function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 초기 실행
setVh();

// resize 이벤트 최적화 (디바운스 적용)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setVh, 200);
});
