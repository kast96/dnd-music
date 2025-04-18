export const availableFaces = [4, 6, 8, 10, 12, 20]

export const isAvailableFaces = (face: number) => {
  return availableFaces.includes(face)
}