'use client'
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "../hooks/use-is-mounted";

const Context = createContext<{
  playAudio: (url: string) => void,
  stopAudio: () => void
}>({
  playAudio: () => { },
  stopAudio: () => { }
})

export function useAudio() {
  return useContext(Context)
}

export default function AudioProvider({ children }: {
  readonly children: React.ReactNode;
}) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  function playAudio(url: string) {
    setAudioUrl(url)
  }

  function stopAudio() {
    setAudioUrl(null)
  }

  return (
    <Context.Provider value={{
      playAudio,
      stopAudio,
    }}>
      {children}
      <AudioPlayer audioUrl={audioUrl} />
    </Context.Provider>
  );
}

function AudioPlayer({ audioUrl }: { audioUrl: string | null }) {
  const isMounted = useIsMounted()
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) return

    if (audioUrl) {
      audioRef.current.src = audioUrl
      audioRef.current.play()
    } else {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
  }, [audioUrl])

  if (!isMounted) return null

  return createPortal(
    <audio ref={audioRef} />,
    document.body
  )
}