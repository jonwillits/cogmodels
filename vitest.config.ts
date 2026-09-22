import { defineConfig } from 'vitest/config'

/**
 * `npm run test` gates the deploy, so it stays fast and deterministic: it
 * runs `*.test.ts` only. Batched scenario runs over many seeds live in
 * `*.slow.test.ts` and run on demand (`npm run test:slow`). Timing probes
 * (`*.probe.ts`) assert nothing and print a table; they run with `PROBE=1`.
 *
 *   PROBE=1 npx vitest run --disable-console-intercept
 */
export default defineConfig({
  test: {
    include: process.env.PROBE ? ['src/**/*.probe.ts'] : ['src/**/*.test.ts'],
    exclude: process.env.SLOW
      ? ['**/node_modules/**']
      : ['**/node_modules/**', '**/*.slow.test.ts'],
    testTimeout: process.env.SLOW ? 600_000 : 60_000,
  },
})
