const core = require('@actions/core');

try {

  let options = {
    'previous_version': '2.18.0',
    'current_version': '2.19.0',
    'previous_summary': {
      'covered_lines': 7390,
      'total_lines': 10142,
      'percentage': 72.87
    },
    'current_summary': {
      'covered_lines': 6390,
      'total_lines': 10142,
      'percentage': 62.87
    },
    'previous_result': [
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
    ],
    'current_result': [
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
    ],
  };
  
  core.setOutput("result", JSON.stringify(options));
  core.setOutput("result_raw", options);
} catch (error) {
  core.setFailed(error.message);
}

