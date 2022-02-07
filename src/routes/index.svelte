<script>
  import ButtonPrimary from "../components/ButtonPrimary.svelte"
</script>
<!--  -->
<div class="h-screen bg-center bg-mobile-background sm:bg-desktop-background">
  <!-- The Title -->
  <div class="flex items-center justify-center sm:justify-items-start h-full ml-5">
    <div class="text-5xl font-bold leading-tight text-white w-50">
      <p>Object Detection</p>
    </div>
  </div>
  <!-- The bottom button -->
  <div class="absolute bottom-0 flex justify-center w-full mb-5" style="font-family: 'Roboto'">
    <a href="/pictures">
      <ButtonPrimary >
        Take A Picture
      </ButtonPrimary>
    </a>
  </div>
</div>





