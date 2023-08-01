const resultSet = document.querySelector(".result-set");
const shrunk = document.querySelector(".results-shrunk")

function cloneResultSet() {
    const resultSetClone = resultSet.cloneNode(true)
}

function makeNewResult() {
    cloneResultSet
}


// document.addEventListener("load", )

// async function getResults(){
//     let resultsList = []
//     const fetchedResults = await fetch ("http://localhost:3000/results")

//     const result = await fetchedResults.json()

// }


// let results = getResults()


// async function getResults() {
//     const result = await fetch("http://localhost:3000/results")
//         .then((resp) => {
//             resp.json()
//         })
//         .catch((e) => console.log(e))
// }

// let results = getResults()
// console.log(results)

async function getResults() {
    try{
      const result = await fetch("http://localhost:3000/results")
      const data = await result.json()
      return data
    } catch(e) {
      console.log(e)
    }
  }
  
  let results = getResults();
