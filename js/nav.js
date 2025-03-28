$('#nav li a').click(function(){
    event.preventDefault(); // 기본 동작(페이지 새로고침) 막기
});

// 내비게이션 클릭 이벤트
document.querySelectorAll('#nav ul li a').forEach(item => {
    item.addEventListener('click', function() {
        lenis.stop();
        
        const targetId = this.getAttribute('data-target'); // 섹션 ID 가져오기
        gsap.to(window, {
            scrollTo: { y: `#${targetId}`}, // 해당 섹션으로 스크롤
            duration: 1, // 스크롤 애니메이션 시간
            ease: "power2.out", // 부드러운 스크롤 효과
            onComplete: () => {
                lenis.start();
            }
        });
    });
});


gsap.registerPlugin(ScrollTrigger);

// 모든 섹션에 ScrollTrigger 설정
document.querySelectorAll('section').forEach(section => {
    const targetId = section.getAttribute('id'); // 섹션 ID 가져오기

    ScrollTrigger.create({
        trigger: section,
        start: "top 5%", // 섹션의 상단이 뷰포트 25%에 닿을 때
        end: "bottom 5%", // 섹션의 하단이 뷰포트 75%에 닿을 때
        onEnter: () => setActiveNav(targetId), // 섹션이 뷰포트에 들어올 때
        onEnterBack: () => setActiveNav(targetId), // 섹션으로 다시 돌아올 때
        onLeave: () => clearActiveNav(targetId), // 섹션을 떠날 때
        onLeaveBack: () => clearActiveNav(targetId), // 뒤로 스크롤하여 떠날 때
    });
});

// 활성화 상태 추가 함수
function setActiveNav(targetId) {
    document.querySelectorAll('#nav ul li a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-target') === targetId);
    });
}

// 활성화 상태 제거 함수
function clearActiveNav(targetId) {
    document.querySelectorAll('#nav ul li a').forEach(link => {
        if (link.getAttribute('data-target') === targetId) {
            link.classList.remove('active');
        }
    });
}


const nav_ani = gsap.timeline();
const nav_pos = gsap.timeline();
const logo_ani = gsap.timeline();
let pos = document.querySelector("#nav");
let nav = document.querySelector("#nav > div");
let logo = document.querySelector("#nav h1 a");






ScrollTrigger.create({
    animation: nav_ani,
    trigger: "#main",
    start: "top",
    end: "bottom 95%",
    onEnterBack: function(){
        nav_pos.to(pos, {
            yPercent: 0,
        });
        if(window.innerWidth > 820){
            nav_ani.to(nav, {
                width: "90%",
            });
        }else if(window.innerWidth <= 820 || window.innerWidth >= 413){
            nav_ani.to(nav, {
                width: "85%",
            });
        }
        if(window.innerWidth > 1180){
            logo_ani.to(logo, {
                width: `150px`,
                onComplete: () => {
                    $("#nav > div h1 a").attr("style","")
                }
            });
        }else if(window.innerWidth <= 1180 && window.innerWidth > 413){
            logo_ani.to(logo, {
                width: `120px`,
                onComplete: () => {
                    $("#nav > div h1 a").attr("style","")
                }
            });
        }else if(window.innerWidth <= 412){
            logo_ani.to(logo, {
                width: `40px`,
                onComplete: () => {
                    $("#nav > div h1 a").attr("style","")
                }
            });
        };
    },
    onLeave: function(){
        nav_pos.to(pos, {
            yPercent: 50,
        });
        nav_ani.to(nav, {
            width: "95%",
        });
        if(window.innerWidth > 820){
            logo_ani.to(logo, {
                width: `100px`,
            });
        }else if(window.innerWidth <= 820 && window.innerWidth > 413){
            logo_ani.to(logo, {
                width: `80px`,
            });
        }else if(window.innerWidth <= 413){
            logo_ani.to(logo, {
                width: `40px`,
            });
        };
    },
});

$("h1 a").click(function(){
    gsap.to(window,{
        scrollTo: { y: 0 },
        duration: 0, // 즉시 이동 (부드러운 스크롤 제거)
        onStart: () => {
            lenis.stop();
        },
        onComplete: () => {
            lenis.start();
        }
    });
    location.reload();
});

window.onbeforeunload = function () {
    gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 0, // 즉시 이동 (부드러운 스크롤 제거)
        onStart: () => {
            lenis.stop();
        },
        onComplete: () => {
            lenis.start();
        }
    });
};

