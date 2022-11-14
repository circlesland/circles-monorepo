<script lang="ts">
  import { VerticalLayout } from '@circlesland/ui-components';
  import { ViewType } from '@circlesland/ui-components';
  import type { Profile } from 'src/types';

  import PageHeader from './PageHeader.svelte';

  export let profile: Profile;

  $: view = {
    id: 'layout',
    testId: 'layout-test-id',
    type: ViewType.HORIZONTAL_LAYOUT,
    children: [
      {
        id: 'label',
        testId: 'label-test-id',
        type: ViewType.LABEL,
        args: {
          text: profile?.ceramicProfile?.name,
        },
      },
      {
        id: 'picture-view',
        testId: 'picture-view-test-id',
        type: ViewType.PICTURE_VIEW,
        trigger: 'editProfile',
        args: {
          image: 'https://placekitten.com/g/200/200',
        },
      },
    ],
  };
</script>

<PageHeader heightClass="h-48">
  <div class="self-center block mt-2 text-center">
    <div class="mb-4">
      <!-- <UserImage profile="{profile}" size="{36}" profileLink="{false}" />  -->
      <!-- <PictureView view={pictureView} /> -->
      <VerticalLayout {view} />
    </div>

    <div />
  </div>
</PageHeader>
