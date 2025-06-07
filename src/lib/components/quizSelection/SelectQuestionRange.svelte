<script lang="ts">
  let {
    submitButtonClass,
    selectedQuestionRange,
    selectRange,
    startQuiz,
    questions_limit,
    questionsData,
  } = $props();

  // questions_range will keep incrementing by 10 as long as it is less than questionslimit
  //let questions_range : number[] = Array.from({ length: Math.floor(questions_limit / 10) }, (_, i) => (i + 1) * 10);

  let questions_range: number[] = Array.from({ length: 10 }, (_, i) =>
    Math.round(
      (i + 1) *
        (questionsData.category_question_count.total_question_count / 10)
    )
  );
</script>

<div class="grid grid-cols-2 text-center">
  <div>
    Total Questions:{questionsData.category_question_count.total_question_count}
  </div>
  <div>
    Total Easy Questions: {questionsData.category_question_count
      .total_easy_question_count}
  </div>
  <div>
    Total Medium Questions: {questionsData.category_question_count
      .total_medium_question_count}
  </div>
  <div>
    Total Hard Questions: {questionsData.category_question_count
      .total_hard_question_count}
  </div>
</div>

<input
  type="text"
  placeholder="Enter the number of questions you want."
  class="text-lg mx-auto flex justify-center w-lg my-7 border p-3 rounded-xl"
  bind:value={selectedQuestionRange}
/>

<div class="grid grid-cols-2 gap-5 text-md my-5">
  {#each questions_range as range}
    <button
      type="button"
      class="btn preset-outlined-primary-500 rounded-lg text-xl p-4 {selectedQuestionRange ==
      range
        ? 'bg-secondary-500'
        : ''}"
      onclick={() => selectRange(range)}
    >
      {range}
    </button>
  {/each}
</div>

<div class="flex justify-end">
  <button type="button" class={submitButtonClass} onclick={startQuiz}>
    Start Quiz
  </button>
</div>
