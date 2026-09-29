<script lang="ts">
  interface Subject {
    name: string;
    id: number;
  }

  let {
    subjects = [],
    pickSubject,
    selectSubject,
    selectedSubject,
  } = $props<{
    subjects: Subject[];
    pickSubject: (subj: Subject) => void;
    selectSubject: (subj: Subject) => void;
    selectedSubject: Subject | null;
  }>();

  // Helper to format category names nicely by stripping prefixes like "Entertainment: "
  function formatName(name: string): string {
    return name.replace(/^(Entertainment|Science): /, "");
  }
</script>

<div class="space-y-[var(--spacing-clamp-md)]">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-clamp-sm)]">
    {#each subjects as subject}
      {@const isSelected = selectedSubject?.id === subject.id}
      <button
        type="button"
        class="text-left p-[var(--spacing-clamp-sm)] rounded-xl border-4 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-36
               {isSelected 
                 ? 'bg-primary-500 border-primary-500 text-white shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#fff] scale-[1.02] -translate-y-1' 
                 : 'bg-white dark:bg-black border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1a1a1a] dark:hover:shadow-[4px_4px_0px_#fff]'}"
        onclick={() => pickSubject(subject)}
      >
        <!-- Card content -->
        <div>
          <span class="text-[length:var(--text-clamp-sm)] font-bold tracking-wider uppercase opacity-70 {isSelected ? 'text-white' : 'text-primary-500'}">
            ID: #{subject.id}
          </span>
          <h4 class="text-[length:var(--text-clamp-lg)] font-black mt-2 leading-snug {isSelected ? 'text-white' : 'text-black dark:text-white'}">
            {formatName(subject.name)}
          </h4>
        </div>
        
        <!-- Selection indicator dot -->
        <div class="flex justify-between items-center w-full mt-[var(--spacing-clamp-sm)]">
          <span class="text-[length:var(--text-clamp-sm)] font-bold opacity-60 {isSelected ? 'text-white' : 'text-black dark:text-white'}">Category</span>
          <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                      {isSelected ? 'border-white bg-white' : 'border-black/30 dark:border-white/30'}">
            {#if isSelected}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            {/if}
          </div>
        </div>
      </button>
    {/each}
  </div>

  <div class="flex justify-end pt-[var(--spacing-clamp-md)]">
    <button
      type="button"
      class="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-[length:var(--text-clamp-lg)] transition-all duration-300 border-4 uppercase tracking-wide
             {selectedSubject 
               ? 'bg-primary-500 border-black dark:border-white text-white shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#fff] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1a1a1a] dark:hover:shadow-[8px_8px_0px_#fff] cursor-pointer' 
               : 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'}"
      disabled={!selectedSubject}
      onclick={() => selectedSubject && selectSubject(selectedSubject)}
    >
      Next: Question Range
    </button>
  </div>
</div>
