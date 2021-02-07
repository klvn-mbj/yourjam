<template>
<div id="section-playlist">

    <div  v-for="(playjam, index) in playjams.items" :key="playjam" class="toast toast-body show mb-3">
            <i @click="update(index)" class=" d-flex flex-row ">
                <img id="thumb" :src="playjam.snippet.thumbnails.medium.url" class="img-thumbnail rounded" alt="art">
                <div id="info">
                    <h4 id="title">{{playjam.snippet.title.substring(0, 35)}}</h4>
                    <p id="desc" class="text-muted">{{playjam.snippet.description.substring(0, 50)}}</p>
                </div>
            </i>
    </div>

</div>
</template>

<script>

import $ from 'jquery';

var playlist = null;

export default {
    data() {
      return {
        playjams: null,
      }
    },

    created() {
        this.getJson();
    },

    methods: {
        update(i) {
            this.$emit('update', i);
        },

        // [GET JSON]
        getJson(){
        const link = 'https://www.googleapis.com/youtube/v3/playlistItems';
        const options = {
            part: 'snippet',
            key: 'AIzaSyC5AedjvdJf3qGDdtzsFbNVdrd5CtkYjIo',
            maxResults: 20,
            playlistId: 'PLC03fNjVR9tSxevqYxeHu9vbsHVOH7U4m'
        };
        
        $.getJSON(link, options, function(data){
            playlist = data;
            this.getJamPlaylist(playlist);
        }.bind(this));
        },

        getJamPlaylist(e){
            this.playjams = e;
        }
    }

}
</script>

<style scoped>
* { margin: 0; }

#info { padding: 0px 15px; }

h4 { font-size: 1rem; font-weight: bold; margin-bottom: 7px;}
#desc { font-size: 0.5rem; }

#thumb { height: 75px; border-radius: 60px; }
</style>