//PAGE READY
$(document).ready(()=>{
    //DECLARING VARIABLES
    let show = true;
    let active = true;
    let timer;
    let intervalWave, intervalEffects , intervalEffects2, intervalArrow;
    let item1= document.getElementById("menu-item-1");
    let item2= document.getElementById("menu-item-2");
    let item3= document.getElementById("menu-item-3");
    let item4= document.getElementById("menu-item-4");
    //CALLING TEMPORAL EFFECTS
    clearInterval(intervalWave);
    tempEffects();
    //DETECTING SCROLL
    let showArrow=true;
    $(window).scroll(()=>{
        if(window.scrollY>300){
            if(showArrow){
                $(".menu-hover p").animate({
                    top:'20px',
                    opacity:'0'
                },300,()=>{
                    setTimeout(()=>{
                        $(".menu-hover p").empty();
                        $(".arrow-container").show();
                        $(".menu-hover p").html("¡DOBLE CLICK ME!");        
                        $(".menu-hover p ").animate({
                            top:'0px',
                            opacity:'1',
                        },250);
                        $(".menu-hover .arrow-container").animate({
                            top:'0px',
                            opacity:'1',
                        },490);
                    },200)
                });
                showArrow=false;
            }
        }
        else{
            if(!showArrow){
                fadeElement(".menu-hover p","¡I'M THE MENU!");
                $(".menu-hover .arrow-container").animate({
                    top:'20px',
                    opacity:'0'
                },300).hide(300)
                showArrow=true;
            }
        }
    });
    //IF THE PAGE IS RELOADED ON A PIXEL HIGHER THAN 301, THEN THE ARROW APEARS
    if(window.scrollY>=300){
        $(".menu-hover p").animate({
            top:'20px',
            opacity:'0'
        },300,()=>{
            setTimeout(()=>{
                $(".menu-hover p").empty();
                $(".arrow-container").show();
                $(".menu-hover p").html("¡DOBLE CLICK ME!");        
                $(".menu-hover p").animate({
                    top:'0px',
                    opacity:'1',
                },250);
                $(".arrow-container").animate({
                    top:'0px',
                    opacity:'1',
                },490);
            },200)
        });
        showArrow=false;
    }
    //MENU-HOVER EVENTS
    $(".menu-hover").on({
        'click': ()=>{
            if(active){
                timer = setTimeout(()=>{
                    if(show){
                        fadeInMenu();
                        if(window.scrollY<=300)
                            fadeElement(".menu-hover p","¡ENJOY!");
                        show=false;
                    }else{
                        fadeOutMenu();
                        if(window.scrollY<=300)
                            fadeElement(".menu-hover p","¡I'M THE MENU!");
                        show=true;
                    }
                    active = true;
                },300)
                active = false;
            }else{
                clearTimeout(timer);
                active = true;
            }
            $(".menu-hover").off("mouseover");
            clearInterval(intervalWave);
            $(".menu-hover").removeClass("shake");
        },
        'focus': ()=>{
            if(!show && window.scrollY<=300){
                fadeElement(".menu-hover p","¡I'M THE MENU!");
            }
        },
        'blur': ()=>{      
            if(item1.style.display == "none" || item1.style.display == "" || item2.style.display == "none" || item2.style.display == "" || item3.style.display == "none" || item3.style.display == "" || item4.style.display == "none" || item4.style.display == ""){
                setTimeout(()=>{
                    fadeOutMenu();
                    if(!show && window.scrollY<=300)
                        fadeElement(".menu-hover p","¡I'M THE MENU!");
                    show=true;
                },1000);
            }else{
                fadeOutMenu();
                if(!show && window.scrollY<=300)
                    fadeElement(".menu-hover p","¡I'M THE MENU!");
                show=true;
            }
        },
        'dblclick': ()=>{
            if(window.scrollY>300){
                window.scrollTo(0,0);
                fadeOutMenu();
                show=true;
            }
        },
        'mouseover': ()=>{
            clearInterval(intervalWave);
            clearInterval(intervalEffects);
            clearInterval(intervalEffects2);
            //WAVE EFFECT
            wave();
            $(".menu-hover").addClass("shake");
        },
        'mouseleave': ()=>{
            clearInterval(intervalWave);
            $(".menu-hover").off("mouseover");
            $(".menu-hover").on("mouseover",()=>{
                clearInterval(intervalWave);
                clearInterval(intervalEffects);
                clearInterval(intervalEffects2);
                $(".menu-hover").removeClass("shake");
                $(".menu-hover").addClass("shake");
                //WAVE EFFECT
                wave();    
            });
            $(".menu-hover").removeClass("shake");
            //CALLING TEMPORAL EFFECTS
            clearInterval(intervalWave);
            clearInterval(intervalEffects);
            clearInterval(intervalEffects2);
            tempEffects();
        }
    });

    //FUNCTIONS

    //FADE IN MENU ITEMS
    function fadeInMenu(){
        $("#menu-item-1").fadeIn("fast",()=>$("#menu-item-2").fadeIn("fast",()=>$("#menu-item-3").fadeIn("fast",()=>$("#menu-item-4").fadeIn("fast"))));
    }
    //FADE OUT ITEMS MENU
    function fadeOutMenu(){
        $("#menu-item-4").fadeOut("fast",()=>$("#menu-item-3").fadeOut("fast",()=>$("#menu-item-2").fadeOut("fast",()=>$("#menu-item-1").fadeOut("fast"))));
    }
    //FADING ELEMENTS
    function fadeElement(element,html){
        $(element).animate({
            top:'20px',
            opacity:'0'
        },300,()=>{
            setTimeout(()=>{
                $(element).empty();

                if(html!=undefined)
                    $(element).html(html);

                $(element).animate({
                    top:'0px',
                    opacity:'1',
                },250)
            },200)
        })
    }
    //WAVE EFFECT
    function wave(){
        clearInterval(intervalWave);
        $(".wave").animate({
            height:'12rem',
            width:'12rem',
            opacity: '0'
        },500,()=>{
            $(".wave").css({'height':'9rem','width':'9rem','opacity':'1'});
        })
        intervalWave=setInterval(()=>{
            $(".wave").animate({
                height:'12rem',
                width:'12rem',
                opacity: '0'
            },500,()=>{
                $(".wave").css({'height':'9rem','width':'9rem','opacity':'1'})
            })
        },500);
    }
    //TEMPORAL EFECTS
    function tempEffects(){
        clearInterval(intervalWave);
        clearInterval(intervalEffects);
        intervalEffects=setInterval(()=>{
            clearInterval(intervalEffects2);
            clearInterval(intervalWave);
            let num = Math.random()*(7000-4000)+4000;
            intervalEffects2=setInterval(()=>{
                //SHAKING
                $(".menu-hover").addClass("shake");
                setTimeout(()=>{
                    $(".menu-hover").removeClass("shake");
                },600)
                //WAVES
                wave();
                clearInterval(intervalWave);
                //ARROW MOVING
                if(window.scrollY>300){
                    for(let i=1;i<=2;i++){
                        $(".arrow-container").animate({
                            top:"-8px"
                        },250).animate({
                            top:"0px"
                        },250)
                    }
                }
            },num);
        },8000);
    }
    // $(document).scroll(()=>{
    //     if(window.scrollY>=300)
    //         $("#scroller").fadeIn("fast");
    //     else
    //         $("#scroller").fadeOut("fast");
    // });

    // $("#scroller").click(()=>{
    //     window.scrollTo(0,0);
    // });
});