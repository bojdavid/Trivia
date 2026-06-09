<script lang="ts">
  interface QuizQuestion {
    answered?: boolean;
    choice?: string;
  }

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

<div class="mt-8 pt-6 border-t border-white/10 space-y-3">
  <div
    class="flex items-center justify-between text-xs font-bold text-surface-500 uppercase tracking-wider"
  >
    <span>Navigator</span>
    <span
      >{questions.filter((q: QuizQuestion) => q.answered).length} of {questions.length}
      Answered</span
    >
  </div>

  <div class="flex flex-wrap gap-2.5">
    {#each questions as question, idx}
      {@const isCurrent = questionNum === idx}
      {@const isAnswered = question.answered}

      <button
        type="button"
        class="w-10 h-10 md:w-12 md:h-12 rounded-xl text-sm md:text-base font-semibold flex items-center justify-center transition-all duration-300
               {isCurrent
          ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25 ring-2 ring-primary-500 dark:ring-offset-slate-900 ring-offset-2 scale-105'
          : isAnswered
            ? 'bg-secondary-500/20 border border-secondary-500/30 text-secondary-500 dark:text-secondary-400 font-bold'
            : 'bg-slate-100 border border-slate-200 text-surface-600 dark:text-surface-300 hover:bg-slate-200 hover:border-slate-300 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20'}"
        onclick={() => goToQuestion(idx)}
      >
        {idx + 1}
      </button>
    {/each}
  </div>
</div>
