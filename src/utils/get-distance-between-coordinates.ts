export interface Coordinates {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinates(
  from: Coordinates,
  to: Coordinates,
): number {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const degToRad = (deg: number) => (Math.PI * deg) / 180

  const fromLatRad = degToRad(from.latitude)
  const toLatRad = degToRad(to.latitude)
  const deltaLonRad = degToRad(from.longitude - to.longitude)

  const angleCosine =
    Math.sin(fromLatRad) * Math.sin(toLatRad) +
    Math.cos(fromLatRad) * Math.cos(toLatRad) * Math.cos(deltaLonRad)

  const distance = Math.acos(Math.min(angleCosine, 1)) * 6371 // 6371 is the Earth's radius in km

  return distance
}
