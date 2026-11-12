title: Pricing and Calculations
description: Configure model pricing and discounts and understand calculated LLM costs

Open **AI Agent Watch → LLM Pricing Rates** to review the model rate card and your account's overrides. Rates are displayed per **one million tokens**.

## Default pricing and account overrides

Default model prices are synchronized daily from LiteLLM's public pricing catalog. Each model/provider pair has its own rates. You can override supported rates to reflect negotiated pricing and apply a blanket percentage discount.

1. Find the provider and model in **LLM Pricing Rates** and open its edit action.
2. Enter overrides for the rates covered by your agreement. Leave other rates at their defaults.
3. Set a discount if applicable, then review and save the changes.
4. Use **Use default** to clear an individual override when you want that field to follow the default rate card again.

Fields without overrides continue following the default catalog. Only rate dimensions supported by the model's catalog entry can be overridden. A blanket discount is applied after each rate resolves to its override or default; avoid entering an already-discounted rate and then applying the same discount again.

> **Screenshot placeholder — LLM Pricing Rates:** Show the provider/model list, default versus overridden prices, and the model edit action.

> **Screenshot placeholder — Edit Model Pricing:** Show input/output/cache overrides, supported tier rates, the blanket discount, and Use default controls.

### When pricing changes take effect

Saving an override creates pricing effective from that point onward. Previously calculated costs are not recalculated. Pricing is selected using the usage event's timestamp, so a new negotiated rate does not rewrite historical spending.

## Token categories and rate selection

| Category | Calculation behavior |
|---|---|
| Input | Uncached input tokens use the applicable input rate. |
| Output | Output tokens use the applicable output rate. Reasoning tokens are already part of output and are not added again. |
| Cache read | Tokens reused from cache use the cache-read rate. |
| Cache write | New cache entries use the available cache-write rate, with separate five-minute and one-hour buckets where reported. |
| Batch, priority, flex, and long context | Applicable pricing variants are selected using the request metadata and available model rates. Coverage depends on what the agent reports. |

For a simple example, 100,000 uncached input tokens at $2 per million and 20,000 output tokens at $8 per million cost $0.36 before any discount. A 10% blanket discount makes that $0.324. This example excludes cache usage and tier-specific pricing.

## Missing and partial costs

Not every captured request can be priced. Usage events include a pricing status so missing cost is distinguishable from a successful zero-cost calculation.

- **Unknown model:** There is no matching default pricing entry for the reported provider/model.
- **Unsupported billing mode:** Reserved and scale service tiers are not priced as pay-as-you-go usage.
- **Unknown service tier:** An unrecognized tier is left unpriced rather than assigned a guessed rate.
- **Incomplete collection:** A request not reported by the coding agent cannot contribute tokens or cost.

At session end, costs from captured, priced calls are summed. The session is marked `PARTIAL_COST` if some captured calls could not be priced. A session with no `llm_usage` events has no calculated session cost. Missing requests can also make a total incomplete even when all received events were successfully priced.

Use these calculations to investigate captured usage and spending trends. Flat-rate subscription charges and provider invoice adjustments are not automatically allocated to sessions or employees.
