// 텍스트 쪼게기
document.querySelectorAll(".text_area p").forEach(text => {
    let theText = text.innerText;
    let newText = "";

    for(i=0; i<text.innerText.length; i++){
        newText += "<span aria-hidden='true'>";
        if(text.innerText[i] == " "){
            newText += "&nbsp";
        }else{
            newText += text.innerText[i];
        }
        newText += "</span>";
    }
    text.innerHTML = newText;
    text.setAttribute("aria-label",theText);
    console.log(theText);
});

const text_ani_01 = gsap.timeline();
    
for(q=0; q < $(".text_ani_01 p span").length; q++){
    text_ani_01.from($(`.text_ani_01 p span:eq(${q})`),{yPercent: 30,autoAlpha: 0, duration: 3})
    .from($(`.text_ani_01 p span:eq(${q})`),{yPercent: 0})
}

ScrollTrigger.create({
    animation: text_ani_01,
    trigger: ".text_ani_01",
    start:"top 5%",
    end: "+=1000",
    scrub: true,
    pin: true,
    anticipatePin: 1,
});


const text_ani_02 = gsap.timeline();

const paragraphs = $(".text_ani_02 p");

paragraphs.each(function () {
    const p = $(this)
    const spans = $(this).find("span"); // 현재 문단(p) 내의 span 요소만 선택

    spans.each(function () {
        const target = $(this); // 현재 span 요소

        // GSAP 애니메이션 적용
        text_ani_02.from(target, {
            autoAlpha: 0, 
            yPercent: 50,
            scale:2
        })
        .from(target, {
            yPercent: 0,
        });
        
    });
    text_ani_02.to(p, {
        autoAlpha: 0,
        yPercent: -20,
        scale: 0.5,
        duration: 2,
    })
});

ScrollTrigger.create({
    animation: text_ani_02,
    trigger: ".text_ani_02",
    start:"top",
    end: "+=5000",
    scrub: true,
    pin: true,
    anticipatePin: 1,
});