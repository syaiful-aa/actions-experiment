const core = require('@actions/core');

try {

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

  core.setOutput('previous_version','2.18.0');
  core.setOutput('current_version','2.19.0');

  core.setOutput('previous_summary', JSON.stringify(previousSummary));
  core.setOutput('current_summary', JSON.stringify(currentSummary));

  core.setOutput('previous_result', JSON.stringify(previousResult));
  core.setOutput('current_result', JSON.stringify(currentResult));

} catch (error) {
  core.setFailed(error.message);
}

