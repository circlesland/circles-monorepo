<script lang="ts">
  import { CeramicClient } from '@circlesland/ceramic';

  import { onMount } from 'svelte';
  import { BasicProfile, CeramicSchema } from '@circlesland/ceramic';
  import { AuthService } from '../../services/AuthService';
  export let profile;

  async function onSubmit(e) {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    const profileData = AuthService.getDataFromLocalStorage();
    const privateKey = profileData?.privateKey;
    if (privateKey) {
      try {
        const ceramicClient = new CeramicClient(CeramicSchema.basicProfile);
        await ceramicClient.connect(privateKey);

        await ceramicClient.updateData(data as BasicProfile);
      } catch (e) {
        console.log('fetch ceramic profile error', e);
      }
    }

    window.location.reload();
  }

  onMount(() => {
    (async () => {
      const nameInput = document.getElementById('name');
      const countryInput = document.getElementById('country');
      const genderInput = document.getElementById('gender');
      // @ts-ignore
      nameInput.value = profile?.name;
      // @ts-ignore
      countryInput.value = profile?.country;
      // @ts-ignore
      genderInput.value = profile?.gender;
    })();
  });
</script>

<div>
  <form on:submit|preventDefault={onSubmit}>
    <div class="formfield">
      <label class="formLabel" for="name">Name:</label>
      <input
        class="forminput"
        type="text"
        id="name"
        name="name"
        placeholder="John Doe"
      />
    </div>
    <div class="formfield">
      <label class="formLabel" for="country">Country:</label>
      <input
        class="forminput"
        type="text"
        id="country"
        name="country"
        placeholder="USA"
      />
    </div>
    <div class="formfield">
      <label class="formLabel" for="gender">Gender:</label>
      <select class="forminput" id="gender" name="gender">
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="non-binary">Non-Binary</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div class="formfield">
      <input class="forminput" type="submit" id="submitBtn" value="Submit" />
    </div>
  </form>
</div>
