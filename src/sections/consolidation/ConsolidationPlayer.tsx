import { useEffect, useRef, useState } from 'react'
import { Player, Thumbnail, type PlayerRef } from '@remotion/player'
import { Consolidation, DURATION, FPS, STILL_FRAME, type ConsolidationProps } from './Consolidation'

type Props = ConsolidationProps & {
  /** Show a still final frame instead of the animation (reduced motion). */
  still: boolean
  /** Paused by the visitor with the pause button. */
  paused: boolean
}

const WIDE = { compositionWidth: 1280, compositionHeight: 640 }
const TALL = { compositionWidth: 720, compositionHeight: 960 }
const wideQuery = '(min-width: 640px)'

/**
 * Loaded lazily (own chunk with Remotion). Plays only while on screen
 * and the visitor hasn't paused it.
 */
export default function ConsolidationPlayer({ text, locale, still, paused }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<PlayerRef>(null)
  const [wide, setWide] = useState(() => window.matchMedia(wideQuery).matches)
  const [onScreen, setOnScreen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(wideQuery)
    const onChange = () => setWide(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The Player remounts when the layout switches, so re-apply play state after `wide` changes too.
  useEffect(() => {
    const p = playerRef.current
    if (!p) return
    if (onScreen && !paused) p.play()
    else p.pause()
  }, [onScreen, paused, wide, still])

  const size = wide ? WIDE : TALL
  const inputProps = { text, locale }
  const style = { width: '100%', height: '100%' }

  return (
    <div ref={wrapRef} className="h-full w-full">
      {still ? (
        <Thumbnail
          key={wide ? 'w' : 't'}
          component={Consolidation}
          inputProps={inputProps}
          durationInFrames={DURATION}
          fps={FPS}
          frameToDisplay={STILL_FRAME}
          style={style}
          {...size}
        />
      ) : (
        <Player
          key={wide ? 'w' : 't'}
          ref={playerRef}
          component={Consolidation}
          inputProps={inputProps}
          durationInFrames={DURATION}
          fps={FPS}
          loop
          controls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          acknowledgeRemotionLicense
          style={style}
          {...size}
        />
      )}
    </div>
  )
}
