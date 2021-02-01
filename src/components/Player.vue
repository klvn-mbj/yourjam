<template>
<div id="section-player d-flex justify-content-center align-items-center">
    <youtube :video-id="videoId" width=0 height=0 ref="youtube"/>

    <div class="player bg-light py-3 d-flex text-center align-items-center flex-column">

      <img id="thumb" :src="jam.thumb" class="img-thumbnail rounded" alt="art">

      <div id="info" class="my-3">
        <h4 id="title">{{jam.title}}</h4>
        <p id="desc" class="text-muted">{{jam.desc}}</p>
      </div>

      <div id="control">

        <div id="timer" class="d-flex flex-row justify-content-between">
          <p id="current-time">{{jam.current_time}}</p>
          <input @mouseup="drStrange" type="range" class="custom-range mx-3" id="customRange" v-model="progress">
          <p id="duration">{{jam.duration}}</p>
        </div>

        <div id="buttons" class="mt-2 d-flex flex-row justify-content-around">
          <a @click="previousJam"><img src="../assets/backward.svg" alt="backward"></a>
          <a @click="btnJam"><img :src="iBtn" alt="play"></a>
          <a @click="nextJam"><img src="../assets/forward.svg" alt="forward"></a>
        </div>

      </div>

    </div>


    <!--
      <h1 class="text-center">{{title}}</h1>
     
      <br>
      <button class="btn btn-primary mr-1" @click="previousJam">Previous</button>
      <button class="btn btn-primary mr-1" @click="playJam">play</button>
      <button class="btn btn-primary mr-1" @click="pauseJam">pause</button>
      <button class="btn btn-primary mr-1" @click="nextJam">Next</button>
      <br>
      <button class="btn btn-danger mt-1 mr-1" @click="teste">TESTE</button>
    -->
    
</div>
</template>

<script>

import $ from 'jquery';

import iThumb from  '../assets/thumb.svg';
import iPause from '../assets/pause.svg';
import iPlay from '../assets/play.svg';

const ipause = iPause;
const iplay = iPlay;

export default {
    
  data() {
    return {
        progress: 0,
        jam: {
          title: '[title]',
          desc: '[desc]',
          thumb: iThumb,
          current_time: "0:00",
          duration: "0:00"
        },
        player: null,
        videoId: null,
        playerVars: {
            autoplay: 1,
            playsinline: 1
        },
        tC: null,
        tD: null,
        iBtn: iplay
    }
  },

  created() {
    this.getJson(null);
  },

  mounted() {
    this.player= this.$refs.youtube.player;

    // [EVENTS]
    this.player.on("ready", this.playerReady);
    this.player.on("stateChange", this.playerStateChange);
    this.player.on("error", this.playerError);
  },

  methods: {

    // [EVENT - Ready]
    playerReady(e) {
      this.$emit("ready", e.target);
      if (this.playerVars.autoplay) { 
          e.target.cuePlaylist({listType:'playlist',
            list:'PLC03fNjVR9tSxevqYxeHu9vbsHVOH7U4m',
            index:0,
            suggestedQuality:'small'});
      }

      const _this = this;
      setInterval(function(){
        _this.updateTimerDisplay();
        _this.updateProgressBar();
      }, 1000);

      
    },

    // [EVENT - State Change]
    playerStateChange(e) {
      this.getJson(e);

      if(e.data == 1){
        this.iBtn = ipause;
      }else if(e.data == 2){ 
        this.iBtn = iplay;
      }
    },
    // [EVENT - Error]
    playerError(e) {
        this.$emit("error", e.target);
    },

    // [PLAY or PAUSE]
    btnJam() {
      const _this = this;
      this.player.getPlayerState().then(function(state){
        if(state == 1){
          _this.pauseJam();
        } else if(state == 2 || state == 5){
          _this.playJam();
        }
      });   
    },

    // [NEXT]
    playJam() {
      this.player.playVideo()
    },
    // [NEXT]
    pauseJam() {
      this.player.pauseVideo()
    },

    // [NEXT]
    nextJam() {
      this.player.nextVideo()
    },
    // [PREVIOU]
    previousJam() {
      this.player.previousVideo()
    },
    // [CONTROL TIME]
    drStrange(){
      var newTime = this.tD * (this.progress/100);
      this.player.seekTo(newTime);
    },

    // [TIMER]
    updateTimerDisplay() {
      // Update current time text display.
      const _this = this;

      this.player.getCurrentTime().then(function(time){
        _this.jam.current_time = _this.formatTime(time);
        _this.tC = time;
      });

      this.player.getDuration().then(function(time){
        _this.jam.duration = _this.formatTime(time);
        _this.tD = time;
      });
    },
    updateProgressBar(){
        // Update the value of our progress bar accordingly.
        this.progress = ( this.tC / this.tD ) * 100;
    },
    /*
    loadJam(index) {
        //console.log(this.$refs.youtube);
        this.player.loadPlaylist({listType:'playlist',
            list:'PLC03fNjVR9tSxevqYxeHu9vbsHVOH7U4m',
            index:index,
            suggestedQuality:'small'});
    },
    */

    // [GET JSON]
    getJson(e){
      const link = 'https://www.googleapis.com/youtube/v3/playlistItems';
      const options = {
        part: 'snippet',
        key: 'AIzaSyC5AedjvdJf3qGDdtzsFbNVdrd5CtkYjIo',
        maxResults: 20,
        playlistId: 'PLC03fNjVR9tSxevqYxeHu9vbsHVOH7U4m'
      };

      $.getJSON(link, options, function(data){
        // console.log(data);
        var item = data.items[0];
        if(e != null){
          item = data.items[e.target.getPlaylistIndex()];
        }
        this.getJamTitle(item);
      }.bind(this));
    },

    // [INFO]
    getJamTitle(item){
      this.jam.title = item.snippet.title.substring(0, 25);
      this.jam.thumb = item.snippet.thumbnails.medium.url;
      this.jam.desc = item.snippet.description.substring(0, 70);
    },
    getJamTime(x){
      this.jam.duration = x;
    },

    // [TIME]
    formatTime(time){
      time = Math.round(time);
  
      var minutes = Math.floor(time / 60),
          seconds = time - minutes * 60;
  
      seconds = seconds < 10 ? '0' + seconds : seconds;
  
      return minutes + ":" + seconds;
    },

       // [TESTE]
    teste(){
      this.updateProgressBar();
    },
  }
}


</script>

<style scoped>
* { margin: 0; }
  youtube{ position: fixed; z-index: -1; }

  .player{ box-sizing: border-box; width: 450px; height: 290px;}

  h4 { font-size: 1.3rem; font-weight: bold; }
  #desc { font-size: 0.7rem; }

  #thumb { height: 125px; border-radius: 60px; }

</style>
