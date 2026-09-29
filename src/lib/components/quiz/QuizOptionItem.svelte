<script lang="ts">
  import { fade } from "svelte/transition";
  import IconCheck from "@lucide/svelte/icons/check";
  import IconX from "@lucide/svelte/icons/x";

  let {
    opt,
    isSelected,
    isCorrect,
    showFeedback,
    selectOption,
  } = $props<{
    opt: { option: string; text: string };
    isSelected: boolean;
    isCorrect: boolean;
    showFeedback: boolean;
    selectOption: () => void;
  }>();
</script>

{#if !showFeedback}
  <!-- Normal Play State -->
  <button
    type="button"
    class="w-full p-[var(--spacing-clamp-sm)] rounded-xl border-4 text-left flex items-center transition-all duration-200 group
           {isSelected 
             ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black shadow-[4px_4px_0px_#e60000]' 
             : 'bg-white dark:bg-black border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white text-black dark:text-white hover:shadow-[4px_4px_0px_#1a1a1a] dark:hover:shadow-[4px_4px_0px_#fff] hover:-translate-y-1'}"
    onclick={selectOption}
  >
    <span class="w-10 h-10 rounded-lg flex items-center justify-center font-black text-[length:var(--text-clamp-base)] mr-4 border-2 transition-colors
                 {isSelected 
                    ? 'bg-primary-500 border-primary-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 border-black/20 dark:border-white/20 text-black dark:text-white group-hover:border-black dark:group-hover:border-white'}"
    >
      {opt.option}
    </span>
    <span class="flex-1 text-[length:var(--text-clamp-base)] font-bold leading-snug">{opt.text}</span>
  </button>
{:else}
  <!-- Reveal Answers State -->
  <div
    class="w-full p-[var(--spacing-clamp-sm)] rounded-xl border-4 text-left flex items-center transition-all duration-300
           {isCorrect
             ? 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-400 font-bold shadow-[4px_4px_0px_#22c55e]'
             : isSelected
               ? 'bg-error-500/10 border-error-500 text-error-700 dark:text-error-400 shadow-[4px_4px_0px_#ef4444]'
               : 'bg-white/5 border-black/10 dark:border-white/10 opacity-60 grayscale'}"
    transition:fade={{ duration: 200 }}
  >
    <!-- Badge symbol / icon -->
    <span class="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg mr-4 border-2 text-white
                 {isCorrect 
                   ? 'bg-green-500 border-green-500' 
                   : isSelected 
                     ? 'bg-error-500 border-error-500' 
                     : 'bg-gray-400 border-gray-400 dark:bg-gray-600 dark:border-gray-600'}"
    >
      {#if isCorrect}
        <IconCheck size="20" />
      {:else if isSelected}
        <IconX size="20" />
      {:else}
        {opt.option}
      {/if}
    </span>
    
    <span class="flex-1 text-[length:var(--text-clamp-base)] font-bold leading-snug">{opt.text}</span>
    
    <!-- Feedback message text -->
    {#if isCorrect}
      <span class="text-[length:var(--text-clamp-sm)] font-black text-green-600 dark:text-green-400 uppercase tracking-wider ml-2">Correct</span>
    {:else if isSelected}
      <span class="text-[length:var(--text-clamp-sm)] font-black text-error-600 dark:text-error-400 uppercase tracking-wider ml-2">Your Choice</span>
    {/if}
  </div>
{/if}
