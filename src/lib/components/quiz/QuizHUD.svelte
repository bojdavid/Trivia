<script lang="ts">
  import IconClock from "@lucide/svelte/icons/clock";
  import IconFlag from "@lucide/svelte/icons/flag";
  import IconList from "@lucide/svelte/icons/list";
  import { formatTime } from "$lib/utils/time";

  let {
    quizTitle,
    questionNum,
    totalQuestions,
    timerType,
    timeLeft,
    hasQuestions,
    toggleNavigation,
    endQuiz,
  } = $props<{
    quizTitle: string;
    questionNum: number;
    totalQuestions: number;
    timerType: "countdown" | "countup";
    timeLeft: number;
    hasQuestions: boolean;
    toggleNavigation: () => void;
    endQuiz: () => void;
  }>();
</script>

<div
  class="w-full theme-card p-[var(--spacing-clamp-sm)] md:p-[var(--spacing-clamp-md)] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between border-4 gap-[var(--spacing-clamp-md)]"
>
  <div class="flex items-start justify-between w-full md:w-auto">
    <div class="space-y-1">
      <span
        class="text-[length:var(--text-clamp-sm)] font-bold text-primary-500 uppercase tracking-wider"
      >
        {quizTitle}
      </span>
      <div
        class="text-[length:var(--text-clamp-xl)] font-black text-black dark:text-white leading-none"
      >
        Question {questionNum + 1}
        <span class="text-[length:var(--text-clamp-base)] text-gray-500 font-bold">
          / {totalQuestions}
        </span>
      </div>
    </div>

    <!-- Timer Display (Mobile) -->
    <div
      class="flex md:hidden items-center gap-2 px-3 py-1.5 rounded-xl border-4 text-[length:var(--text-clamp-base)] font-black transition-all shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#fff]
                {timerType === 'countdown' && timeLeft < 15
        ? 'border-error-500 bg-error-100 dark:bg-error-900/50 text-error-600 dark:text-error-400 animate-pulse'
        : 'border-black dark:border-white bg-white dark:bg-black text-black dark:text-white'}"
    >
      <IconClock
        size="16"
        class={timerType === "countdown" && timeLeft < 15
          ? "text-error-600 dark:text-error-400"
          : "text-primary-500"}
      />
      <span class="w-[3ch] inline-block text-center">{formatTime(timeLeft)}</span>
    </div>
  </div>

  <div class="flex items-stretch w-full md:w-auto gap-[var(--spacing-clamp-sm)]">
    <!-- View Questions Toggle -->
    {#if hasQuestions}
      <button
        class="flex-1 md:flex-none justify-center px-3 md:px-4 py-3 md:py-2 rounded-xl bg-white dark:bg-black border-4 border-black dark:border-white text-[length:var(--text-clamp-sm)] md:text-[length:var(--text-clamp-base)] font-black active:scale-95 hover:-translate-y-1 shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#fff] transition-all flex items-center gap-2 uppercase tracking-wide text-black dark:text-white"
        onclick={toggleNavigation}
      >
        <IconList size="18" class="hidden sm:block" />
        <span>View Questions List</span>
      </button>
    {/if}

    <!-- Timer Display (Desktop) -->
    <div
      class="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border-4 text-[length:var(--text-clamp-base)] font-black transition-all shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#fff]
                {timerType === 'countdown' && timeLeft < 15
        ? 'border-error-500 bg-error-100 dark:bg-error-900/50 text-error-600 dark:text-error-400 animate-pulse'
        : 'border-black dark:border-white bg-white dark:bg-black text-black dark:text-white'}"
    >
      <IconClock
        size="18"
        class={timerType === "countdown" && timeLeft < 15
          ? "text-error-600 dark:text-error-400"
          : "text-primary-500"}
      />
      <span class="w-[3ch] inline-block text-center">{formatTime(timeLeft)}</span>
    </div>

    <!-- End Quiz Button -->
    <button
      class="px-4 py-3 md:py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white border-4 border-black dark:border-white text-[length:var(--text-clamp-sm)] md:text-[length:var(--text-clamp-base)] font-black active:scale-95 hover:-translate-y-1 shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#fff] hover:shadow-[4px_4px_0px_#1a1a1a] dark:hover:shadow-[4px_4px_0px_#fff] transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
      onclick={endQuiz}
    >
      <IconFlag size="18" /> <span>Submit</span>
    </button>
  </div>
</div>
