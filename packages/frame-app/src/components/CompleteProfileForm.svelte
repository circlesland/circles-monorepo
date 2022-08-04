<script lang="ts">
  import { updateProfileOnCeramic } from "../../utils/CeramicHelpers";
  import { interpret } from "xstate";
  import { toggleMachine } from "../../xstate/machine";

  const toggleService = interpret(toggleMachine);

  async function onSubmit(e) {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    await updateProfileOnCeramic(data);

    toggleService.start();
  }
</script>

<div>
  <form on:submit|preventDefault="{onSubmit}">
    <div class="formfield">
      <label class="formLabel" for="name">Name:</label>
      <input class="forminput" type="text" id="name" name="name" placeholder="John Doe" />
    </div>
    <div class="formfield">
      <label class="formLabel" for="country">Country:</label>
      <input class="forminput" type="text" id="country" name="country" placeholder="USA" />
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
