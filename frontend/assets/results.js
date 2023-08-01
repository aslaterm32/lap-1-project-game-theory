const resultSet = document.querySelector(".result-set");
const shrunk = document.querySelector(".results-shrunk")

function cloneResultSet() {
    const resultSetClone = resultSet.cloneNode(true)
    return resultSetClone
}

function makeNewResult(dataFromFetch) {
  console.log(dataFromFetch)
    let cloneData = cloneResultSet()
    console.log(cloneData)
}


// document.addEventListener("load", )

async function getResults() {
  let newData = []
    try{
      const result = await fetch("http://localhost:3000/results")
      const data = await result.json()
      for (const gameDataset of data) {
        newData.push(gameDataset)
      }
      for (let i = 0; i < newData.length; i++){
        makeNewResult(newData[i])
      }

    } catch(e) {
      console.log(e)
    }
  }


getResults();
