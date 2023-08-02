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


function makeNewResult(dataFromFetch) {
  for (let i = 0; i < dataFromFetch.length; i++) {
    let resultSet;

    if (i === 0) {
      resultSet = resultSection;
    } else {
      resultSet = cloneResultSet();
      resultParent.appendChild(resultSet);
    }

    const gameNumElement = resultSet.querySelector('.game-num');
    const completionTitleElement = resultSet.querySelector('.completion-title');
    const dateTimeDataElement = resultSet.querySelector('.completion-date-time-data');

    gameNumElement.textContent = `Game ${dataFromFetch[i].id + 1}`;
    completionTitleElement.textContent = 'Completed:';
    dateTimeDataElement.textContent = processTimestamp(dataFromFetch[i].timestamp);

    resultSet.classList.remove('results-win', 'results-loss', 'results-draw');

    if (dataFromFetch[i].userWin === 'win') {
      resultSet.classList.add('results-win');
    } else if (dataFromFetch[i].userWin === 'loss') {
      resultSet.classList.add('results-loss');
    } else if (dataFromFetch[i].userWin === 'draw') {
      resultSet.classList.add('results-draw');
    }
  }
}

//The starting function that links into the others.
async function getResults() {
  let newData = []
    try{
      const result = await fetch("https://game-theory-d7wp.onrender.com/results")
      const data = await result.json()
      for (const gameDataset of data) {
        newData.push(gameDataset)
      }

      resultSection.classList.remove('results-win', 'results-loss', 'results-draw');

      makeNewResult(newData)

    } catch(e) {
      console.log(e)
    }
  }

getResults();


// feel free to use console logs to see how the data changes along the way
