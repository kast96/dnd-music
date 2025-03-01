export const getTimeFormat = (duration: number) => {
  let minutes = Math.floor(duration / 60)
  let secounds = Math.floor(duration % 60)
  return minutes + ':' + (secounds < 10 ? '0' : '') + secounds
}