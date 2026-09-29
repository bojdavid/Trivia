<script lang="ts">
  let {
    selectedQuestionRange = $bindable(10),
    selectRange,
    startQuiz,
    goBack,
    questionsData,
  } = $props<{
    selectedQuestionRange: number;
    selectRange: (range: number) => void;
    startQuiz: () => void;
    goBack: () => void;
    questionsData: any;
  }>();

  const countData = $derived(questionsData.category_question_count);
  const totalQuestions = $derived(countData.total_question_count);
  
  // OpenTDB limit is 50 questions per API request
  const maxAvailable = $derived(Math.min(50, totalQuestions));

  // Generate preset options up to the max available
  let presets: number[] = $derived.by(() => {
    const defaultPresets = [5, 10, 15, 20, 30, 50];
    const filtered = defaultPresets.filter(n => n <= totalQuestions);
    // If the category has very few questions and doesn't match default list, ensure at least some presets
    if (filtered.length === 0) {
      return [totalQuestions];
    }
    // Append the total questions as a preset if it's less than 50 and not already present
    if (totalQuestions < 50 && !filtered.includes(totalQuestions)) {
      filtered.push(totalQuestions);
    }
    return filtered.sort((a, b) => a - b);
  });

  // Keep selected range in bound of current subject limit
  $effect(() => {
    if (selectedQuestionRange > maxAvailable) {
      selectedQuestionRange = maxAvailable;
    } else if (selectedQuestionRange < 5 && maxAvailable >= 5) {
      selectedQuestionRange = 5;
    } else if (maxAvailable < 5) {
      selectedQuestionRange = maxAvailable;
    }
  });
</script>

<div class="space-y-[var(--spacing-clamp-lg)]">
  <!-- Statistics Dashboard -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-[var(--spacing-clamp-sm)]">
    <div class="p-[var(--spacing-clamp-sm)] rounded-xl bg-white dark:bg-black border-4 border-black dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#fff] text-center">
      <div class="text-[length:var(--text-clamp-sm)] text-primary-500 font-bold uppercase">Total Available</div>
      <div class="text-[length:var(--text-clamp-4xl)] font-black text-black dark:text-white mt-1 leading-none">{totalQuestions}</div>
    </div>
    <div class="p-[var(--spacing-clamp-sm)] rounded-xl bg-white dark:bg-black border-4 border-black dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#fff] text-center">
      <div class="text-[length:var(--text-clamp-sm)] text-green-500 font-bold uppercase">Easy</div>
      <div class="text-[length:var(--text-clamp-2xl)] font-black text-green-600 dark:text-green-400 mt-2">{countData.total_easy_question_count}</div>
    </div>
    <div class="p-[var(--spacing-clamp-sm)] rounded-xl bg-white dark:bg-black border-4 border-black dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#fff] text-center">
      <div class="text-[length:var(--text-clamp-sm)] text-yellow-500 font-bold uppercase">Medium</div>
      <div class="text-[length:var(--text-clamp-2xl)] font-black text-yellow-600 dark:text-yellow-400 mt-2">{countData.total_medium_question_count}</div>
    </div>
    <div class="p-[var(--spacing-clamp-sm)] rounded-xl bg-white dark:bg-black border-4 border-black dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#fff] text-center">
      <div class="text-[length:var(--text-clamp-sm)] text-primary-500 font-bold uppercase">Hard</div>
      <div class="text-[length:var(--text-clamp-2xl)] font-black text-primary-600 dark:text-primary-400 mt-2">{countData.total_hard_question_count}</div>
    </div>
  </div>

  <!-- Range Slider Section -->
  <div class="p-[var(--spacing-clamp-md)] rounded-xl bg-white dark:bg-black border-4 border-black dark:border-white shadow-[6px_6px_0px_#e60000] flex flex-col items-center">
    <label for="question-slider" class="text-[length:var(--text-clamp-base)] font-bold text-black dark:text-white mb-2 uppercase text-center">
      Number of Questions (Max 50):
    </label>
    
    <div class="text-[length:var(--text-clamp-7xl)] font-black text-primary-500 tracking-tight my-[var(--spacing-clamp-sm)] leading-none">
      {selectedQuestionRange}
    </div>

    <input
      id="question-slider"
      type="range"
      min={Math.min(5, maxAvailable)}
      max={maxAvailable}
      step="1"
      class="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-primary-500 my-4 outline-none focus:ring-4 focus:ring-primary-500/50"
      bind:value={selectedQuestionRange}
    />
    
    <div class="w-full flex justify-between text-[length:var(--text-clamp-sm)] font-bold text-black dark:text-white px-1">
      <span>{Math.min(5, maxAvailable)} Qs</span>
      <span>{maxAvailable} Qs</span>
    </div>
  </div>

  <!-- Presets Buttons Section -->
  <div class="space-y-4">
    <h5 class="text-[length:var(--text-clamp-base)] font-black text-black dark:text-white uppercase tracking-wider text-center">Quick Presets</h5>
    <div class="flex flex-wrap gap-[var(--spacing-clamp-sm)] justify-center">
      {#each presets as preset}
        <button
          type="button"
          class="px-6 py-3 rounded-xl border-4 font-black text-[length:var(--text-clamp-base)] transition-all duration-200 uppercase
                 {selectedQuestionRange === preset
                   ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black shadow-[4px_4px_0px_#e60000] scale-105'
                   : 'bg-white dark:bg-black border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white text-black dark:text-white hover:shadow-[4px_4px_0px_#1a1a1a] dark:hover:shadow-[4px_4px_0px_#fff] hover:-translate-y-1'}"
          onclick={() => selectRange(preset)}
        >
          {preset} Qs
        </button>
      {/each}
    </div>
  </div>

  <!-- Footer Actions -->
  <div class="flex flex-col sm:flex-row justify-between gap-[var(--spacing-clamp-md)] pt-[var(--spacing-clamp-md)] border-t-4 border-black/10 dark:border-white/10">
    <button
      type="button"
      class="px-6 py-4 rounded-xl border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white text-[length:var(--text-clamp-base)] font-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1a1a1a] dark:hover:shadow-[4px_4px_0px_#fff] transition-all text-center uppercase"
      onclick={goBack}
    >
      &larr; Back
    </button>
    <button
      type="button"
      class="px-8 py-4 rounded-xl bg-primary-500 border-4 border-black dark:border-white hover:bg-primary-600 active:scale-95 font-black text-[length:var(--text-clamp-lg)] transition-all shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#fff] text-white text-center uppercase"
      onclick={startQuiz}
    >
      Start Quiz &rarr;
    </button>
  </div>
</div>
