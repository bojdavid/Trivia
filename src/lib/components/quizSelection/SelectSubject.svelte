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

<div class="space-y-6">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each subjects as subject}
      {@const isSelected = selectedSubject?.id === subject.id}
      <button
        type="button"
        class="text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-32
               {isSelected 
                 ? 'bg-primary-500/10 border-primary-500 shadow-md shadow-primary-500/10 scale-[1.02]' 
                 : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25'}"
        onclick={() => pickSubject(subject)}
      >
        <!-- Card content -->
        <div>
          <span class="text-xs font-semibold tracking-wider text-surface-500 uppercase">
            ID: #{subject.id}
          </span>
          <h4 class="text-lg font-bold mt-1 text-surface-900 dark:text-white leading-snug">
            {formatName(subject.name)}
          </h4>
        </div>
        
        <!-- Selection indicator dot -->
        <div class="flex justify-between items-center w-full">
          <span class="text-xs opacity-60">Category</span>
          <div class="w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                      {isSelected ? 'border-primary-500 bg-primary-500' : 'border-white/30'}">
            {#if isSelected}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            {/if}
          </div>
        </div>
      </button>
    {/each}
  </div>

  <div class="flex justify-end pt-4">
    <button
      type="button"
      class="w-full sm:w-auto px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg text-white
             {selectedSubject 
               ? 'bg-primary-500 hover:bg-primary-600 shadow-primary-500/25 active:scale-95 cursor-pointer' 
               : 'bg-surface-500/20 text-surface-500 cursor-not-allowed'}"
      disabled={!selectedSubject}
      onclick={() => selectedSubject && selectSubject(selectedSubject)}
    >
      Next: Question Range
    </button>
  </div>
</div>
