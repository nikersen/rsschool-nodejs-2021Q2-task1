const alphabetLowerEN = 'abcdefghijklmnopqrstuvwxyz'
const alphabetUpperEN = alphabetLowerEN.toUpperCase()

const alphabets = [alphabetLowerEN, alphabetUpperEN]

function shiftAlphabets (shift) {
  let shiftedAlphabets = []
  shift = Math.floor(Number(shift))
  const inverse = shift < 0
  alphabets.forEach(alphabet => {
    let shiftedAlphabet = ''
    if (inverse) {
      shift = -shift > alphabet.length ? -(-shift % alphabet.length) : shift
    }
    for (let i = 0; i < alphabet.length; i++) {
      let index = i + shift
      if (inverse) {
        index = index < 0 ? alphabet.length + index : index
      }
      let currentLetter = (alphabet[index] === undefined)
        ? (alphabet[index % alphabet.length])
        : (alphabet[index])
      shiftedAlphabet = shiftedAlphabet.concat(currentLetter)
    }
    shiftedAlphabets.push(shiftedAlphabet)
  })
  return shiftedAlphabets
}

function coder (message, shift, action) {
  const shiftedAlphabets = shiftAlphabets(shift)
  const originAlphabets = action === 'encode' ? alphabets : shiftedAlphabets
  const descentAlphabets = action === 'encode' ? shiftedAlphabets : alphabets
  let codedMessage = ''
  for (let i = 0; i < message.length; i++) {
    let letter = message[i]
    originAlphabets.forEach((alphabet, index) => {
      const indexOfLetter = alphabet.indexOf(message[i])
      if (indexOfLetter !== -1) {
        letter = descentAlphabets[index][indexOfLetter]
      }
    })
    codedMessage = codedMessage.concat(letter)
  }
  return codedMessage
}

module.exports = {
  encode: (message, shift) => coder(message, shift, 'encode'),
  decode: (message, shift) => coder(message, shift, 'decode')
}