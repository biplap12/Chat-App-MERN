export const formatTime = (inputDate) => {
  const date = new Date(inputDate)
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  const ampm =  date.getHours() < 12 ? 'AM' : 'PM'

  return `${hours}:${minutes} ${ ampm}`
}

// helper function to pad sigle-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0")
}
