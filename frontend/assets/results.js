const resultSection = document.querySelector('.results-section')
const resultParent = document.querySelector('main')

// simple clone of the first section (works as long as all elements are present at loadtime)
function cloneResultSet() {
    const resultSetClone = resultSection.cloneNode(true)
    return resultSetClone
}

// reformatting timestamps (called within the makeNewResult function)
function processTimestamp(resultTS) {
  const year = resultTS.slice(0,4)
  const month = resultTS.slice(5,7)
  const day = resultTS.slice(8,10)
  const time = resultTS.slice(11,19)
  newTimestamp = day.concat("/", month, "/", year, "  ", time)
  return newTimestamp
}

function capitaliseFirst(word){
  // to be done later (presentation only, not imperative)
}

function formatMoveList(moveSet) {
  let stringedList = (moveSet.toString()).toUpperCase();
  return stringedList
}

function makeNewResult(dataFromFetch) {
  let formattedTimestamp = ""
  for (let i = 0; i < dataFromFetch.length; i++){
    if (resultSection.querySelector('.game-num').textContent != 'Game 1'){
      resultSection.querySelector('.game-num').textContent = `Game ${(dataFromFetch[i].id)+1}`;
      resultSection.querySelector('.completion-title').textContent = 'Completed: ';
      formattedTimestamp = processTimestamp(dataFromFetch[i].timestamp)
      resultSection.querySelector('.completion-date-time-data').textContent = formattedTimestamp
      //The expanded results section
      resultSection.querySelector('.strategy-row').textContent = `Strategy: ${dataFromFetch[i].strategy}`;
      resultSection.querySelector('.player-revenue').textContent = `Player Revenue: £${dataFromFetch[i].userScore}`;
      resultSection.querySelector('.player-moves').textContent = `Player Choices: ${formatMoveList(dataFromFetch[i].userChoice)}`;
      resultSection.querySelector('.ai-revenue').textContent = `AI Revenue: £${dataFromFetch[i].appScore}`;
      resultSection.querySelector('.ai-moves').textContent = `AI Choices: ${formatMoveList(dataFromFetch[i].appChoice)}`;

      
    } else{
      let clonedData = cloneResultSet()
      clonedData.querySelector('.game-num').textContent = `Game ${(dataFromFetch[i].id)+1}`
      formattedTimestamp = processTimestamp(dataFromFetch[i].timestamp)
      clonedData.querySelector('.completion-date-time-data').textContent = formattedTimestamp
      //The expanded results section
      clonedData.querySelector('.strategy-row').textContent = `Strategy: ${dataFromFetch[i].strategy}`
      clonedData.querySelector('.player-revenue').textContent = `Player Revenue: £${dataFromFetch[i].userScore}`;
      clonedData.querySelector('.player-moves').textContent = `Player Choices: ${formatMoveList(dataFromFetch[i].userChoice)}`;
      clonedData.querySelector('.ai-revenue').textContent = `AI Revenue: £${dataFromFetch[i].appScore}`;
      clonedData.querySelector('.ai-moves').textContent = `AI Choices: ${formatMoveList(dataFromFetch[i].appChoice)}`;
      resultParent.appendChild(clonedData)
    }
  }
}

//The starting function that links into the others.
async function getResults() {
  let newData = []
    try{
      const result = await fetch("http://localhost:3000/results")
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




// feel free to use console logs to see how the data changes along the way
function expandShrink(ev) {
  const clickedResultSet = e.currentTarget;
  
}

resultSection.addEventListener('click', e => {
  expandShrink(e)
})


