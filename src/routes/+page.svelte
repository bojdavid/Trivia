<script lang="ts">
  import "$lib/styles/app.css";
  import LightSwitch from "$lib/components/LightSwitch.svelte";
</script>

<div class=" w-full h-40 mx-auto">
  <div class="w-20 mx-auto dark:bg-surface-700 dark:text-surface-500">
    <LightSwitch />
  </div>

  <div class="flex justify-center mt-[200px]">
    <a href="/quizSelection" class="text-xl hover:text-primary-200">
      Take Quiz
    </a>
  </div>
</div>
