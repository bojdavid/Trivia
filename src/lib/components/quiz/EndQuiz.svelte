<script lang="ts">
  let { scoreCount, noOfQuestion } = $props();

  function giveFeedback(score: number, total: number) {
    const percentage = (score / total) * 100;

    if (percentage >= 90) {
      return "🔥 Amazing! You're a quiz master!";
    } else if (percentage >= 75) {
      return "🎉 Great job! You're doing really well!";
    } else if (percentage >= 50) {
      return "👍 Not bad! Keep practicing and you'll improve even more.";
    } else if (percentage >= 25) {
      return "💡 You're getting there! Don't give up!";
    } else {
      return "🌱 Every expert was once a beginner — keep trying, you've got this!";
    }
  }
  let feedBack: string = giveFeedback(scoreCount, noOfQuestion);
</script>

<div class="text-5xl text-center">
  You got
  <span class="text-tertiary-500">
    {scoreCount}
  </span>
  Right Out of
  <span class="text-secondary-500">
    {noOfQuestion}
  </span>

  <div class="text-xl">
    {feedBack}
  </div>
</div>
<div class="mt-10">
  <a
    href="/"
    class="text-tertiary-500 underline hover:text-tertiary-800 transition duration-300 ease-in-out"
    >Go back home</a
  >
</div>
