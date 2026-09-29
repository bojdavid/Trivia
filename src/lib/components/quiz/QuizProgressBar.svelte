<script lang="ts">
  let { questionNum, totalQuestions } = $props<{
    questionNum: number;
    totalQuestions: number;
  }>();
</script>

<div class="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4 border-2 border-black dark:border-white overflow-hidden shadow-inner">
  <div
    class="bg-primary-500 h-full transition-all duration-300"
    style="width: {((questionNum + 1) / totalQuestions) * 100}%"
  ></div>
</div>
