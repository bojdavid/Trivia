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

<div class="space-y-8">
  <!-- Statistics Dashboard -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
      <div class="text-xs text-surface-500 font-semibold uppercase">Total Available</div>
      <div class="text-2xl font-black text-surface-900 dark:text-white mt-1">{totalQuestions}</div>
    </div>
    <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
      <div class="text-xs text-success-500 font-semibold uppercase">Easy</div>
      <div class="text-2xl font-black text-success-400 mt-1">{countData.total_easy_question_count}</div>
    </div>
    <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
      <div class="text-xs text-warning-500 font-semibold uppercase">Medium</div>
      <div class="text-2xl font-black text-warning-400 mt-1">{countData.total_medium_question_count}</div>
    </div>
    <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
      <div class="text-xs text-error-500 font-semibold uppercase">Hard</div>
      <div class="text-2xl font-black text-error-400 mt-1">{countData.total_hard_question_count}</div>
    </div>
  </div>

  <!-- Range Slider Section -->
  <div class="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
    <label for="question-slider" class="text-sm font-semibold text-surface-500 mb-2">
      Select number of questions to load (Max 50 due to API limits):
    </label>
    
    <div class="text-5xl font-black text-primary-500 tracking-tight my-4">
      {selectedQuestionRange}
    </div>

    <input
      id="question-slider"
      type="range"
      min={Math.min(5, maxAvailable)}
      max={maxAvailable}
      step="1"
      class="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500 my-4"
      bind:value={selectedQuestionRange}
    />
    
    <div class="w-full flex justify-between text-xs text-surface-500 px-1">
      <span>{Math.min(5, maxAvailable)} Qs</span>
      <span>{maxAvailable} Qs</span>
    </div>
  </div>

  <!-- Presets Buttons Section -->
  <div class="space-y-3">
    <h5 class="text-sm font-bold text-surface-600 dark:text-surface-400">Quick Presets</h5>
    <div class="flex flex-wrap gap-2">
      {#each presets as preset}
        <button
          type="button"
          class="px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200
                 {selectedQuestionRange === preset
                   ? 'bg-secondary-500 border-secondary-500 text-white shadow-md'
                   : 'bg-white/5 border-white/10 hover:bg-white/10 text-surface-700 dark:text-surface-200'}"
          onclick={() => selectRange(preset)}
        >
          {preset} Questions
        </button>
      {/each}
    </div>
  </div>

  <!-- Footer Actions -->
  <div class="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-white/10">
    <button
      type="button"
      class="px-6 py-4 rounded-xl border border-white/10 text-sm font-bold hover:bg-white/5 transition-all text-center"
      onclick={goBack}
    >
      &larr; Choose Another Subject
    </button>
    <button
      type="button"
      class="px-8 py-4 rounded-xl bg-primary-500 hover:bg-primary-600 active:scale-95 font-bold transition-all shadow-lg shadow-primary-500/20 text-white text-center"
      onclick={startQuiz}
    >
      Start Trivia Quiz &rarr;
    </button>
  </div>
</div>
