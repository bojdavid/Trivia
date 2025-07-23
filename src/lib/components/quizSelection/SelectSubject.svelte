<script lang="ts">
  let {
    subjects,
    pickSubject,
    submitButtonClass,
    selectSubject,
    selectedSubject,
  } = $props();
</script>

<div class="grid grid-cols-2 gap-5 text-md my-5">
  {#each subjects as subject}
    <button
      type="button"
      class="btn preset-outlined-primary-500 rounded-lg md:text-xl text-sm p-4 whitespace-normal {selectedSubject?.id ==
      subject.id
        ? 'bg-secondary-500'
        : ''}"
      onclick={() => pickSubject(subject)}
    >
      <p class="w-full break-words">
        {subject.name}
      </p>
    </button>
  {/each}
</div>

<div class="flex justify-end">
  <button
    type="button"
    class={submitButtonClass}
    onclick={() => selectSubject(selectedSubject)}
  >
    Select Subject
  </button>
</div>
