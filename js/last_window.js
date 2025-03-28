const rolls = document.querySelectorAll(".roll");

rolls.forEach(rotate =>{
    gsap.to(rotate, {
        rotate: 360,
        duration: 10,
        repeat: -1, // 무한 반복
        ease: "linear", // 부드러운 회전
    });
})

const rolls_opp = document.querySelector(".roll_opp");

gsap.to(rolls_opp, {
    rotate: -360,
    duration: 20,
    repeat: -1, // 무한 반복
    ease: "linear", // 부드러운 회전
});





let f = 0; // 상태 값 초기화
let cc = document.querySelector(".left_bottom"); // ScrollTrigger 트리거 요소


$("#window").click(function () {
    f = 1;
    document.dispatchEvent(new Event("updateF")); // 커스텀 이벤트 발생
});

// #end_window 클릭 이벤트: f 값에 따라 동작
$("#end_window").click(function () {
    if (f === 0) {
        lenis.stop();
        if (isAnimating) return;

        isAnimating = true;

        wind.pause()

        gsap.fromTo(".window",{
            rotate:0,
            y:0,
            xPercent:0,
        },{
            rotate:0,
            y:0,
            xPercent:80,
            duration:2.5,
            ease: "power4.out",
            onComplete: () => {
                isAnimating = false; // 애니메이션이 끝난 후 다시 실행 가능
                gsap.to(window, {
                    scrollTo: { y: 0 },
                    duration: 1, // 애니메이션 지속 시간 (1초)
                    ease: "power2.out", // 부드러운 스크롤 효과
                    onComplete: () => {
                        setTimeout(function () {
                            // 첫 번째 텍스트 변경 + 애니메이션
                            gsap.to(".My_name p", {
                                opacity: 0,
                                duration: 0.5,
                                onComplete: function () {
                                    $(".My_name p").text("Thank you");
                                    gsap.to(".My_name p", { opacity: 1, duration: 0.5 });
                                }
                            });
                        });

                        setTimeout(function () {
                            // 두 번째 텍스트 변경 + 애니메이션
                            gsap.to(".window_text p", {
                                opacity: 0,
                                duration: 0.5,
                                onComplete: function () {
                                    $(".window_text p").text("So much~~");
                                    gsap.to(".window_text p", { opacity: 1, duration: 0.5 });
                                }
                            });
                        },500);

                        setTimeout(function(){// 창문 사라지는 애니메이시션
                            $(".window_area").fadeOut({
                                duration: 1000,
                                easing: "easeOutExpo",
                            });
                        },2000);
                    
                        setTimeout(function(){// 배경 나타나는 애니메이시션
                            $(".image_area").fadeIn({
                                duration: 3000,
                                easing: "easeOutSine",
                            });
                        },2100);
                        lenis.start();
                        f = 1; // 상태 값 초기화 (이미 0이지만 명시적으로 유지)
                        document.dispatchEvent(new Event("updateF")); // 상태 값 업데이트 이벤트 발생
                    }
                });
            }
        });
        // f가 0일 때만 실행
        
        
    }
});

document.addEventListener("updateF", () => {
    if (f > 0) { //클릭하면
        $(".left_top p").html("With deep thoughts<br> and <br>good ideas")
        $(".left_bottom p").html("See you again~~")
        $(".left_bottom").css("font-size","7vw")
        gsap.fromTo(".window", {
            rotate:0,
            y:0,
            xPercent:80,
        },{
            xPercent: 0,
            rotate:0,
            y:0,
            duration: 2.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: cc,
                start: "top 5%",
                end: "bottom 5%",
                markers: false,
            },
            onStart: () => {
                $(".window_area").css({"display":"flex","opacity":"1"});
                $(".image_area").css("display","none");
            },
            onComplete: () => {
                isAnimating = false; // 애니메이션이 끝난 후 다시 실행 가능
            }
        });
    }
});

// 페이지 로드 시 기본 동작 (f === 0 상태)
document.dispatchEvent(new Event("updateF")); // 초기 상태에서도 실행
