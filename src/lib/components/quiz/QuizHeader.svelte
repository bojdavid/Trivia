<script lang="ts">
  import IconChevronLeft from "@lucide/svelte/icons/chevron-left";
  import LightSwitch from "$lib/components/LightSwitch.svelte";

  let { onQuit } = $props<{
    onQuit: () => void;
  }>();
</script>

<header class="w-full max-w-4xl mx-auto flex justify-between items-center py-[var(--spacing-clamp-sm)]">
  <button
    class="flex items-center gap-[var(--spacing-clamp-sm)] px-4 py-2 rounded-xl bg-white dark:bg-black border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#e60000] transition-all font-bold text-[length:var(--text-clamp-base)] text-black dark:text-white"
    onclick={onQuit}
  >
    <IconChevronLeft size="20" /> Quit Quiz
  </button>

  <div class="p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
    <LightSwitch />
  </div>
</header>
