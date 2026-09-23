/**
 * A Web Worker that runs batches (spec §2), shared by the Batch and Claims
 * tabs. One request at a time; callers await a promise and get progress.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { BatchMessage, BatchRequest, BatchResult } from '../../models/lisa/batch'

export interface BatchWorker {
  run: (req: BatchRequest, onProgress?: (done: number, total: number) => void) => Promise<BatchResult>
  busy: boolean
}

export function useBatchWorker(): BatchWorker {
  const workerRef = useRef<Worker | null>(null)
  const [busy, setBusy] = useState(false)
  const queue = useRef<Promise<unknown>>(Promise.resolve())

  useEffect(() => {
    const w = new Worker(new URL('../../models/lisa/lisa.worker.ts', import.meta.url), { type: 'module' })
    workerRef.current = w
    return () => {
      w.terminate()
      workerRef.current = null
    }
  }, [])

  const run = useCallback((req: BatchRequest, onProgress?: (done: number, total: number) => void): Promise<BatchResult> => {
    const job = queue.current.then(
      () =>
        new Promise<BatchResult>((resolve, reject) => {
          const w = workerRef.current
          if (!w) {
            reject(new Error('worker not available'))
            return
          }
          setBusy(true)
          const onMessage = (e: MessageEvent<BatchMessage>) => {
            const m = e.data
            if (m.type === 'progress') onProgress?.(m.done, m.total)
            else {
              w.removeEventListener('message', onMessage)
              setBusy(false)
              if (m.type === 'done') resolve(m.result)
              else reject(new Error(m.message))
            }
          }
          w.addEventListener('message', onMessage)
          w.postMessage(req)
        }),
    )
    queue.current = job.catch(() => undefined)
    return job
  }, [])

  return { run, busy }
}
