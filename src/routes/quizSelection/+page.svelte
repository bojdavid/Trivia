<script lang="ts">
  import "../../lib/styles/app.css";
  import SelectSubject from "$lib/components/quizSelection/SelectSubject.svelte";
  import SelectQuestionRange from "$lib/components/quizSelection/SelectQuestionRange.svelte";
  import { quizSelectionState } from "./quizSelection.svelte";
  import { getSubjects } from "$lib/api/question";
  import IconChevronLeft from "@lucide/svelte/icons/chevron-left";
  import LightSwitch from "$lib/components/LightSwitch.svelte";

  interface Subject {
    name: string;
    id: number;
  }

  // Load the subjects promise
  const fetchSubjects = getSubjects([]);

  const pickSubject = (subj: Subject): void => {
    quizSelectionState.selectedSubject = subj;
  };

  const selectRange = (range: number): void => {
    quizSelectionState.selectedQuestionRange = range;
  };

  const goBack = (): void => {
    quizSelectionState.selectQuestionRange = false;
  };
</script>

<div class="min-h-screen flex flex-col justify-between p-[var(--spacing-clamp-sm)] pattern-bg">
  <!-- Header -->
  <header class="w-full max-w-5xl mx-auto flex justify-between items-center py-[var(--spacing-clamp-sm)]">
    <a href="/" class="flex items-center gap-[var(--spacing-clamp-sm)] px-4 py-2 rounded-xl bg-white dark:bg-black border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#e60000] transition-all font-bold text-[length:var(--text-clamp-base)] text-black dark:text-white">
      <IconChevronLeft size="20" /> Back Home
    </a>
    
    <div class="p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
      <LightSwitch />
    </div>
  </header>

  <!-- Selection Container -->
  <main class="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center my-[var(--spacing-clamp-lg)]">
    <div class="w-full max-w-3xl text-center mb-[var(--spacing-clamp-lg)] animate-slide-up">
      <h2 class="text-[length:var(--text-clamp-4xl)] font-black tracking-tight mb-[var(--spacing-clamp-sm)] font-heading uppercase text-black dark:text-white">
        {#if !quizSelectionState.selectQuestionRange}
          Select a <span class="gradient-text-theme">Subject</span>
        {:else}
          Choose <span class="gradient-text-theme">Question Count</span>
        {/if}
      </h2>
      <p class="text-[length:var(--text-clamp-lg)] text-secondary-600 dark:text-gray-300 font-medium">
        {#if !quizSelectionState.selectQuestionRange}
          Select one topic from the categorized subjects list below to test your skills.
        {:else}
          Adjust the slider or pick a preset count to determine your challenge size.
        {/if}
      </p>
    </div>

    <!-- Interactive Selection Card -->
    <div class="w-full max-w-4xl theme-card p-[var(--spacing-clamp-md)] rounded-2xl relative overflow-hidden animate-slide-up delay-100">
      {#await fetchSubjects}
        <div class="flex flex-col items-center justify-center py-[var(--spacing-clamp-lg)] space-y-[var(--spacing-clamp-sm)]">
          <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-500"></div>
          <p class="text-[length:var(--text-clamp-base)] font-bold text-secondary-600 dark:text-white">Fetching available categories...</p>
        </div>
      {:then subjects}
        {#if !quizSelectionState.selectQuestionRange}
          <SelectSubject
            {subjects}
            {pickSubject}
            selectSubject={quizSelectionState.selectSubject}
            selectedSubject={quizSelectionState.selectedSubject.id ? quizSelectionState.selectedSubject : null}
          />
        {:else}
          {#await quizSelectionState.subjectData}
            <div class="flex flex-col items-center justify-center py-[var(--spacing-clamp-lg)] space-y-[var(--spacing-clamp-sm)]">
              <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-secondary-500 dark:border-white"></div>
              <p class="text-[length:var(--text-clamp-base)] font-bold text-secondary-600 dark:text-white">Retrieving question counts...</p>
            </div>
          {:then questionsData}
            <SelectQuestionRange
              bind:selectedQuestionRange={quizSelectionState.selectedQuestionRange}
              {selectRange}
              startQuiz={quizSelectionState.startQuiz}
              {goBack}
              {questionsData}
            />
          {/await}
        {/if}
      {:catch error}
        <div class="p-[var(--spacing-clamp-md)] rounded-xl bg-primary-500/10 border-4 border-primary-500 text-center shadow-[4px_4px_0px_#e60000]">
          <h4 class="text-[length:var(--text-clamp-2xl)] font-bold text-primary-500 mb-2">Failed to connect to API</h4>
          <p class="text-[length:var(--text-clamp-base)] text-black dark:text-white mb-[var(--spacing-clamp-md)] font-medium">{error.message}</p>
          <button 
            class="px-8 py-3 bg-primary-500 text-white font-bold text-[length:var(--text-clamp-base)] rounded-xl hover:bg-primary-600 border-2 border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] dark:hover:shadow-[6px_6px_0px_#fff] transition-all" 
            onclick={() => location.reload()}
          >
            Retry Connection
          </button>
        </div>
      {/await}
    </div>
  </main>

  <!-- Footer spacing -->
  <div class="py-[var(--spacing-clamp-md)]"></div>
</div>
