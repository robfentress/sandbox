
$(document).ready(function() {  
    var player = document.getElementById('player');
    var pauser = document.getElementById('pause');
    player.muted = false;  
    var playPromise = player.play();
    
    if (playPromise !== undefined) {
      playPromise.then(function() {
        console.log("playing")
        //pauser.innerHTML = "Pause";
        pauser.src = "assets/pause.png"
      })
      .catch (function(error) {
        console.log("pausing")
        //pauser.innerHTML = "Play";
        pauser.src = "assets/play.png"
      })
    }
    
    $('#pause').on('click', togglePlay);
    
    isPlaying = false;
    
    function togglePlay() {
      if (isPlaying) {
        player.pause();
        //pauser.innerHTML = "Play";
        pauser.src = "assets/play.png"
      } else {
        player.play();
        //pauser.innerHTML = "Pause";
        pauser.src = "assets/pause.png"
      }
    };
  
    player.onplaying = function() {
      isPlaying = true;
    };
    player.onpause = function() {
      isPlaying = false;
    };
  });