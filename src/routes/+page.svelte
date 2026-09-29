<script lang="ts">
  import "$lib/styles/app.css";
  import LightSwitch from "$lib/components/LightSwitch.svelte";
  import IconAward from "@lucide/svelte/icons/award";
  import IconBookOpen from "@lucide/svelte/icons/book-open";
  import IconPlay from "@lucide/svelte/icons/play";
</script>

<div class="min-h-screen flex flex-col justify-between p-[var(--spacing-clamp-sm)] pattern-bg">
  <!-- Header with Light Switch -->
  <header
    class="w-full max-w-5xl mx-auto flex justify-between items-center py-[var(--spacing-clamp-sm)]"
  >
    <div class="flex items-center gap-[var(--spacing-clamp-sm)]">
      <span
        class="text-[length:var(--text-clamp-2xl)] font-black tracking-tight gradient-text-theme font-heading uppercase"
        >Trivia Engine</span
      >
    </div>
    <div
      class="p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]"
    >
      <LightSwitch />
    </div>
  </header>

  <!-- Hero & Navigation Selection Cards -->
  <main
    class="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center my-[var(--spacing-clamp-lg)]"
  >
    <div class="text-center mb-[var(--spacing-clamp-lg)] flex flex-col items-center animate-slide-up">
      <h1
        class="text-[length:var(--text-clamp-7xl)] font-extrabold tracking-tight mb-[var(--spacing-clamp-sm)] font-heading leading-tight"
      >
        Test Your <span class="text-primary-500 dark:text-primary-400">Brainpower</span>
      </h1>
      <p
        class="text-[length:var(--text-clamp-lg)] text-secondary-600 dark:text-gray-300 max-w-2xl mx-auto font-medium"
      >
        Challenge yourself with real-time trivia questions across multiple
        subjects, or practice local courses dynamically.
      </p>
    </div>

    <!-- Selection Grid -->
    <div class="grid md:grid-cols-2 gap-[var(--spacing-clamp-md)] w-full max-w-3xl">
      <!-- Card 1: Custom Trivia -->
      <a
        href="/quizSelection"
        class="group block theme-card p-[var(--spacing-clamp-md)] rounded-xl relative overflow-hidden animate-slide-up delay-100"
      >
        <div
          class="absolute -right-8 -bottom-8 opacity-[0.03] dark:opacity-10 group-hover:opacity-[0.08] dark:group-hover:opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
        >
          <IconAward size="180" class="text-black dark:text-white" />
        </div>
        <div class="flex flex-col h-full justify-between gap-[var(--spacing-clamp-md)] relative z-10">
          <div>
            <div
              class="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center mb-[var(--spacing-clamp-sm)] shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] group-hover:scale-110 transition-transform duration-300"
            >
              <IconPlay size="32" fill="currentColor" />
            </div>
            <h3
              class="text-[length:var(--text-clamp-2xl)] font-bold font-heading mb-3 text-black dark:text-white"
            >
              Custom Quiz
            </h3>
            <p class="text-[length:var(--text-clamp-base)] text-gray-700 dark:text-gray-300 font-medium">
              Customize your subjects, select the total question count, and play
              with a standard countdown timer.
            </p>
          </div>
          <div
            class="text-[length:var(--text-clamp-lg)] font-bold text-primary-500 flex items-center gap-2 group-hover:gap-4 transition-all duration-300 mt-[var(--spacing-clamp-sm)]"
          >
            <span class="border-b-4 border-transparent group-hover:border-primary-500 pb-1 transition-colors">Get Started</span> 
            <span class="text-2xl">&rarr;</span>
          </div>
        </div>
      </a>

      <!-- Card 2: Practice CSC413 -->
      <a
        href="/practice_Q"
        class="group block theme-card p-[var(--spacing-clamp-md)] rounded-xl relative overflow-hidden animate-slide-up delay-200"
      >
        <div
          class="absolute -right-8 -bottom-8 opacity-[0.03] dark:opacity-10 group-hover:opacity-[0.08] dark:group-hover:opacity-20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500"
        >
          <IconBookOpen size="180" class="text-black dark:text-white" />
        </div>
        <div class="flex flex-col h-full justify-between gap-[var(--spacing-clamp-md)] relative z-10">
          <div>
            <div
              class="w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-[var(--spacing-clamp-sm)] shadow-[4px_4px_0px_#e60000] group-hover:scale-110 transition-transform duration-300"
            >
              <IconBookOpen size="32" />
            </div>
            <h3
              class="text-[length:var(--text-clamp-2xl)] font-bold font-heading mb-3 text-black dark:text-white"
            >
              CSC413 Practice
            </h3>
            <p class="text-[length:var(--text-clamp-base)] text-gray-700 dark:text-gray-300 font-medium">
              Run through practice questions offline, matching actual computer
              science exam curricula, with an up-counting timer.
            </p>
          </div>
          <div
            class="text-[length:var(--text-clamp-lg)] font-bold text-black dark:text-white flex items-center gap-2 group-hover:gap-4 transition-all duration-300 mt-[var(--spacing-clamp-sm)]"
          >
            <span class="border-b-4 border-transparent group-hover:border-black dark:group-hover:border-white pb-1 transition-colors">Start Practice</span> 
            <span class="text-2xl">&rarr;</span>
          </div>
        </div>
      </a>
    </div>
  </main>

  <!-- Footer -->
  <footer class="w-full text-center py-[var(--spacing-clamp-sm)] border-t-[3px] border-black/10 dark:border-white/10 mt-auto">
    <p class="text-[length:var(--text-clamp-sm)] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider">
      &copy; {new Date().getFullYear()} Trivia Engine
    </p>
  </footer>
</div>
