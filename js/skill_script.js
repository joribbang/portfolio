// skill_script.js
(function () {
  // 실제 애니메이션 실행 함수(기존 코드 그대로 묶음)
  function runSkills() {
    // 숫자 카운트 업
    $('.skill-box').find('b').each(function () {
      $(this).prop('Counter', 0).animate(
        { Counter: $(this).parent().data('percent') },
        {
          duration: 1000,
          easing: 'swing',
          step: function (now) { $(this).text(Math.ceil(now) + '%'); }
        }
      );
    });

    // 원형 게이지 회전
    $('.skill-box .skills-circle li').each(function () {
      var _right = $(this).find('.bar-circle-right');
      var _left  = $(this).find('.bar-circle-left');
      var _percent = $(this).attr('data-percent');
      var deg = 3.6 * _percent;

      if (_percent <= 50) {
        _right.animate({ circle_rotate: deg }, {
          step: function (deg) { $(this).css('transform','rotate(' + deg + 'deg)'); },
          duration: 1000
        });
      } else {
        var full_deg = 180;
        deg -= full_deg;
        var run_duration = 1000 * (50 / _percent);

        _right.animate({ circle_rotate: full_deg }, {
          step: function (d) { $(this).css('transform','rotate(' + d + 'deg)'); },
          duration: run_duration,
          easing: 'linear',
          complete: function () {
            run_duration -= 1000;
            _left.css({
              clip: 'rect(0, 150px, 150px, 75px)',
              background:'#7A5591'  // 퍼플
            });
            _left.animate({ circle_rotate: deg }, {
              step: function (deg) { $(this).css('transform','rotate(' + deg + 'deg)'); },
              duration: Math.abs(run_duration),
              easing: 'linear'
            });
          }
        });
      }
    });
  }

  // 한 번만 실행되도록 플래그
  var started = false;

  $(function () {
    var skillsEl = document.querySelector('#skills');
    if (!skillsEl) return;

    // IntersectionObserver로 보임 감지
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !started) {
            started = true;
            runSkills();
            io.unobserve(skillsEl); // 한 번만
          }
        });
      }, { threshold: 0.4 }); // 40% 보이면 실행
      io.observe(skillsEl);
    } else {
      // 폴백: 스크롤 체크(구형 브라우저)
      function onScrollFallback() {
        if (started) return;
        var rect = skillsEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
          started = true;
          runSkills();
          window.removeEventListener('scroll', onScrollFallback);
        }
      }
      window.addEventListener('scroll', onScrollFallback);
      onScrollFallback(); // 혹시 처음부터 보일 수도 있음
    }
  });
})();
