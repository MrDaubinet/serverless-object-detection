<script>
  import Card from "../components/Card.svelte"
  // import ButtonPrimary from "../components/ButtonPrimary.svelte"
  import { onMount } from 'svelte';
  import { getDocuments, groupDocuments } from "$lib/firebase.js";
  import ButtonSecondary from "../components/ButtonSecondary.svelte";

  let documents
  let count
  let grouped_images
  let loaded = false

  onMount(async () => {
    documents = await getDocuments()
    grouped_images = groupDocuments(documents)
    count = grouped_images.length
    loaded = true
  })
</script>

<div class="h-screen">
  <div class="px-10 pt-10 ">
    <!-- title -->
    <div class="flex items-center justify-between">
      <p class="text-4xl font-bold text-gray-700 text">Pictures</p>
      {#if loaded} 
        <div class="flex items-center justify-center w-10 h-10 font-medium text-white bg-gray-700 rounded-full">
            {count || 0}
        </div>
      {:else}
        <p>loading ...</p>
      {/if}
    </div>
    {#if loaded}
      <!-- array of categories -->
      {#each grouped_images as item}
        <!-- category name -->
        <p class="mt-4 mb-2 font-semibold text-md">{item.name}</p>
        <div class="w-full pl-4 overflow-x-scroll whitespace-no-wrap ">
          <!-- array of classified images -->
          {#each item.images as image}
          <!-- {image.url} -->
            <Card 
              name={item.name}
              confidence={image.confidence}
              url={image.url}
            />
          {/each}
        </div>
      {/each}
    {/if}

    <div class="px-5 py-10 mt-10 text-center bg-white rounded-2xl">
      <p>Hit "Snap" below to categorise more items!</p>
    </div>
  </div>

  <div class="flex justify-center w-full my-10 mb-10" style="font-family: 'Roboto'">
    <a href="/photo">
      <ButtonSecondary >
        Snap
      </ButtonSecondary>
    </a> 
  </div>
</div>