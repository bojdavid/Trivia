<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import QuizContainer from "./QuizContainer.svelte";
  import QuestionsNavigation from "./QuestionsNavigation.svelte";
  import EndQuiz from "./EndQuiz.svelte";
  import LightSwitch from "$lib/components/LightSwitch.svelte";
  
  // Lucide Icons
  import IconClock from "@lucide/svelte/icons/clock";
  import IconFlag from "@lucide/svelte/icons/flag";
  import IconChevronLeft from "@lucide/svelte/icons/chevron-left";

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
    questions = [],
    timerType = 'countdown',
    initialTime = 60,
    quizTitle = "Trivia Quiz"
  } = $props<{
    questions: QuizQuestion[];
    timerType: 'countdown' | 'countup';
    initialTime: number;
    quizTitle?: string;
  }>();

  // Core gameplay reactive state
  let questionNum = $state(0);
  let viewCorrect = $state(false);
  let stopQuiz = $state(false);
  let scoreCount = $state(0);
  // svelte-ignore state_referenced_locally
  let timeLeft = $state(initialTime);
  let timerInterval: any = null;

  // Initialize helper properties on questions
  $effect(() => {
    questions.forEach((q: QuizQuestion, idx: number) => {
      if (q.answered === undefined) q.answered = false;
      if (q.view_correct_ans === undefined) q.view_correct_ans = false;
      if (q.choice === undefined) q.choice = "";
      if (q.id === undefined) q.id = idx;
    });
  });

  // Start timer on mount
  onMount(() => {
    timerInterval = setInterval(() => {
      if (timerType === 'countdown') {
        if (timeLeft > 0) {
          timeLeft--;
        } else {
          endQuiz();
        }
      } else {
        timeLeft++;
      }
    }, 1000);
  });

  // Clean up timer on destroy
  onDestroy(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  });

  const goToNextQuestion = (): void => {
    if (questionNum < questions.length - 1) {
      questionNum++;
      viewCorrect = false;
    } else {
      // Prompt user to finish if they've navigated to the end
      endQuiz();
    }
  };

  const goToPrevQuestion = (): void => {
    if (questionNum > 0) {
      questionNum--;
      viewCorrect = false;
    }
  };

  const goToQuestion = (id: number): void => {
    questionNum = id;
    viewCorrect = false;
  };

  const viewCorrectAns = (question: QuizQuestion): void => {
    question.view_correct_ans = true;
    viewCorrect = true;
  };

  const endQuiz = (): void => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    stopQuiz = true;
    scoreCount = 0;
    questions.forEach((q: QuizQuestion) => {
      if (q.choice === q.CorrectOption) {
        scoreCount++;
      }
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
</script>

<div class="min-h-screen flex flex-col justify-between p-6">
  <!-- Top Navigation Header -->
  <header class="w-full max-w-3xl mx-auto flex justify-between items-center py-4">
    <a 
      href="/" 
      class="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold text-sm"
      onclick={(e) => {
        if (!stopQuiz && !confirm("Are you sure you want to quit this quiz? Your progress will be lost.")) {
          e.preventDefault();
        }
      }}
    >
      <IconChevronLeft size="16" /> Quit Quiz
    </a>
    
    <div class="p-1 rounded-full bg-surface-100/10 backdrop-blur-md border border-white/10">
      <LightSwitch />
    </div>
  </header>

  <!-- Gameplay area -->
  <main class="w-full max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center my-6">
    {#if stopQuiz}
      <div class="w-full glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
        <EndQuiz {scoreCount} noOfQuestion={questions.length} {questions} />
      </div>
    {:else}
      <div class="w-full space-y-6">
        <!-- Control HUD Card -->
        <div class="w-full glass-card p-5 rounded-2xl flex items-center justify-between">
          <div class="space-y-1">
            <span class="text-xs font-bold text-surface-500 uppercase tracking-wider">{quizTitle}</span>
            <div class="text-lg font-black text-surface-900 dark:text-white">
              Question {questionNum + 1} <span class="text-surface-500 font-normal">of {questions.length}</span>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <!-- Timer Display -->
            <div class="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-black transition-all
                        {timerType === 'countdown' && timeLeft < 15 
                          ? 'border-error-500/30 bg-error-500/10 text-error-500 animate-pulse' 
                          : 'border-white/10 bg-white/5 text-surface-800 dark:text-white'}">
              <IconClock size="16" class={timerType === 'countdown' && timeLeft < 15 ? 'text-error-500' : 'text-primary-500'} />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <!-- End Quiz Button -->
            <button
              class="px-4 py-2 rounded-xl bg-error-500/10 hover:bg-error-500/20 text-error-500 border border-error-500/20 text-sm font-bold active:scale-95 transition-all flex items-center gap-1.5"
              onclick={endQuiz}
            >
              <IconFlag size="14" /> End
            </button>
          </div>
        </div>

        <!-- Custom Progress Bar -->
        <div class="w-full bg-white/10 dark:bg-white/5 rounded-full h-2 overflow-hidden shadow-inner">
          <div 
            class="bg-primary-500 h-full rounded-full transition-all duration-300 shadow-md shadow-primary-500/50" 
            style="width: {((questionNum + 1) / questions.length) * 100}%"
          ></div>
        </div>

        <!-- Main Question Card Container -->
        <div class="w-full glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
          {#if questions.length > 0}
            <QuizContainer
              question={questions[questionNum]}
              {viewCorrect}
              {goToNextQuestion}
              {goToPrevQuestion}
              {questionNum}
              {viewCorrectAns}
            />
          {/if}
        </div>

        <!-- Questions Index Navigator -->
        {#if questions.length > 0}
          <div class="w-full glass-card p-5 rounded-2xl">
            <QuestionsNavigation
              {questions}
              {questionNum}
              {goToQuestion}
            />
          </div>
        {/if}
      </div>
    {/if}
  </main>

  <!-- Footer spacing -->
  <div class="py-4"></div>
</div>
