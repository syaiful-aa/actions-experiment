const core = require('@actions/core');

try {
  const previousData = core.getInput('previous_data');
  const currentData = core.getInput('current_data');

  const previousDataResult = mapInput(previousData)
  const currentDataResult = mapInput(currentData)

  const comparisonResult = compareCoverage(previousDataResult, currentDataResult);
  console.log(comparisonResult);
  core.setOutput('comparison_result', comparisonResult);
} catch (error) {
  core.setFailed(error.message);
}

function compareCoverage(previous, current) {
  const concatModules = Object.keys(previous.coverage).concat(Object.keys(current.coverage));
  const allModules = concatModules.filter((item, pos) => concatModules.indexOf(item) === pos)

  let table = `<table border="1"><tr><th width="auto">Modules</th><th width="auto">${previous.version}</th><th width="auto">${current.version}</th><th width="auto">+/-</th></tr>`;
  for (const item of allModules) {
    const prevValue = previous.coverage[item] ? `${previous.coverage[item].percentage}%(${previous.coverage[item].covered_lines} of ${previous.coverage[item].total_lines} lines)` : 'N/A';
    const currValue = current.coverage[item] ? `${current.coverage[item].percentage}%(${current.coverage[item].covered_lines} of ${current.coverage[item].total_lines} lines)` : 'N/A';
    const diff = getFormattedComparison(current.coverage[item] ? parseFloat(current.coverage[item].percentage) : 0, previous.coverage[item] ? parseFloat(previous.coverage[item].percentage) : 0);
    table += `<tr><td>${item}</td><td align="right">${prevValue}</td><td align="right">${currValue}</td><td align="center">${diff}</td></tr>`;
  }
  const avText = getFormattedComparison(current.summary.percentage, previous.summary.percentage);
  table += `<tr><td align="center">Average</td><td align="center">${previous.summary.percentage}%</td><td align="center">${current.summary.percentage}%</td><td align="center">${avText}</td></tr>`;
  table += '</table>';
  return table;
}

function getFormattedComparison(after, before) {
  const diff = (after - before).toFixed(1);
  if (diff > 0) {
    return "$${\\color{green}" + `+${diff}` + "}$$";
  } else if (diff < 0) {
    return "$${\\color{red}" + `${diff}` + "}$$";
  } else {
    return diff;
  }
}

function mapInput(input) {
  let inputDataChunks = input.split("-");
  const version = inputDataChunks[0].split(':')[1].trim();
  inputDataChunks.shift();

  let result = {
    'version': version
  }

  let coverageMap = {};
  let coveredLines = 0;
  let totalLines = 0;

  for (const item of inputDataChunks) {
    const itemChunks = item.split(":").map((x) => x.trim())
    if (itemChunks.length < 2) {
      continue;
    }

    const itemValueChunks = itemChunks[1].split(',').map((x) => x.trim())
    if (itemValueChunks.length < 3) {
      continue;
    }

    coveredLines += parseFloat(itemValueChunks[1])
    totalLines += parseFloat(itemValueChunks[2])

    coverageMap[itemChunks[0]] = {
      'percentage': itemValueChunks[0],
      'covered_lines': itemValueChunks[1],
      'total_lines': itemValueChunks[2]
    };
  }

  const averagePercentage = ((coveredLines / totalLines) * 100).toFixed(2);
  const summaryMap = {
    'percentage': averagePercentage,
    'covered_lines': coveredLines,
    'total_lines': totalLines
  };

  result['coverage'] = coverageMap;
  result['summary'] = summaryMap;
  return result;
}