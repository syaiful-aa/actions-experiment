const core = require('@actions/core');

try {

  let options = {
    'previous_version': '2.18.0',
    'current_version': '2.19.0',
    'previous_coverage': '72.87% (7390 of 10142 lines)',
    'current_coverage': '62.87% (6390 of 10142 lines)',
    'previous_result': [
      {
        'module': 'authentication_module',
        'result': '90.5% (900 of 1173 lines)'
      },
      {
        'module': 'discovery_module',
        'result': '86.8% (1063 of 1154 lines)'
      }
    ],
    'current_result': [
      {
        'module': 'authentication_module',
        'result': '94.5% (1109 of 1173 lines)'
      },
      {
        'module': 'discovery_module',
        'result': '84.8% (1063 of 1254 lines)'
      },
      {
        'module': 'domain_module',
        'result': '10% (100 of 1000 lines)'
      }
    ],
  };
  
  core.setOutput("build_options", JSON.stringify(options));
} catch (error) {
  core.setFailed(error.message);
}

