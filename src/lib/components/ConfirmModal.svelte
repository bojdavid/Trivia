<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import IconAlertTriangle from "@lucide/svelte/icons/alert-triangle";
  import IconCheckCircle from "@lucide/svelte/icons/check-circle";
  import IconInfo from "@lucide/svelte/icons/info";
  import IconX from "@lucide/svelte/icons/x";

  let {
    isOpen = false,
    title = "Are you sure?",
    message = "Your progress will be lost.",
    confirmText = "Yes, Quit",
    cancelText = "Cancel",
    variant = "danger",
    onConfirm,
    onCancel,
  } = $props<{
    isOpen: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "positive" | "danger" | "neutral";
    onConfirm: () => void;
    onCancel: () => void;
  }>();

  let bgClass = $derived(
    variant === "positive"
      ? "bg-green-500"
      : variant === "neutral"
        ? "bg-gray-500"
        : "bg-error-500",
  );

  let hoverClass = $derived(
    variant === "positive"
      ? "hover:bg-green-600"
      : variant === "neutral"
        ? "hover:bg-gray-600"
        : "hover:bg-error-600",
  );

  let shadowClass = $derived(
    variant === "positive"
      ? "shadow-[8px_8px_0px_#22c55e]"
      : variant === "neutral"
        ? "shadow-[8px_8px_0px_#6b7280]"
        : "shadow-[8px_8px_0px_#e60000]",
  );

  let smShadowClass = $derived(
    variant === "positive"
      ? "shadow-[4px_4px_0px_#22c55e]"
      : variant === "neutral"
        ? "shadow-[4px_4px_0px_#6b7280]"
        : "shadow-[4px_4px_0px_#e60000]",
  );

  let hoverSmShadowClass = $derived(
    variant === "positive"
      ? "hover:shadow-[6px_6px_0px_#22c55e]"
      : variant === "neutral"
        ? "hover:shadow-[6px_6px_0px_#6b7280]"
        : "hover:shadow-[6px_6px_0px_#e60000]",
  );
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-[var(--spacing-clamp-sm)] bg-black/60 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
    onclick={onCancel}
  >
    <div
      class="w-full max-w-md bg-white dark:bg-black border-4 border-black dark:border-white rounded-3xl p-[var(--spacing-clamp-md)] relative transition-all {shadowClass}"
      transition:scale={{ duration: 300, start: 0.95, easing: cubicOut }}
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Close button -->
      <button
        class="absolute top-4 right-4 p-2 rounded-xl border-4 border-black dark:border-white text-black dark:text-white hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all active:scale-95 bg-white dark:bg-black shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#fff]"
        onclick={onCancel}
        title="Close"
      >
        <IconX size="20" />
      </button>

      <!-- Content -->
      <div class="flex flex-col items-center text-center mt-2 space-y-4">
        <div
          class="w-16 h-16 rounded-2xl {bgClass} border-4 border-black dark:border-white flex items-center justify-center text-white {smShadowClass}"
        >
          {#if variant === "positive"}
            <IconCheckCircle size="32" />
          {:else if variant === "neutral"}
            <IconInfo size="32" />
          {:else}
            <IconAlertTriangle size="32" />
          {/if}
        </div>

        <h2
          class="text-[length:var(--text-clamp-xl)] font-black uppercase text-black dark:text-white leading-tight mt-2"
        >
          {title}
        </h2>

        <p
          class="text-[length:var(--text-clamp-base)] font-bold text-gray-600 dark:text-gray-400"
        >
          {message}
        </p>
      </div>

      <!-- Actions -->
      <div
        class="mt-[var(--spacing-clamp-md)] flex flex-col sm:flex-row gap-4 w-full"
      >
        <button
          class="flex-1 px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 border-4 border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-black text-[length:var(--text-clamp-base)] uppercase tracking-wide hover:bg-gray-300 dark:hover:bg-gray-700 active:scale-95 transition-all"
          onclick={onCancel}
        >
          {cancelText}
        </button>
        <button
          class="flex-1 px-4 py-3 rounded-xl {bgClass} {hoverClass} text-white border-4 border-black dark:border-white font-black text-[length:var(--text-clamp-base)] uppercase tracking-wide {smShadowClass} active:scale-95 hover:-translate-y-1 {hoverSmShadowClass} transition-all"
          onclick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
{/if}
