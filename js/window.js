// 창문 덜컹거림 애니매이션
let wind = gsap.timeline({
    yoyo:true,
    repeat:-1,
    defaults : {
        duration:0.3
    }
});

wind.to(".window",{
    y:-9,
    rotate:4,
    ease: "back.out(1.7)",
});
wind.to(".window",{
    rotate:-3,
});
wind.to(".window",{
    y:5,
    rotate:4,
    ease: "back.out(1.7)",
});
// //창문 덜컹거림 애니매이션


// 창문 열고 배경 나타내는 애니매이션
let isAnimating = false;

$("#main .window").click(function(){
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
    });
    gsap.to(".window_area",{
        opacity:0,
        delay:1,
        duration:2.5,
        ease: "power4.out",
    })

    setTimeout(function(){// 창문 사라지는 애니메이시션
        $(".window_area").fadeOut({
            duration: 2000,
            easing: "easeOutExpo",
        });
    },1700);


    setTimeout(function(){// 배경 나타나는 애니메이시션
        $(".image_area").fadeIn({
            duration: 3000,
            easing: "easeOutSine",
        });
    },1800);
});

// //창문 열고 배경 나타내는 애니매이션




    
