for(i=0; i<2; i++){
    $("footer .about_img_d").first().clone().appendTo(".flower");
    $("footer .about_img_e").first().clone().appendTo(".flower");
    $("footer .about_img_a").first().clone().appendTo(".cloud");
    $("footer .about_img_b").first().clone().appendTo(".cloud");
}

const foot_ani = document.querySelectorAll(".flower img:nth-child(2n-1)");
const foot_ani_b = document.querySelectorAll(".flower img:nth-child(2n)");

gsap.to(foot_ani,{
    rotate:360,
    repeat:-1,
    ease: "back.out(1.7)",
    duration:10,
})
gsap.to(foot_ani_b,{
    rotate:-360,
    repeat:-1,
    ease: "back.out(1.7)",
    duration:15,
})