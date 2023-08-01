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
function processTimestamp(resultTS) {
  console.log(resultTS)
  const year = resultTS.slice(0,4)
  const month = resultTS.slice(5,7)
  const day = resultTS.slice(8,10)
  const time = resultTS.slice(11,19)
  newTimestamp = day.concat("/", month, "/", year, "  ", time)
  return newTimestamp
}

function makeNewResult(dataFromFetch) {
  let formattedTimestamp = ""
  for (let i = 0; i < dataFromFetch.length; i++){
    if (resultSection.querySelector('.game-num').textContent != 'Game 1'){
      resultSection.querySelector('.game-num').textContent = `Game ${(dataFromFetch[i].id)+1}`;
      resultSection.querySelector('.completion-title').textContent = 'Completed: ';
      formattedTimestamp = processTimestamp(dataFromFetch[i].timestamp)
      resultSection.querySelector('.completion-date-time-data').textContent = formattedTimestamp
      
    } else{
      console.log(dataFromFetch[i])
      let clonedData = cloneResultSet()
      clonedData.querySelector('.game-num').textContent = `Game ${(dataFromFetch[i].id)+1}`
      formattedTimestamp = processTimestamp(dataFromFetch[i].timestamp)
      clonedData.querySelector('.completion-date-time-data').textContent = formattedTimestamp
      resultParent.appendChild(clonedData)
    }
  }
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
