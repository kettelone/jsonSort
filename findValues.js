const axios = require('axios')

let endpointsString = `https://jsonbase.com/lambdajson_type1/793
https://jsonbase.com/lambdajson_type1/955
https://jsonbase.com/lambdajson_type1/231
https://jsonbase.com/lambdajson_type1/931
https://jsonbase.com/lambdajson_type1/93
https://jsonbase.com/lambdajson_type2/342
https://jsonbase.com/lambdajson_type2/770
https://jsonbase.com/lambdajson_type2/491
https://jsonbase.com/lambdajson_type2/281
https://jsonbase.com/lambdajson_type2/718
https://jsonbase.com/lambdajson_type3/310
https://jsonbase.com/lambdajson_type3/806
https://jsonbase.com/lambdajson_type3/469
https://jsonbase.com/lambdajson_type3/258
https://jsonbase.com/lambdajson_type3/516
https://jsonbase.com/lambdajson_type4/79
https://jsonbase.com/lambdajson_type4/706
https://jsonbase.com/lambdajson_type4/521
https://jsonbase.com/lambdajson_type4/350
https://jsonbase.com/lambdajson_type4/64`

let endpointsArray = endpointsString.split('\n')
let isDoneTrue = 0
let isDoneFalse = 0

const getResponse = async (endpoint) => {
  try {
    for (let i = 0; i < 3; i++) {
      const response = await axios.get(endpoint)
      if (response.status === 200) {
        return response
      } else {
        console.log('error occured')
        throw Error
      }
    }
  } catch (e) {
    console.log(e)
  }
}

const findIsDone = (obj) => {
  for (const property in obj) {
    if (typeof obj[property] === 'object') {
      findIsDone(obj[property])
    } else if (property === 'isDone' && obj[property] === true) {
      isDoneTrue++
      return { isDoneTrue, isDoneFalse }
    } else if (property === 'isDone' && obj[property] === false) {
      isDoneFalse++
      return { isDoneTrue, isDoneFalse }
    }
  }
  return { isDoneTrue, isDoneFalse }
}

const final = async () => {
  let finalResult

  for (let i = 0; i < endpointsArray.length; i++) {
    let response = await getResponse(endpointsArray[i])
    if (response.data) {
      finalResult = findIsDone(response.data)
    }
  }
  return finalResult
}

final().then((result) => {
  console.log('Значений true:', result.isDoneTrue)
  console.log('Значений false:', result.isDoneFalse)
})
