
export const handleImageError = (
  event: Event,
  fallbackSrc: string = '/placeholder.jpg'
): void => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = fallbackSrc
  }
}
