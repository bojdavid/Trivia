<script lang="ts">
  import type { QuizQuestion } from "$lib/types/quiz";

  let {
    questions = [],
    questionNum,
    goToQuestion,
  } = $props<{
    questions: QuizQuestion[];
    questionNum: number;
    goToQuestion: (id: number) => void;
  }>();
</script>

<div class="space-y-[var(--spacing-clamp-md)]">
  <div
    class="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[length:var(--text-clamp-sm)] font-black uppercase tracking-wider text-black dark:text-white border-4 border-black dark:border-white p-4 rounded-xl shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#fff] bg-white dark:bg-black"
  >
    <span>Progress</span>
    <span class="text-primary-500 mt-2 sm:mt-0">
      {questions.filter((q: QuizQuestion) => q.answered).length} <span class="text-black dark:text-white opacity-50">/</span> {questions.length} Answered
    </span>
  </div>

  <div class="grid grid-cols-4 sm:grid-cols-5 gap-[var(--spacing-clamp-sm)]">
    {#each questions as question, idx}
      {@const isCurrent = questionNum === idx}
      {@const isAnswered = question.answered}

      <button
        type="button"
        class="aspect-square rounded-xl font-black text-[length:var(--text-clamp-base)] flex items-center justify-center transition-all duration-300 border-4 hover:-translate-y-1 active:scale-95
               {isCurrent
          ? 'bg-primary-500 text-white border-black dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#fff]'
          : isAnswered
            ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black shadow-[2px_2px_0px_#e60000]'
            : 'bg-white dark:bg-black border-black/20 dark:border-white/20 text-black dark:text-white hover:border-black dark:hover:border-white hover:shadow-[4px_4px_0px_#1a1a1a] dark:hover:shadow-[4px_4px_0px_#fff]'}"
        onclick={() => goToQuestion(idx)}
      >
        {idx + 1}
      </button>
    {/each}
  </div>
</div>
