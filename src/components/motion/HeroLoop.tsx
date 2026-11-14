"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Silent looping video that fades in over the still hero artwork (HeroArt).
 * The still is the first paint; the video is only requested after the page
 * has loaded and the browser is idle, so the headline never waits on it.
 * Skipped for reduced motion and data-saver, where the still simply stays.
 * Files live in /public/art as <name>.webm and <name>.mp4.
 *
 * The video stays fully transparent until a few frames have been drawn.
 * Browsers time the largest thing painted on screen (Largest Contentful Paint)
 * and skip anything invisible when it is first drawn; fading in on "playing"
 * let the video's first frame count, which made the page look seconds slower
 * than the still that was already there.
 */
export function HeroLoop({ name, className = "" }: { name: string; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => setMounted(true));
      } else {
        timer = setTimeout(() => setMounted(true), 200);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!mounted || !video) return;
    type FrameVideo = HTMLVideoElement & {
      requestVideoFrameCallback?: (cb: () => void) => number;
      cancelVideoFrameCallback?: (id: number) => void;
    };
    const v = video as FrameVideo;
    let frames = 0;
    let frameId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (typeof v.requestVideoFrameCallback === "function") {
      const onFrame = () => {
        frames += 1;
        if (frames >= 3) setPlaying(true);
        else frameId = v.requestVideoFrameCallback!(onFrame);
      };
      frameId = v.requestVideoFrameCallback(onFrame);
    } else {
      // Older browsers: wait until playback has clearly moved past frame one.
      const onTime = () => {
        if (video.currentTime > 0.2) setPlaying(true);
      };
      video.addEventListener("timeupdate", onTime);
      timer = setTimeout(() => video.removeEventListener("timeupdate", onTime), 30000);
      return () => {
        video.removeEventListener("timeupdate", onTime);
        clearTimeout(timer);
      };
    }
    return () => {
      if (frameId !== undefined) v.cancelVideoFrameCallback?.(frameId);
    };
  }, [mounted]);

  if (!mounted) return null;
  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      disablePictureInPicture
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        playing ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <source src={`/art/${name}.webm`} type="video/webm" />
      <source src={`/art/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
