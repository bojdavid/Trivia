<script lang="ts">
  import IconCheckCircle from "@lucide/svelte/icons/check-circle";
  import IconAlertTriangle from "@lucide/svelte/icons/alert-triangle";
  import IconRefreshCw from "@lucide/svelte/icons/refresh-cw";
  import IconHome from "@lucide/svelte/icons/home";
  import IconInfo from "@lucide/svelte/icons/info";

  interface QuizQuestion {
    Question: string;
    CorrectOption: string;
    OptionA: string;
    OptionB: string;
    OptionC: string;
    OptionD: string;
    AnswerExplanation?: string;
    choice?: string;
  }

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
        colorClass:
          "text-success-500 dark:text-success-400 bg-success-500/10 border-success-500/20",
      };
    } else if (percent >= 75) {
      return {
        title: "Great Job! 🎉",
        message: "Excellent! You've got a very solid knowledge base.",
        colorClass:
          "text-primary-500 dark:text-primary-400 bg-primary-500/10 border-primary-500/20",
      };
    } else if (percent >= 50) {
      return {
        title: "Passed! 👍",
        message:
          "Not bad! Keep practicing and you will do even better next time.",
        colorClass:
          "text-warning-500 dark:text-warning-400 bg-warning-500/10 border-warning-500/20",
      };
    } else if (percent >= 25) {
      return {
        title: "Keep Improving! 💡",
        message:
          "You are getting there. Review your answers below and try again!",
        colorClass:
          "text-orange-500 dark:text-orange-400 bg-orange-500/10 border-orange-500/20",
      };
    } else {
      return {
        title: "Beginner Stage! 🌱",
        message:
          "Every expert was once a beginner. Keep trying, you can do it!",
        colorClass:
          "text-error-500 dark:text-error-400 bg-error-500/10 border-error-500/20",
      };
    }
  }

  const feedback = $derived(giveFeedback(percentage));
</script>

