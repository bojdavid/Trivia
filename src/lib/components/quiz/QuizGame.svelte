<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { goto } from "$app/navigation";
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import QuizContainer from "./QuizContainer.svelte";
  import EndQuiz from "./EndQuiz.svelte";
  import ConfirmModal from "$lib/components/ConfirmModal.svelte";
  import type { QuizQuestion } from "$lib/types/quiz";
  import QuizHeader from "./QuizHeader.svelte";
  import QuizHUD from "./QuizHUD.svelte";
  import QuizSidebar from "./QuizSidebar.svelte";
  import QuizProgressBar from "./QuizProgressBar.svelte";

  let {
    questions: initialQuestions = [],
    quizTitle = "Untitled Quiz",
    initialTime = 600,
    timerType = "countdown",
  } = $props<{
    questions: QuizQuestion[];
    quizTitle?: string;
    initialTime?: number;
    timerType?: "countdown" | "countup";
  }>();

  // svelte-ignore state_referenced_locally
  let questions = $state(initialQuestions.map((q: QuizQuestion) => ({ ...q })));
  let questionNum = $state(0);
  let viewCorrect = $state(false);
  let stopQuiz = $state(false);
  // svelte-ignore state_referenced_locally
  let timeLeft = $state(initialTime);
  let timerInterval: any = null;
  let showNavigation = $state(false);
  let showQuitModal = $state(false);
  let showSubmitModal = $state(false);

  let scoreCount = $derived(questions.filter((q: QuizQuestion) => q.choice === q.CorrectOption).length);

  // Initialize helper properties on questions
  $effect(() => {
    if (questions && questions.length > 0) {
      questions.forEach((q: QuizQuestion, index: number) => {
        if (q.id === undefined) {
          q.id = index;
        }
      });
    }
  });

  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (stopQuiz) {
        clearInterval(timerInterval);
        return;
      }
      if (timerType === "countdown") {
        if (timeLeft > 0) timeLeft -= 1;
        else endQuiz();
      } else {
        timeLeft += 1;
      }
    }, 1000);
  };

  onMount(() => {
    startTimer();
  });

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
  });

  const nextQuestion = () => {
    if (questionNum < questions.length - 1) {
      questionNum += 1;
      viewCorrect = false;
    }
  };

  const prevQuestion = () => {
    if (questionNum > 0) {
      questionNum -= 1;
      viewCorrect = false;
    }
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      questionNum = index;
      viewCorrect = false;
    }
  };

  const endQuiz = () => {
    stopQuiz = true;
    if (timerInterval) clearInterval(timerInterval);
  };

  const toggleNavigation = () => {
    showNavigation = !showNavigation;
  };

  const handleQuit = () => {
    if (!stopQuiz) {
      showQuitModal = true;
    } else {
      goto("/");
    }
  };

  const handleSubmit = () => {
    showSubmitModal = true;
  };
</script>

<div class="min-h-screen flex flex-col justify-between p-[var(--spacing-clamp-sm)]">
  <QuizHeader onQuit={handleQuit} />

  <main class="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto my-[var(--spacing-clamp-md)] relative">
    {#if !stopQuiz && questions.length > 0}
      <div class="w-full space-y-[var(--spacing-clamp-md)]">
        <QuizHUD
          {quizTitle}
          {questionNum}
          totalQuestions={questions.length}
          {timerType}
          {timeLeft}
          hasQuestions={questions.length > 0}
          {toggleNavigation}
          endQuiz={handleSubmit}
        />

        <QuizProgressBar 
          {questionNum} 
          totalQuestions={questions.length} 
        />

        <!-- Main Question Card Container -->
        <div class="w-full relative mt-[var(--spacing-clamp-md)] overflow-hidden rounded-3xl min-h-[400px] grid grid-cols-1 grid-rows-1 items-start">
          {#key questionNum}
            <div
              in:fly={{ x: 200, duration: 400, delay: 100, easing: cubicOut }}
              out:fly={{ x: -200, duration: 400, easing: cubicOut }}
              class="w-full col-start-1 row-start-1"
            >
              <QuizContainer
                question={questions[questionNum]}
                {questionNum}
                {viewCorrect}
                goToNextQuestion={() => {
                  if (questionNum < questions.length - 1) {
                    nextQuestion();
                  } else {
                    handleSubmit();
                  }
                }}
                goToPrevQuestion={prevQuestion}
                viewCorrectAns={() => {
                  viewCorrect = true;
                  questions[questionNum].view_correct_ans = true;
                }}
                onSelectOption={(opt) => {
                  questions[questionNum].choice = opt;
                }}
              />
            </div>
          {/key}
        </div>
      </div>
    {:else if stopQuiz}
      <div in:fade={{ duration: 300, delay: 200 }} class="w-full">
        <EndQuiz {questions} {scoreCount} noOfQuestion={questions.length} />
      </div>
    {:else}
      <div class="theme-card p-12 text-center rounded-3xl w-full border-4">
        <h2 class="text-[length:var(--text-clamp-xl)] font-black uppercase text-black dark:text-white">
          No questions available
        </h2>
        <p class="mt-4 text-[length:var(--text-clamp-base)] text-gray-600 dark:text-gray-400 font-bold">
          Please select a valid subject and try again.
        </p>
      </div>
    {/if}
  </main>
</div>

<QuizSidebar
  {showNavigation}
  {questions}
  {questionNum}
  {toggleNavigation}
  {goToQuestion}
/>

<ConfirmModal 
  isOpen={showQuitModal}
  variant="danger"
  onConfirm={() => goto("/")}
  onCancel={() => showQuitModal = false}
/>

<ConfirmModal 
  isOpen={showSubmitModal}
  variant="positive"
  title="Submit Quiz?"
  message="Are you sure you want to submit your answers?"
  confirmText="Yes, Submit"
  onConfirm={() => {
    showSubmitModal = false;
    endQuiz();
  }}
  onCancel={() => showSubmitModal = false}
/>
