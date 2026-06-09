<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import IconCheck from "@lucide/svelte/icons/check";
  import IconX from "@lucide/svelte/icons/x";
  import IconHelpCircle from "@lucide/svelte/icons/help-circle";

  interface QuizQuestion {
    ID: number;
    Question: string;
    CorrectOption: string;
    OptionA: string;
    OptionB: string;
    OptionC: string;
    OptionD: string;
    AnswerExplanation?: string;
    Category: string;
    answered?: boolean;
    view_correct_ans?: boolean;
    choice?: string;
    id?: number;
  }

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
  <!-- Question Content Card with slide animation -->
  <div class="relative flex-1 overflow-hidden">
    {#key questionNum}
      <div
        class="w-full py-4"
        in:fly={{ x: 300, duration: 400 }}
        out:fly={{ x: -300, duration: 400 }}
      >
        <!-- Question Title -->
        <h3 class="text-xl md:text-2xl font-bold text-surface-900 dark:text-white leading-relaxed mb-6">
          {question.Question}
        </h3>

        <!-- Options List -->
        <div class="space-y-3.5">
          {#each options as opt}
            {@const isSelected = question.choice === opt.option}
            {@const isCorrect = opt.option === question.CorrectOption}
            {@const showFeedback = viewCorrect || question.view_correct_ans}

             {#if !showFeedback}
              <!-- Normal Play State -->
              <button
                type="button"
                class="w-full p-4 rounded-xl border text-left flex items-center transition-all duration-200 group
                       {isSelected 
                         ? 'bg-primary-500/10 border-primary-500 text-primary-700 dark:text-primary-300 font-medium' 
                         : 'bg-slate-100 border-slate-200 hover:bg-slate-200 hover:border-slate-300 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20'}"
                onclick={() => selectOption(opt.option)}
              >
                <span class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm mr-4 transition-colors
                             {isSelected 
                               ? 'bg-primary-500 text-white' 
                               : 'bg-slate-200 text-surface-700 group-hover:bg-slate-300 dark:bg-white/10 dark:text-surface-300 dark:group-hover:bg-white/20'}"
                >
                  {opt.option}
                </span>
                <span class="flex-1 text-sm md:text-base leading-snug">{opt.text}</span>
              </button>
            {:else}
              <!-- Reveal Answers State -->
              <div
                class="w-full p-4 rounded-xl border text-left flex items-center transition-all duration-300
                       {isCorrect
                         ? 'bg-success-500/10 border-success-500 text-success-700 dark:text-success-400 font-medium shadow-md shadow-success-500/5'
                         : isSelected
                           ? 'bg-error-500/10 border-error-500/80 text-error-700 dark:text-error-400'
                           : 'bg-white/5 border-white/10 opacity-60'}"
                transition:fade={{ duration: 200 }}
              >
                <!-- Badge symbol / icon -->
                <span class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm mr-4 text-white
                             {isCorrect 
                               ? 'bg-success-500' 
                               : isSelected 
                                 ? 'bg-error-500' 
                                 : 'bg-white/10 text-surface-400'}"
                >
                  {#if isCorrect}
                    <IconCheck size="16" />
                  {:else if isSelected}
                    <IconX size="16" />
                  {:else}
                    {opt.option}
                  {/if}
                </span>
                
                <span class="flex-1 text-sm md:text-base leading-snug">{opt.text}</span>
                
                <!-- Feedback message text -->
                {#if isCorrect}
                  <span class="text-xs font-bold text-success-500 uppercase tracking-wider ml-2">Correct</span>
                {:else if isSelected}
                  <span class="text-xs font-bold text-error-500 uppercase tracking-wider ml-2">Your Choice</span>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/key}
  </div>

  <!-- Explanations Box (If visible) -->
  {#if (viewCorrect || question.view_correct_ans) && question.AnswerExplanation}
    <div class="mt-4 p-4 rounded-2xl bg-primary-500/5 border border-primary-500/10 text-sm" transition:fade>
      <div class="flex items-start gap-2.5">
        <IconHelpCircle size="18" class="text-primary-500 mt-0.5 flex-shrink-0" />
        <div>
          <span class="font-bold text-primary-500 block mb-1">Explanation</span>
          <p class="text-surface-600 dark:text-surface-300 leading-relaxed">{question.AnswerExplanation}</p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Action buttons navigation (Prev / Skip / View Correct Answer / Next) -->
  <div class="w-full pt-8 mt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
    <div class="flex gap-2">
      <!-- Prev Button -->
      {#if questionNum > 0}
        <button
          type="button"
          class="px-5 py-3 rounded-xl border border-white/10 text-sm font-bold hover:bg-white/5 active:scale-95 transition-all text-center"
          onclick={goToPrevQuestion}
        >
          Previous
        </button>
      {/if}

      <!-- View Correct Answer Button -->
      <button
        type="button"
        class="px-5 py-3 rounded-xl border border-primary-500/20 text-sm font-bold hover:bg-primary-500/5 text-primary-500 dark:text-primary-400 active:scale-95 transition-all text-center"
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
      class="px-8 py-3 rounded-xl font-bold active:scale-95 transition-all text-center text-white
             {question.choice 
               ? 'bg-secondary-500 hover:bg-secondary-600 shadow-md shadow-secondary-500/20' 
               : 'bg-white/10 hover:bg-white/15'}"
      onclick={goToNextQuestion}
    >
      {#if question.choice}
        Next Question &rarr;
      {:else}
        Skip Question
      {/if}
    </button>
  </div>
</div>
