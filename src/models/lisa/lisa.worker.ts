/**
 * Web Worker entry: runs a batch off the main thread and reports progress.
 * Everything it does is `runBatch` from batch.ts, so the same code is tested
 * on the main thread.
 */
import { runBatch, type BatchMessage, type BatchRequest } from './batch'

const post = (m: BatchMessage) => (self as unknown as Worker).postMessage(m)

self.onmessage = (e: MessageEvent<BatchRequest>) => {
  try {
    const result = runBatch(e.data, (done, total) => post({ type: 'progress', done, total }))
    post({ type: 'done', result })
  } catch (err) {
    post({ type: 'error', message: err instanceof Error ? err.message : String(err) })
  }
}
