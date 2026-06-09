<script lang="ts">
  import "$lib/styles/app.css";
  import QuizGame from "$lib/components/quiz/QuizGame.svelte";

  let { data } = $props();
  let questions = $derived(data.questions);
</script>

{#if questions && questions.length > 0}
  <QuizGame 
    {questions} 
    timerType="countup" 
    initialTime={0} 
    quizTitle="CSC413 Course Practice Quiz" 
  />
{:else}
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="glass-card p-8 rounded-3xl text-center max-w-sm">
      <h3 class="text-xl font-bold text-error-500 mb-2">No Questions Loaded</h3>
      <p class="text-sm text-surface-500 mb-6">We couldn't load the local CSC413 curriculum questions. Please check the local data files.</p>
      <a href="/" class="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition">
        Go Back Home
      </a>
    </div>
  </div>
{/if}
