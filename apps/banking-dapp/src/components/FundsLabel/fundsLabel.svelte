<script lang="ts">
	import { Currency } from './types';

    export let balance: number = 0;
    export let balanceCurrency: Currency = Currency;

    function getCurrencySymbol(currency: Currency) {
        switch (currency) {
            case Currency.EUR: return '€';
            case Currency.USD: return '$';
            default: return '';
        }
    }
</script>

<div class="flex flex-wrap items-center h-full">
    <div class="w-full text-center text-7xl font-enso tracking-wide text-white font-bold">{balance} {getCurrencySymbol(balanceCurrency)}</div>
</div>