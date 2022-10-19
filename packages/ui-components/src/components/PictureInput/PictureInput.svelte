<script lang="ts">
  import type { View, PictureInput } from '../../types';
  import Cropper from 'svelte-easy-crop';
  import { getCroppedImg } from './canvasUtils';
  import { onMount } from 'svelte/internal';

  let image, fileinput, pixelCrop, croppedImage;

  export let view: View & PictureInput;

  const { testId, id } = view;
  const { defaultImage } = view.args;

  onMount(() => {
    if (defaultImage) {
      image = defaultImage;
    }
  });

  function onFileSelected(e) {
    let imageFile = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      image = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  }

  let profilePicture, style;

  function previewCrop(e) {
    pixelCrop = e.detail.pixels;
    const { x, y, width } = e.detail.pixels;
    const scale = 200 / width;
    profilePicture.style = `margin: ${-y * scale}px 0 0 ${
      -x * scale
    }px; width: ${profilePicture.naturalWidth * scale}px;`;
  }

  async function cropImage() {
    croppedImage = await getCroppedImg(image, pixelCrop);
  }

  function reset() {
    croppedImage = null;
    image = null;
  }
</script>

{#if view}
  <div data-testId={testId}>
    {#if !croppedImage}
      {#if !image}
        <h2>Upload a picture for cropping</h2>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          on:change={(e) => onFileSelected(e)}
          bind:this={fileinput}
          data-testId={`${testId}-file-input`}
        />
      {:else}
        <h2>Crop your image</h2>
        <div
          style="position: relative; width: 75vmin; height: 75vmin;"
          data-testId={`${testId}-cropper`}
        >
          <Cropper
            {image}
            aspect={1}
            zoom="1"
            crop={{ x: 0, y: 0 }}
            on:cropcomplete={previewCrop}
          />
        </div>
        {#if !croppedImage}
          <button
            type="button"
            data-testId={`${testId}-crop-button`}
            on:click={async () => {
              croppedImage = await getCroppedImg(image, pixelCrop);
            }}>Crop!</button
          >
        {/if}
      {/if}
    {:else}
      <h2>Cropped Output</h2>
      <img src={croppedImage} alt="Cropped profile" /><br />
      <button type="button" on:click={reset}>Reset</button>
    {/if}
  </div>
{/if}

<style>
  .prof-pic-wrapper {
    height: 200px;
    width: 200px;
    position: relative;
    border: solid;
    overflow: hidden;
  }

  .prof-pic {
    position: absolute;
  }
</style>
