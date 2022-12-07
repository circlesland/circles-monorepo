<script lang="ts">
    import { FundsLabel } from "./components";
    import { Currency } from "./components/FundsLabel/types";

    // TODO: Get this information from the profile
    let balance = 200;
    let balanceCurrency = Currency.EUR;

    // Configure the channel communication
</script>

<div class="flex flex-col h-full">
    <div class="basis-1/5 bg-gradient-to-r from-blue-500 to-green-500">
        <FundsLabel balance={balance} balanceCurrency={balanceCurrency}></FundsLabel>
    </div>
    <div class="bg-blue-200 grow"></div>
</div>