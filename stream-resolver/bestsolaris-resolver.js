
const axios = require('axios')

async function resolve(result, teamName1, teamName2) {
  if (result.bestsolaris != null) return

  console.log('Resolving bestsolaris')
  await attemptToResolve(result, teamName2, teamName1)
  if (result.bestsolaris == null) await attemptToResolve(result, teamName1, teamName2)
}

async function attemptToResolve(result, teamName1, teamName2) {
  let url = 'https://bestsolaris.com/nbastreams/' +
    (teamName1.split(' ').join('-') + '-vs-' + teamName2.split(' ').join('-')).toLowerCase()
  try {
    let res = await axios.get(url)

    // Find url
    var embedRegex = new RegExp('iframe.*?src="(https:\/\/bestsolaris.*?)".*?iframe', 'g')
    var embed = embedRegex.exec(res.data)
    result.bestsolaris = embed[1]
  } catch(error) {
    console.log(`Failed to resolve ${url}, status code ${error}`)
  }
}

module.exports = { resolve }