<script lang="ts">
  import "$lib/styles/app.css";
  import LightSwitch from "$lib/components/LightSwitch.svelte";
  import IconAward from "@lucide/svelte/icons/award";
  import IconBookOpen from "@lucide/svelte/icons/book-open";
  import IconPlay from "@lucide/svelte/icons/play";
</script>

<div class="min-h-screen flex flex-col justify-between p-6">
  <!-- Header with Light Switch -->
  <header class="w-full max-w-5xl mx-auto flex justify-between items-center py-4">
    <div class="flex items-center gap-2">
      <span class="text-2xl font-black tracking-tight gradient-text font-heading">TRIVIA ENGINE</span>
    </div>
    <div class="p-1 rounded-full bg-surface-100/10 backdrop-blur-md border border-white/10">
      <LightSwitch />
    </div>
  </header>

  <!-- Hero & Navigation Selection Cards -->
  <main class="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center my-12">
    <div class="text-center mb-10">
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 font-heading">
        Test Your <span class="gradient-text">Brainpower</span>
      </h1>
      <p class="text-lg text-surface-600 dark:text-surface-300 max-w-xl mx-auto">
        Challenge yourself with real-time trivia questions across multiple subjects, or practice local courses dynamically.
      </p>
    </div>

    <!-- Selection Grid -->
    <div class="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
      <!-- Card 1: Custom Trivia -->
      <a href="/quizSelection" class="group block glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
        <div class="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300">
          <IconAward size="160" class="text-primary-500" />
        </div>
        <div class="flex flex-col h-full justify-between gap-6">
          <div>
            <div class="w-12 h-12 rounded-xl bg-primary-500/20 text-primary-500 flex items-center justify-center mb-4">
              <IconPlay size="24" />
            </div>
            <h3 class="text-2xl font-bold font-heading mb-2 text-surface-900 dark:text-white">Take a Custom Quiz</h3>
            <p class="text-sm text-surface-600 dark:text-surface-300">
              Customize your subjects, select the total question count, and play with a standard countdown timer.
            </p>
          </div>
          <span class="text-sm font-semibold text-primary-500 flex items-center gap-1 group-hover:gap-2 transition-all">
            Get Started &rarr;
          </span>
        </div>
      </a>

      <!-- Card 2: Practice CSC413 -->
      <a href="/practice_Q" class="group block glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
        <div class="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300">
          <IconBookOpen size="160" class="text-secondary-500" />
        </div>
        <div class="flex flex-col h-full justify-between gap-6">
          <div>
            <div class="w-12 h-12 rounded-xl bg-secondary-500/20 text-secondary-500 flex items-center justify-center mb-4">
              <IconBookOpen size="24" />
            </div>
            <h3 class="text-2xl font-bold font-heading mb-2 text-surface-900 dark:text-white">CSC413 Practice</h3>
            <p class="text-sm text-surface-600 dark:text-surface-300">
              Run through practice questions offline, matching actual computer science exam curricula, with an up-counting timer.
            </p>
          </div>
          <span class="text-sm font-semibold text-secondary-500 flex items-center gap-1 group-hover:gap-2 transition-all">
            Start Practice &rarr;
          </span>
        </div>
      </a>
    </div>
  </main>

  <!-- Footer -->
  <footer class="w-full text-center py-6 border-t border-surface-500/10">
    <p class="text-xs text-surface-500">
      &copy; {new Date().getFullYear()} Trivia Engine. Designed for premium responsiveness and speed.
    </p>
  </footer>
</div>
