import type { ReactNode } from 'react'
import styles from './StepControls.module.css'

export interface StepButton {
  label: string
  title: string
  onClick: () => void
}

export interface StepControlsProps {
  playing: boolean
  onPlayPause: () => void
  onReset: () => void
  /** Discrete step buttons (e.g. 1 iteration, 10, to the next SP, to the end of the phase set, to the end). */
  steps: StepButton[]
  /** Iterations per animation frame. */
  speed: number
  onSpeedChange: (v: number) => void
  minSpeed?: number
  maxSpeed?: number
  /** Optional element after the speed slider (e.g. a ⓘ). */
  trailing?: ReactNode
  disabled?: boolean
}

/**
 * Transport bar for a stepped model: play/pause, reset, discrete steps and a
 * speed control in iterations per frame. Fully controlled; the demo owns the
 * state.
 */
export function StepControls({ playing, onPlayPause, onReset, steps, speed, onSpeedChange, minSpeed = 1, maxSpeed = 200, trailing, disabled }: StepControlsProps) {
  return (
    <div className={styles.bar}>
      <button type="button" className={`${styles.btn} ${styles.play}`} onClick={onPlayPause} disabled={disabled} aria-label={playing ? 'Pause' : 'Play'} title={playing ? 'Pause' : 'Play'}>
        {playing ? '❚❚' : '▶'}
      </button>
      {steps.map((s) => (
        <button key={s.label} type="button" className={styles.step} onClick={s.onClick} disabled={playing || disabled} title={s.title}>
          {s.label}
        </button>
      ))}
      <button type="button" className={styles.btn} onClick={onReset} aria-label="Reset" title="Reset to the start of the run (same seed)">
        ↺
      </button>
      <label className={styles.speed}>
        speed
        <input type="range" min={Math.log2(minSpeed)} max={Math.log2(maxSpeed)} step={0.25} value={Math.log2(speed)} onChange={(e) => onSpeedChange(Math.round(2 ** parseFloat(e.target.value)))} />
        <span className={styles.speedVal}>{speed}/f</span>
      </label>
      {trailing}
    </div>
  )
}
