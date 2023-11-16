const core = require('@actions/core');

try {
  const previousData = core.getInput('previous_data');
  const currentData = core.getInput('current_data');

  console.log(`previousData: ${previousData}`);
  console.log(`currentData: ${currentData}`);

  let previousSummary = {
    'covered_lines': 7390,
    'total_lines': 10142,
    'percentage': 72.87
  };

  let currentSummary = {
    'covered_lines': 6390,
    'total_lines': 10142,
    'percentage': 62.87
  }

  let previousResult = [
    {
      'module': 'authentication_module',
      'covered_lines': 900,
      'total_lines': 1173,
      'percentage': 90.5
    },
    {
      'module': 'discovery_module',
      'covered_lines': 1063,
      'total_lines': 1154,
      'percentage': 86.8
    }
  ];

  let currentResult = [
    {
      'module': 'authentication_module',
      'covered_lines': 1109,
      'total_lines': 1173,
      'percentage': 94.5
    },
    {
      'module': 'discovery_module',
      'covered_lines': 1063,
      'total_lines': 1254,
      'percentage': 84.8
    },
    {
      'module': 'domain_module',
      'covered_lines': 100,
      'total_lines': 1000,
      'percentage': 10
    }
  ];

  let comparisonResult = ''
  let currentAverageCoverage = ''

  core.setOutput('comparison_result', comparisonResult);
  core.setOutput('current_average_coverage', currentAverageCoverage);
} catch (error) {
  core.setFailed(error.message);
}

