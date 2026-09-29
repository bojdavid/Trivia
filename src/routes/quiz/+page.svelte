<script lang="ts">
  import "$lib/styles/app.css";
  import QuizGame from "$lib/components/quiz/QuizGame.svelte";

  let { data } = $props();
  let questions = $derived(data.questions);
</script>

<div class="pattern-bg min-h-screen">
  {#if questions && questions.length > 0}
    <QuizGame 
      {questions} 
      timerType="countdown" 
      initialTime={60} 
      quizTitle="Trivia Engine" 
    />
  {:else}
    <div class="min-h-screen flex items-center justify-center p-[var(--spacing-clamp-sm)]">
      <div class="theme-card p-[var(--spacing-clamp-lg)] rounded-2xl text-center max-w-lg border-4 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#fff]">
        <h3 class="text-[length:var(--text-clamp-2xl)] font-black text-primary-500 mb-[var(--spacing-clamp-sm)] uppercase">No Questions Loaded</h3>
        <p class="text-[length:var(--text-clamp-base)] text-black dark:text-white mb-[var(--spacing-clamp-lg)] font-bold">
          We couldn't load any questions for this category. Please try selecting a different subject.
        </p>
        <a href="/quizSelection" class="inline-block px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-black text-[length:var(--text-clamp-base)] uppercase tracking-wide border-4 border-black dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#fff] rounded-xl hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1a1a1a] dark:hover:shadow-[6px_6px_0px_#fff] transition-all">
          Go to Selection
        </a>
      </div>
    </div>
  {/if}
</div>
