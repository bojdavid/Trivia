<script lang="ts">
  import "../../lib/styles/app.css";
  import SelectSubject from "$lib/components/quizSelection/SelectSubject.svelte";
  import SelectCategory from "$lib/components/quizSelection/SelectCategory.svelte";
  import SelectQuestionRange from "$lib/components/quizSelection/SelectQuestionRange.svelte";
  //import { setQuizMeta } from "$lib/components/globalState.svelte";
  import { onMount } from "svelte";
  import {
    startQuiz,
    selectSubject,
    getSubjects,
    changingVariables,
  } from "./quizSelection.svelte";

  interface Subject {
    name: string;
    id?: number;
  }

  changingVariables.selectQuestionRange = false;

  let subjects: Subject[] = $state([]);

  const fetchSubjects = getSubjects(subjects);

  //sample data
  interface category {
    topic: string;
    no_of_questions: number;
  }

  let selectedSubject: Subject | any = $state();

  let questions_limit: number = $state(0);
  let selectedQuestionRange: number | any = $state();

  //Styles for the Buttons
  let submitButtonClass: string =
    "btn preset-outlined-secondary-500 rounded-lg text-md p-4";

  const pickSubject = (subj: Subject): void => {
    selectedSubject = subj;
    console.log(changingVariables.selectQuestionRange);
  };

  const selectRange = (range: number): void => {
    selectedQuestionRange = range;
  };
</script>

<main class="min-h-screen">
  <header
    class="pt-20
                    flex flex-col
                    min-w-xs w-full max-w-6xl
                    mx-auto"
  >
    <a href="./" class="btn preset-filled-primary-500 w-[150px]"> Home</a>
    <div class="mx-auto">
      <h2 class="text-4xl">
        Select {changingVariables.selectQuestionRange
          ? "No of Questions"
          : "Subject"}
      </h2>
      <p class="text-xs">
        {changingVariables.selectQuestionRange
          ? "Select the number of questions you want to answer"
          : "You can only select one subject"}
      </p>
    </div>
  </header>

  <div class="mx-auto flex flex-col items-center justify-center my-20">
    <div
      class="min-w-xs w-full max-w-6xl mx-2 rounded-md shadow-md shadow-primary-700 p-4"
    >
      {#await fetchSubjects}
        <p class="text-lg text-center">Fetching subjects .....</p>
      {:then subjects}
        {#if !changingVariables.selectQuestionRange}
          <SelectSubject
            {subjects}
            {pickSubject}
            {submitButtonClass}
            {selectSubject}
            {selectedSubject}
          />
        {:else}
          <SelectQuestionRange
            {submitButtonClass}
            {selectedQuestionRange}
            {selectRange}
            {startQuiz}
            {questions_limit}
            questionsData={changingVariables.subjectData
              .category_question_count}
          />
        {/if}
      {:catch error}
        <p>
          Something went wrong {error.message}
        </p>
      {/await}
    </div>
  </div>
</main>

<style>
</style>
