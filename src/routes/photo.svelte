<script>
  import { uploadFile } from "$lib/firebase.js";
  import { onMount } from 'svelte';
  import { fade } from "svelte/transition";

  import ButtonSecondary from "../components/ButtonSecondary.svelte"
  import Alert from "../components/Alert.svelte";

  let img
  let lastPicture
  let video
  let canvas
  let alert = false

  onMount(() => {
    img = document.querySelector('img');
    canvas = document.createElement('canvas');
    if (hasGetUserMedia()) {
      console.log("camera available")
      video = document.querySelector('video')
      let constraints = {
        video: { facingMode: "environment"}
      };
      console.log(navigator.mediaDevices)
      navigator.mediaDevices.getUserMedia(constraints).
        then((stream) => {video.srcObject = stream});
    }
  })

  function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }

  function takePhoto(){
    console.log("taking photo")
    if(video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      lastPicture = true
      let dataurl = canvas.toDataURL('image/png');
      let blob = dataURLtoBlob(dataurl);
      uploadFile(blob)
      alert = true 
      setTimeout(function(){ alert = false; }, 1000);
    } else {
      console.log("no video available")
    }
  }

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

</script>

<div class="w-full h-screen bg-gray-100">
  <div class="pt-5 mx-5">
    <a class="pb-5 rounded-2xl" href="/pictures">
      <ButtonSecondary >
        Back
      </ButtonSecondary>
    </a>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video class="mt-5 rounded-lg"  autoplay></video>
  </div>
  
  <div class="mx-5 {lastPicture? 'pt-10' : ''}">
    <canvas style="display:none;"></canvas>
  </div>
  {#if alert}
    <div transition:fade on:click={() => alert = false } class="relative w-full max-w-xl px-5 mx-auto mb-5">
      <Alert />
    </div>
  {/if}
  <div class="relative flex justify-center py-5 mx-5">
    <button class="rounded-2xl" on:click={takePhoto}>
      <ButtonSecondary >
        Click for picture!
      </ButtonSecondary>
    </button>
  </div>
</div>
