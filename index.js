function toright() {
  $("#recentvid1").css("left", "-50%");
  $("#recentvid2").css("left", "0%");
  $("#recentvid3").css("left", "50%");
}

function toleft() {
  $("#recentvid1").css("left", "0%");
  $("#recentvid2").css("left", "50%");
  $("#recentvid3").css("left", "100%");
}

function rotate(x) {
    x.classList.toggle("change");
    $("#phonenavlinks").slideToggle("fast");
}

$(document).ready(function(){
          $("#open").click(function(){
              $(".aboutmenu").toggleClass("aboutout");
          });
      });


 $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos <= winTop + 600) {
          $(this).addClass("slideup");
        }
    });
  });

 $(window).scroll(function() {
    $(".slideanim2").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos <= winTop + 600) {
          $(this).addClass("slideleft");
        }
    });
  });

 $(window).scroll(function() {
    $(".slideanim3").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos <= winTop + 600) {
          $(this).addClass("slideright");
        }
    });
  });

 $(window).scroll(function() {
    var winTop = $(window).scrollTop();
        if (winTop > 50) {
          $("#back2top").css("left", 0);
        } else {
          $("#back2top").css("left", -200);
        }
  });

 $(window).scroll(function() {
    var winTop = $(window).scrollTop();

    $("#storyimg").css({
    'margin-top' : -150 - winTop/5
    });
});


$(document).ready(function() {
    $("#storynav").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: 0
                }, 800);
    });
});

$(document).ready(function() {
    $("#back2top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: 0
                }, 800);
    });
});

$(document).ready(function() {
    $("#missionnav").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: $("#mission").offset().top - 50
                }, 800);
    });
});

$(document).ready(function() {
    $("#teamnav").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: $("#team").offset().top - 50
                }, 800);
    });
});

$(window).scroll(function() {
    $("#headerimg").css({
    'left' : -($(this).scrollTop())/3 + "px"
    });
    $("#missionimg").css({
    'left' : -20 + ($(this).scrollTop())/70 + "%"
    });
});


