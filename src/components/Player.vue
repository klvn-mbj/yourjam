<template>
<div id="section-player d-flex justify-content-center align-items-center">
    <h1 class="text-center">{{title}}</h1>
    <youtube :video-id="videoId" ref="youtube"/>
    <br>
    <button class="btn btn-primary mr-1" @click="previousJam">Previous</button>
    <button class="btn btn-primary mr-1" @click="playJam">play</button>
    <button class="btn btn-primary mr-1" @click="pauseJam">pause</button>
    <button class="btn btn-primary mr-1" @click="nextJam">Next</button>
    <br>
    <button class="btn btn-danger mt-1 mr-1" @click="teste">TESTE</button>
    
</div>
</template>

<script>

import $ from 'jquery';

export default {
    
  data() {
    return {
        title: 'PLAYER',
        vid: 0,
        index: 0,
        playlist: null,
        player: null,
        videoId: null,
        playerVars: {
            autoplay: 1,
            playsinline: 1
        },
        
    }
  },

  created() {
    var link = 'https://www.googleapis.com/youtube/v3/playlistItems';
    var options = {
      part: 'snippet',
      key: 'AIzaSyC5AedjvdJf3qGDdtzsFbNVdrd5CtkYjIo',
      maxResults: 20,
      playlistId: 'PLC03fNjVR9tSxevqYxeHu9vbsHVOH7U4m'
    };

    $.getJSON(link, options, function(data){
        this.getPlaylist(data);
    }.bind(this));
  },

  mounted() {
    this.player= this.$refs.youtube.player;

    // [EVENTS]
    this.player.on("ready", this.playerReady);
    this.player.on("stateChange", this.playerStateChange);
    this.player.on("error", this.playerError);
  },

  methods: {
    // JSON
    getJson() {
      
    },

    // [EVENT - Ready]
    playerReady(e) {
      this.$emit("ready", e.target);
      if (this.playerVars.autoplay) { 
          e.target.cuePlaylist({listType:'playlist',
            list:'PLC03fNjVR9tSxevqYxeHu9vbsHVOH7U4m',
            index:0,
            suggestedQuality:'small'});
       }
      
    },
    // [EVENT - State Change]
    playerStateChange(e) {
        if (e.data !== null && e.data !== -1) {
            //console.log(e.data);
        }
    },
    // [EVENT - Error]
    playerError(e) {
        this.$emit("error", e.target);
    },

    // [PLAY]
    playJam() {
      this.player.playVideo()
    },
    // [PAUSE]
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
    loadJam(index) {
        //console.log(this.$refs.youtube);
        this.player.loadPlaylist({listType:'playlist',
            list:'PLC03fNjVR9tSxevqYxeHu9vbsHVOH7U4m',
            index:index,
            suggestedQuality:'small'});
    },

    // [TESTE]
    teste(){  
      
    },

    getPlaylist(data){
      this.playlist = data;
      console.log(this.playlist.items[0].snippet.resourceId.videoId);
    }
  }
}


</script>

<style scoped>
    
</style>
