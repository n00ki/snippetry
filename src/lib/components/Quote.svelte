<script lang="ts">
  // Utils
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  // Stores
  import { quote } from '$lib/stores/quote';
  import { isQuoteReady } from '$lib/stores/status';

  // Components
  import { Button } from '$components/ui/button';

  // Icons
  import { DoubleArrowDown } from 'radix-icons-svelte';

  onMount(async () => {
    await getRandomQuote();
    $isQuoteReady = true;
  });

  async function getRandomQuote() {
    try {
      const quote = await fetch('api/quote').then((res) => res.json());
      if (quote.error) {
        $quote.content = 'An error occurred while fetching the quote';
        return;
      }

      $quote.author = quote?.author ?? '';
      $quote.content = quote?.quote ?? '';
    } catch (error) {
      console.log(error);
    }
    document?.getElementById('editor')?.focus();
  }
</script>

<div class="w-full" transition:fade>
  <div class="flex flex-col items-center justify-center gap-4">
    <div class="max-w-4xl text-center">
      <h1 class="text-md mb-2 font-medium md:text-xl">{$quote.content}</h1>
      <h2 class="md:text-md text-md font-sans">{$quote.author}</h2>
    </div>
    <div class="over md:text-md inline-flex flex-wrap items-center justify-center whitespace-pre text-sm leading-7">
      Write it in code <DoubleArrowDown /> or <Button on:click={getRandomQuote} variant="outline" class="cursor-pointer"
        >generate a new quote</Button
      >
    </div>
  </div>
</div>
