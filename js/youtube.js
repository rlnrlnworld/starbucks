var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      
      function onYouTubeIframeAPIReady() {
        // <div id="player"></div>
        new YT.Player('player', {
          videoId: 'An6LvWQuj_8', //최초 재생할 YOUTUBE VIDEO의 id값-> url주소의 v= 뒤에 명시
          playerVars: {
            autoplay: true,
            loop: true, //반복 재생 시 반복 재생할 유튜브 영상 ID 목록을 제공해주어야 함
            playlist: 'An6LvWQuj_8' //반복 재생할 유튜브 영상 ID 목록
          },
          events:{
            onReady: function(event){ //method
                event.target.mute() //영상 준비가 되면 음소거 실행
            }
          }
        });
      }

      function onPlayerReady(event) {
        event.target.playVideo();
      }

      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }