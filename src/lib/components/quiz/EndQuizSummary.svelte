<script lang="ts">
  import IconRefreshCw from "@lucide/svelte/icons/refresh-cw";
  import IconHome from "@lucide/svelte/icons/home";

  let { scoreCount, noOfQuestion, percentage, feedback } = $props<{
    scoreCount: number;
    noOfQuestion: number;
    percentage: number;
    feedback: { title: string; message: string; colorClass: string };
  }>();
</script>

<div class="glass-card p-8 rounded-3xl text-center relative overflow-hidden space-y-6">
  <h2 class="text-3xl font-extrabold tracking-tight font-heading">
    Quiz Results
  </h2>

  <!-- Big Circle Percent Score -->
  <div class="relative w-40 h-40 mx-auto flex items-center justify-center">
    <!-- Outer Track Glow -->
    <div class="absolute inset-0 rounded-full bg-primary-500/5 animate-pulse"></div>
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
      <span class="text-4xl font-black text-surface-900 dark:text-white leading-none">
        {percentage}%
      </span>
      <span class="text-xs text-surface-500 font-bold uppercase mt-1">Score</span>
    </div>
  </div>

  <!-- Numeric Stats -->
  <div class="text-lg font-medium text-surface-700 dark:text-surface-200">
    You answered <span class="font-bold text-success-500">{scoreCount}</span>
    correct out of
    <span class="font-bold text-surface-400">{noOfQuestion}</span> questions.
  </div>

  <!-- Feedback Message Callout -->
  <div class="p-5 rounded-2xl border {feedback.colorClass} text-center space-y-1 max-w-md mx-auto">
    <h4 class="font-bold font-heading text-lg">{feedback.title}</h4>
    <p class="text-xs md:text-sm opacity-90 leading-relaxed">
      {feedback.message}
    </p>
  </div>

  <!-- CTA Button grid -->
  <div class="flex flex-col sm:flex-row gap-3 pt-4 justify-center items-center">
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
