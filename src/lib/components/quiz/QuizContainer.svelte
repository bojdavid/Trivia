<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import IconCheck from "@lucide/svelte/icons/check";
  import IconX from "@lucide/svelte/icons/x";
  import IconHelpCircle from "@lucide/svelte/icons/help-circle";

  import type { QuizQuestion } from "$lib/types/quiz";
  import QuizOptionItem from "./QuizOptionItem.svelte";

  let {
    question,
    viewCorrect,
    goToNextQuestion,
    goToPrevQuestion,
    questionNum,
    viewCorrectAns,
    onSelectOption,
  } = $props<{
    question: QuizQuestion;
    viewCorrect: boolean;
    goToNextQuestion: () => void;
    goToPrevQuestion: () => void;
    questionNum: number;
    viewCorrectAns: (question: QuizQuestion) => void;
    onSelectOption: (opt: string) => void;
  }>();

  interface QuizOption {
    option: string;
    text: string;
  }

  // Derive options directly from the reactive question prop
  let options: QuizOption[] = $derived([
    { option: "A", text: question.OptionA },
    { option: "B", text: question.OptionB },
    { option: "C", text: question.OptionC },
    { option: "D", text: question.OptionD },
  ]);

  const selectOption = (opt: string) => {
    onSelectOption(opt);
  };
</script>

<div class="w-full flex flex-col justify-between min-h-[480px]">
  <!-- Question Content Card with smooth slide animation via grid stacking -->
  <div class="relative flex-1 grid overflow-visible">
    {#key questionNum}
      <div
        class="col-start-1 row-start-1 w-full py-4"
        in:fly={{ x: 50, duration: 400, opacity: 0, easing: cubicOut, delay: 150 }}
        out:fly={{ x: -50, duration: 300, opacity: 0, easing: cubicOut }}
      >
        <!-- Question Title -->
        <h3 class="text-[length:var(--text-clamp-xl)] font-black text-black dark:text-white leading-relaxed mb-[var(--spacing-clamp-md)]">
          {question.Question}
        </h3>

        <!-- Options List -->
        <div class="space-y-[var(--spacing-clamp-sm)]">
          {#each options as opt}
            <QuizOptionItem
              {opt}
              isSelected={question.choice === opt.option}
              isCorrect={opt.option === question.CorrectOption}
              showFeedback={viewCorrect || (question.view_correct_ans ?? false)}
              selectOption={() => selectOption(opt.option)}
            />
          {/each}
        </div>
      </div>
    {/key}
  </div>

  <!-- Explanations Box (If visible) -->
  {#if (viewCorrect || question.view_correct_ans) && question.AnswerExplanation}
    <div class="mt-[var(--spacing-clamp-md)] p-[var(--spacing-clamp-sm)] rounded-2xl bg-white dark:bg-black border-4 border-black dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#fff]" transition:fade>
      <div class="flex items-start gap-[var(--spacing-clamp-sm)]">
        <IconHelpCircle size="24" class="text-primary-500 mt-1 flex-shrink-0" />
        <div>
          <span class="font-black text-primary-500 block mb-2 uppercase text-[length:var(--text-clamp-sm)]">Explanation</span>
          <p class="text-black dark:text-white font-medium text-[length:var(--text-clamp-base)] leading-relaxed">{question.AnswerExplanation}</p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Action buttons navigation (Prev / Skip / View Correct Answer / Next) -->
  <div class="w-full pt-[var(--spacing-clamp-md)] mt-[var(--spacing-clamp-md)] border-t-4 border-black/10 dark:border-white/10 flex flex-col sm:flex-row gap-[var(--spacing-clamp-sm)] items-stretch sm:items-center justify-between">
    <div class="flex flex-wrap gap-[var(--spacing-clamp-sm)]">
      <!-- Prev Button -->
      {#if questionNum > 0}
        <button
          type="button"
          class="px-6 py-3 rounded-xl border-4 border-black dark:border-white bg-white dark:bg-black text-[length:var(--text-clamp-sm)] font-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1a1a1a] dark:hover:shadow-[4px_4px_0px_#fff] active:scale-95 transition-all text-center uppercase"
          onclick={goToPrevQuestion}
        >
          Previous
        </button>
      {/if}

      <!-- View Correct Answer Button -->
      <button
        type="button"
        class="px-6 py-3 rounded-xl border-4 border-primary-500 bg-white dark:bg-black text-primary-500 text-[length:var(--text-clamp-sm)] font-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_#e60000] active:scale-95 transition-all text-center uppercase"
        onclick={() => viewCorrectAns(question)}
      >
        {#if !(viewCorrect || question.view_correct_ans)}
          Reveal Answer
        {:else}
          View Explanation
        {/if}
      </button>
    </div>

    <!-- Next / Skip Button -->
    <button
      type="button"
      class="px-8 py-3 rounded-xl font-black text-[length:var(--text-clamp-base)] active:scale-95 border-4 uppercase tracking-wide transition-all text-center
             {question.choice 
               ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black shadow-[4px_4px_0px_#e60000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#e60000]' 
               : 'bg-gray-200 dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700'}"
      onclick={goToNextQuestion}
    >
      {#if question.choice}
        Next Question &rarr;
      {:else}
        Skip
      {/if}
    </button>
  </div>
</div>
