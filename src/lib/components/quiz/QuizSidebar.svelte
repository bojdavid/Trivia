<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import IconX from "@lucide/svelte/icons/x";
  import QuestionsNavigation from "./QuestionsNavigation.svelte";
  import type { QuizQuestion } from "$lib/types/quiz";

  let {
    showNavigation,
    questions,
    questionNum,
    toggleNavigation,
    goToQuestion,
  } = $props<{
    showNavigation: boolean;
    questions: QuizQuestion[];
    questionNum: number;
    toggleNavigation: () => void;
    goToQuestion: (id: number) => void;
  }>();
</script>

{#if showNavigation}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
    transition:fade={{ duration: 200 }}
    onclick={toggleNavigation}
  ></div>

  <aside
    class="fixed inset-y-0 right-0 w-[90%] max-w-sm bg-white dark:bg-[#0a0a0a] border-l-4 border-black dark:border-white shadow-[-8px_0px_0px_#e60000] z-50 overflow-y-auto pattern-bg p-[var(--spacing-clamp-md)] flex flex-col"
    transition:fly={{ x: 100, duration: 300, easing: cubicOut }}
  >
    <div
      class="flex justify-between items-center mb-[var(--spacing-clamp-md)] border-b-4 border-black/10 dark:border-white/10 pb-4"
    >
      <h2
        class="text-[length:var(--text-clamp-2xl)] font-black uppercase text-black dark:text-white"
      >
        Navigation
      </h2>
      <button
        class="p-2 rounded-xl border-4 border-black dark:border-white text-black dark:text-white hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all active:scale-95 bg-white dark:bg-black shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#fff]"
        onclick={toggleNavigation}
        title="Close Navigation"
      >
        <IconX size="24" />
      </button>
    </div>

    <div class="flex-1">
      <QuestionsNavigation
        {questions}
        {questionNum}
        goToQuestion={(id) => {
          goToQuestion(id);
          toggleNavigation(); // Close sidebar after selecting a question
        }}
      />
    </div>
  </aside>
{/if}