<div class="space-y-10 w-full max-w-2xl mx-auto py-6">
  <!-- Dashboard Summary Header -->
  <div
    class="glass-card p-8 rounded-3xl text-center relative overflow-hidden space-y-6"
  >
    <h2 class="text-3xl font-extrabold tracking-tight font-heading">
      Quiz Results
    </h2>

    <!-- Big Circle Percent Score -->
    <div class="relative w-40 h-40 mx-auto flex items-center justify-center">
      <!-- Outer Track Glow -->
      <div
        class="absolute inset-0 rounded-full bg-primary-500/5 animate-pulse"
      ></div>
      <!-- Radial Ring border indicator -->
      <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="currentColor"
          stroke-width="6"
          fill="transparent"
          class="text-white/10"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="currentColor"
          stroke-width="8"
          stroke-dasharray="264"
          stroke-dashoffset={264 - (264 * percentage) / 100}
          stroke-linecap="round"
          fill="transparent"
          class="text-primary-500 transition-all duration-1000 ease-out"
        />
      </svg>
      <div class="absolute flex flex-col items-center">
        <span
          class="text-4xl font-black text-surface-900 dark:text-white leading-none"
          >{percentage}%</span
        >
        <span class="text-xs text-surface-500 font-bold uppercase mt-1"
          >Score</span
        >
      </div>
    </div>

    <!-- Numeric Stats -->
    <div class="text-lg font-medium text-surface-700 dark:text-surface-200">
      You answered <span class="font-bold text-success-500">{scoreCount}</span>
      correct out of
      <span class="font-bold text-surface-400">{noOfQuestion}</span> questions.
    </div>

    <!-- Feedback Message Callout -->
    <div
      class="p-5 rounded-2xl border {feedback.colorClass} text-center space-y-1 max-w-md mx-auto"
    >
      <h4 class="font-bold font-heading text-lg">{feedback.title}</h4>
      <p class="text-xs md:text-sm opacity-90 leading-relaxed">
        {feedback.message}
      </p>
    </div>

    <!-- CTA Button grid -->
    <div
      class="flex flex-col sm:flex-row gap-3 pt-4 justify-center items-center"
    >
      <a
        href="/quizSelection"
        class="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold transition-all shadow-md shadow-primary-500/20 active:scale-95 flex items-center justify-center gap-2"
      >
        <IconRefreshCw size="16" /> Try Another Quiz
      </a>
      <a
        href="/"
        class="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-surface-700 dark:text-surface-200 font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <IconHome size="16" /> Go Home
      </a>
    </div>
  </div>

  <!-- Detail Review Section -->
  <div class="space-y-4">
    <h3
      class="text-xl font-bold font-heading tracking-tight text-surface-950 dark:text-white"
    >
      Question Review
    </h3>

    <div class="space-y-4">
      {#each questions as quest, index}
        {@const isCorrect = quest.choice === quest.CorrectOption}
        {@const isSkipped = !quest.choice}
        {@const correctAnswerText =
          quest[`Option${quest.CorrectOption}` as keyof QuizQuestion]}
        {@const userAnswerText = quest.choice
          ? quest[`Option${quest.choice}` as keyof QuizQuestion]
          : "Skipped"}

        <div
          class="p-5 rounded-2xl border transition-all
                    {isCorrect
            ? 'bg-success-500/5 border-success-500/20'
            : isSkipped
              ? 'bg-slate-100/10 border-slate-500/10'
              : 'bg-error-500/5 border-error-500/20'}"
        >
          <div class="flex items-start gap-3">
            <span
              class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5
                         {isCorrect
                ? 'bg-success-500/20 text-success-500'
                : isSkipped
                  ? 'bg-slate-100/10 text-surface-400'
                  : 'bg-error-500/20 text-error-500'}"
            >
              {index + 1}
            </span>
            <div class="flex-1 space-y-3">
              <h4
                class="font-bold text-surface-900 dark:text-white leading-snug"
              >
                {quest.Question}
              </h4>

              <!-- User selection & correct answers -->
              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm"
              >
                <!-- User Choice -->
                <div
                  class="p-3 rounded-xl bg-slate-100/5 border border-slate-500/10"
                >
                  <span
                    class="text-xs text-surface-500 font-semibold block uppercase mb-1"
                    >Your Selection</span
                  >
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-surface-900 dark:text-white"
                      >{quest.choice || "-"}</span
                    >
                    <span
                      class="leading-snug text-surface-700 dark:text-surface-300"
                      >{userAnswerText}</span
                    >
                    {#if isCorrect}
                      <IconCheckCircle
                        size="14"
                        class="text-success-500 flex-shrink-0"
                      />
                    {:else if !isSkipped}
                      <IconAlertTriangle
                        size="14"
                        class="text-error-500 flex-shrink-0"
                      />
                    {/if}
                  </div>
                </div>

                <!-- Correct Answer -->
                <div
                  class="p-3 rounded-xl bg-success-500/5 border border-success-500/10"
                >
                  <span
                    class="text-xs text-success-500 font-semibold block uppercase mb-1"
                    >Correct Answer</span
                  >
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-success-500"
                      >{quest.CorrectOption}</span
                    >
                    <span
                      class="leading-snug text-success-600 dark:text-success-400 font-medium"
                      >{correctAnswerText}</span
                    >
                  </div>
                </div>
              </div>

              <!-- Explanation box in history if exists -->
              {#if quest.AnswerExplanation}
                <div
                  class="flex gap-2 p-3 rounded-xl bg-primary-500/5 border border-primary-500/10 text-xs"
                >
                  <IconHome
                    size="14"
                    class="text-primary-500 mt-0.5 flex-shrink-0"
                  />
                  <p
                    class="text-surface-600 dark:text-surface-300 leading-relaxed"
                  >
                    <span class="font-bold text-primary-500">Explanation:</span>
                    {quest.AnswerExplanation}
                  </p>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
