const core = require('@actions/core');

try {
  const previousData = core.getInput('previous_data');
  const currentData = core.getInput('current_data');

  console.log(`previousData: ${previousData}`);
  console.log(`currentData: ${currentData}`);

  const previousDataResult = mapInput(previousData)
  const currentDataResult = mapInput(currentData)

  const comparisonResult = compareCoverage(previousDataResult, currentDataResult);
  const currentAverageCoverage = `average coverage : ${getFormattedAverageCoverage(currentDataResult.summary)}`

  console.log(comparisonResult);

  core.setOutput('comparison_result', comparisonResult);
  core.setOutput('current_average_coverage', currentAverageCoverage);
} catch (error) {
  core.setFailed(error.message);
}


function compareCoverage(previous, current) {
  let result = `version: ${previous.version} --> ${current.version}\n`

  const concatModules = Object.keys(previous.coverage).concat(Object.keys(current.coverage));
  const allModules = concatModules.filter((item, pos) => concatModules.indexOf(item) === pos)

  for (const item of allModules) {
    let before = 'none';
    let after = 'none';

    if (item in previous.coverage) {
      const itemValue = previous.coverage[item];
      before = `${itemValue.percentage}%, ${itemValue.covered_lines} of ${itemValue.total_lines} lines`;
    }

    if (item in current.coverage) {
      const itemValue = current.coverage[item];
      after = `${itemValue.percentage}%, ${itemValue.covered_lines} of ${itemValue.total_lines} lines`;
    }

    result += `${item} : ${before} --> ${after}\n`;
  }

  result += `average coverage : ${getFormattedAverageCoverage(previous.summary)} --> ${getFormattedAverageCoverage(current.summary)}`;

  return result;
}

function getFormattedAverageCoverage(input) {
  return `${input.percentage}%, ${input.covered_lines} of ${input.total_lines} lines`;
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