$(function()
{
    var playerTrack = $("#player-track"), bgArtwork = $('#bg-artwork'), bgArtworkUrl, albumName = $('#album-name'), trackName = $('#track-name'), albumArt = $('#album-art'), sArea = $('#s-area'), seekBar = $('#seek-bar'), trackTime = $('#track-time'), insTime = $('#ins-time'), sHover = $('#s-hover'), playPauseButton = $("#play-pause-button"),  i = playPauseButton.find('i'), tProgress = $('#current-time'), tTime = $('#track-length'), seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0, buffInterval = null, tFlag = false, albums = ['Windy Hill','Tuý Hồng Nhan','Kỉ Niệm Giữa Mùa Hè','China - Pipa','China-W'], trackNames = ['V.A','Unknown','V.A','Từ Mộng Viên','V.A'], albumArtworks = ['_1','_2','_3','_4','_5'], trackUrl = ['https://vietup.net/files/5085e1daa263661962269c4e207c33c5/7ca28ccde263a675d7ab7060e9ed0eca/WindyHill-VA-5941232.mp3','https://vietup.net/files/1ef0446909f5d97f4a37fcc17dd377e6/5b92b7989115d5f1b128ac64ce9c9e5c/T%C3%BAy%20H%E1%BB%93ng%20Nhan%20_%20%E9%86%89%E7%BA%A2%E9%A2%9C%20(T%C3%A2n%20Th%E1%BB%A7y%20H%E1%BB%AD%20OST)_128k.mp3','https://vietup.net/files/d7a6e7fb0a6215e13cb4cf10fd5006a2/712976f95133e0a49573fbe9bd356f62/20181201122023-NzYzMDM1.mp3','https://vietup.net/files/f134f74fe9f917f2ad80d30f69b5e5ff/baa058eb9d4bf757fa09896c44e0c5f0/China-Pipa%20Remix_%20-%20Tu%20Mong%20Vien_.mp3','https://vietup.net/files/d8b2a7c962bff7898785e1c9c685cbee/658953f1f681915f543a40eef9acb562/ChinaW-VA-5979142.mp3'], playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;

    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

      
  function showHover(event)
  {
    seekBarPos = sArea.offset(); 
    seekT = event.clientX - seekBarPos.left;
    seekLoc = audio.duration * (seekT / sArea.outerWidth());
    
    sHover.width(seekT);
    
    cM = seekLoc / 60;
    
    ctMinutes = Math.floor(cM);
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
    
    if( (ctMinutes < 0) || (ctSeconds < 0) )
      return;
    
        if( (ctMinutes < 0) || (ctSeconds < 0) )
      return;
    
    if(ctMinutes < 10)
      ctMinutes = '0'+ctMinutes;
    if(ctSeconds < 10)
      ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
        insTime.text(ctMinutes+':'+ctSeconds);
            
    insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
    
  }

    function hideHover()
  {
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);   
    }
    
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
    seekBar.width(seekT);
    hideHover();
    }

    function updateCurrTime()
  {
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

    curMinutes = Math.floor(audio.currentTime / 60);
    curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
    
    durMinutes = Math.floor(audio.duration / 60);
    durSeconds = Math.floor(audio.duration - durMinutes * 60);
    
    playProgress = (audio.currentTime / audio.duration) * 100;
    
    if(curMinutes < 10)
      curMinutes = '0'+curMinutes;
    if(curSeconds < 10)
      curSeconds = '0'+curSeconds;
    
    if(durMinutes < 10)
      durMinutes = '0'+durMinutes;
    if(durSeconds < 10)
      durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
        tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
        tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
    seekBar.width(playProgress+'%');
    
    if( playProgress == 100 )
    {
      i.attr('class','fa fa-play');
      seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
    }
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag)
    {
        if( flag == 0 || flag == 1 )
            ++currIndex;
        else
            --currIndex;

        if( (currIndex > -1) && (currIndex < albumArtworks.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            currAlbum = albums[currIndex];
            currTrackName = trackNames[currIndex];
            currArtwork = albumArtworks[currIndex];

            audio.src = trackUrl[currIndex];
            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            albumArt.find('img.active').removeClass('active');
            $('#'+currArtwork).addClass('active');
            
            bgArtworkUrl = $('#'+currArtwork).attr('src');

            bgArtwork.css({'background-image':'url('+bgArtworkUrl+')'});
        }
        else
        {
            if( flag == 0 || flag == 1 )
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer()
  { 
        audio = new Audio();

    selectTrack(0);
    
    audio.loop = false;
    
    playPauseButton.on('click',playPause);
    
    sArea.mousemove(function(event){ showHover(event); });
    
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
    
        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
        playNextTrackButton.on('click',function(){ selectTrack(1);});
  }
    
  initPlayer();
});
