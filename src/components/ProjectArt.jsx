// Reserve stable image space without downloading a missing file or showing a
// broken-image icon. Add project.screenshots in content.js when images are ready.
export default function ProjectArt({ project }) {
  const screenshot = project.screenshots?.[0];
  const video = project.videos?.[0];
  if (!screenshot?.src && video?.src) return <div className="project-art project-media project-media-video"><video src={video.src} muted loop autoPlay playsInline preload="metadata" aria-label={video.title} /></div>;
  if (!screenshot?.src) return <div className="project-art project-media project-media-empty" aria-hidden="true" />;
  return <div className="project-art project-media"><img src={screenshot.src} alt={screenshot.alt || `${project.name} screenshot`} loading="lazy" width="1440" height="900" /></div>;
}
