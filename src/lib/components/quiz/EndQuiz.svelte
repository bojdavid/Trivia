<script lang="ts">
  import type { QuizQuestion } from "$lib/types/quiz";
  import EndQuizSummary from "./EndQuizSummary.svelte";
  import EndQuizReview from "./EndQuizReview.svelte";

  let { scoreCount, noOfQuestion, questions } = $props<{
    scoreCount: number;
    noOfQuestion: number;
    questions: QuizQuestion[];
  }>();

  const percentage = $derived(Math.round((scoreCount / noOfQuestion) * 100));

  function giveFeedback(percent: number) {
    if (percent >= 90) {
      return {
        title: "Quiz Master! 🔥",
        message: "Amazing! You have an outstanding grasp of this subject.",
        colorClass: "text-success-500 dark:text-success-400 bg-success-500/10 border-success-500/20",
      };
    } else if (percent >= 75) {
      return {
        title: "Great Job! 🎉",
        message: "Excellent! You've got a very solid knowledge base.",
        colorClass: "text-primary-500 dark:text-primary-400 bg-primary-500/10 border-primary-500/20",
      };
    } else if (percent >= 50) {
      return {
        title: "Passed! 👍",
        message: "Not bad! Keep practicing and you will do even better next time.",
        colorClass: "text-warning-500 dark:text-warning-400 bg-warning-500/10 border-warning-500/20",
      };
    } else if (percent >= 25) {
      return {
        title: "Keep Improving! 💡",
        message: "You are getting there. Review your answers below and try again!",
        colorClass: "text-orange-500 dark:text-orange-400 bg-orange-500/10 border-orange-500/20",
      };
    } else {
      return {
        title: "Beginner Stage! 🌱",
        message: "Every expert was once a beginner. Keep trying, you can do it!",
        colorClass: "text-error-500 dark:text-error-400 bg-error-500/10 border-error-500/20",
      };
    }
  }

  const feedback = $derived(giveFeedback(percentage));
</script>

<div class="space-y-10 w-full max-w-2xl mx-auto py-6">
  <EndQuizSummary 
    {scoreCount} 
    {noOfQuestion} 
    {percentage} 
    {feedback} 
  />

  <EndQuizReview {questions} />
</div>
