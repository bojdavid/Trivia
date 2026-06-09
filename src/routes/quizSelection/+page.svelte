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

<div class="min-h-screen flex flex-col justify-between p-6">
  <!-- Header -->
  <header class="w-full max-w-5xl mx-auto flex justify-between items-center py-4">
    <a href="/" class="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold text-sm">
      <IconChevronLeft size="16" /> Back Home
    </a>
    
    <div class="p-1 rounded-full bg-surface-100/10 backdrop-blur-md border border-white/10">
      <LightSwitch />
    </div>
  </header>

  <!-- Selection Container -->
  <main class="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center my-8">
    <div class="w-full max-w-3xl text-center mb-8">
      <h2 class="text-4xl md:text-5xl font-black tracking-tight mb-2 font-heading">
        {#if !quizSelectionState.selectQuestionRange}
          Select a <span class="gradient-text">Subject</span>
        {:else}
          Choose <span class="gradient-text">Question Count</span>
        {/if}
      </h2>
      <p class="text-sm text-surface-500">
        {#if !quizSelectionState.selectQuestionRange}
          Select one topic from the categorized subjects list below to test your skills.
        {:else}
          Adjust the slider or pick a preset count to determine your challenge size.
        {/if}
      </p>
    </div>

    <!-- Interactive Selection Card -->
    <div class="w-full max-w-3xl glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
      {#await fetchSubjects}
        <div class="flex flex-col items-center justify-center py-20 space-y-4">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
          <p class="text-sm font-medium text-surface-500">Fetching available categories...</p>
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
            <div class="flex flex-col items-center justify-center py-20 space-y-4">
              <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary-500"></div>
              <p class="text-sm font-medium text-surface-500">Retrieving question counts from database...</p>
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
        <div class="p-6 rounded-2xl bg-error-500/10 border border-error-500/20 text-center">
          <h4 class="text-lg font-bold text-error-400 mb-1">Failed to connect to API</h4>
          <p class="text-sm text-surface-500 mb-4">{error.message}</p>
          <button 
            class="px-6 py-2.5 bg-error-500 text-white font-semibold rounded-xl hover:bg-error-600 transition" 
            onclick={() => location.reload()}
          >
            Retry Connection
          </button>
        </div>
      {/await}
    </div>
  </main>

  <!-- Footer spacing -->
  <div class="py-4"></div>
</div>
