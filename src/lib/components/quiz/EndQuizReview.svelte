<script lang="ts">
  import IconCheckCircle from "@lucide/svelte/icons/check-circle";
  import IconAlertTriangle from "@lucide/svelte/icons/alert-triangle";
  import IconInfo from "@lucide/svelte/icons/info";
  import type { QuizQuestion } from "$lib/types/quiz";

  let { questions } = $props<{ questions: QuizQuestion[] }>();
</script>

<div class="space-y-4">
  <h3 class="text-xl font-bold font-heading tracking-tight text-surface-950 dark:text-white">
    Question Review
  </h3>

  <div class="space-y-4">
    {#each questions as quest, index}
      {@const isCorrect = quest.choice === quest.CorrectOption}
      {@const isSkipped = !quest.choice}
      {@const correctAnswerText = quest[`Option${quest.CorrectOption}` as keyof QuizQuestion]}
      {@const userAnswerText = quest.choice ? quest[`Option${quest.choice}` as keyof QuizQuestion] : "Skipped"}

      <div
        class="p-5 rounded-2xl border transition-all {isCorrect ? 'bg-success-500/5 border-success-500/20' : isSkipped ? 'bg-slate-100/10 border-slate-500/10' : 'bg-error-500/5 border-error-500/20'}"
      >
        <div class="flex items-start gap-3">
          <span
            class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 {isCorrect ? 'bg-success-500/20 text-success-500' : isSkipped ? 'bg-slate-100/10 text-surface-400' : 'bg-error-500/20 text-error-500'}"
          >
            {index + 1}
          </span>
          <div class="flex-1 space-y-3">
            <h4 class="font-bold text-surface-900 dark:text-white leading-snug">
              {quest.Question}
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
              <div class="p-3 rounded-xl bg-slate-100/5 border border-slate-500/10">
                <span class="text-xs text-surface-500 font-semibold block uppercase mb-1">Your Selection</span>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-surface-900 dark:text-white">{quest.choice || "-"}</span>
                  <span class="leading-snug text-surface-700 dark:text-surface-300">{userAnswerText}</span>
                  {#if isCorrect}
                    <IconCheckCircle size="14" class="text-success-500 flex-shrink-0" />
                  {:else if !isSkipped}
                    <IconAlertTriangle size="14" class="text-error-500 flex-shrink-0" />
                  {/if}
                </div>
              </div>

              <div class="p-3 rounded-xl bg-success-500/5 border border-success-500/10">
                <span class="text-xs text-success-500 font-semibold block uppercase mb-1">Correct Answer</span>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-success-500">{quest.CorrectOption}</span>
                  <span class="leading-snug text-success-600 dark:text-success-400 font-medium">{correctAnswerText}</span>
                </div>
              </div>
            </div>

            {#if quest.AnswerExplanation}
              <div class="flex gap-2 p-3 rounded-xl bg-primary-500/5 border border-primary-500/10 text-xs">
                <IconInfo size="14" class="text-primary-500 mt-0.5 flex-shrink-0" />
                <p class="text-surface-600 dark:text-surface-300 leading-relaxed">
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
