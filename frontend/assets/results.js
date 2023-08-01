const resultSection = document.querySelector('.results-section')
const resultParent = document.querySelector('main')

function cloneResultSet() {
    const resultSetClone = resultSection.cloneNode(true)
    return resultSetClone
}

// function makeNewResult(dataFromFetch, index) {
//   console.log(dataFromFetch)
//     let cloneData = cloneResultSet()
//     // console.log(cloneData)
//     let resu = ""
//     resu = document.querySelector('main').querySelectorAll(".results-section")
//     console.log(resu[index])
//     // resultParent.append(cloneData)
// }

function makeNewResult(dataFromFetch) {

  for (let i = 0; i < dataFromFetch.length; i++){
    console.log(dataFromFetch[i])
    let clonedData = cloneResultSet()
    clonedData.querySelector('.game-num').textContent = `Game ${(dataFromFetch[i].id)+1}`
    formattedTimestamp = processTimestamp(dataFromFetch[i].timestamp)
    // clonedData.querySelector('completion-date-time-data').textContent = 0
  }
}

function processTimestamp(resultTS) {
  console.log(resultTS)
  let year = resultTS.slice(0, )
  let time = ""
  
  console.log(date)
}


// result-id

// document.addEventListener("load", )

// async function getResults() {
//   let newData = []
//     try{
//       const result = await fetch("http://localhost:3001/results")
//       const data = await result.json()
//       for (const gameDataset of data) {
//         newData.push(gameDataset)
//       }
//       for (let i = 0; i < newData.length; i++){
//         makeNewResult(newData[i], i)
//       }

//     } catch(e) {
//       console.log(e)
//     }
//   }


async function getResults() {
  let newData = []
    try{
      const result = await fetch("http://localhost:3001/results")
      const data = await result.json()
      for (const gameDataset of data) {
        newData.push(gameDataset)
      }
      makeNewResult(newData)

    } catch(e) {
      console.log(e)
    }
  }

getResults();
