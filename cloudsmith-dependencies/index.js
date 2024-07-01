const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

const { processYamlFile } = require('./updateYaml'); 

try {
  const hostedLink = core.getInput('hosted_link');
  processYamlFile(hostedLink, 'pubspec.yaml', true);

  const exampleFile = 'example/pubspec.yaml';
  fs.stat(exampleFile, function(err, stat) {
    if (err == null) {
      processYamlFile(hostedLink, 'example/pubspec.yaml', false);
    } else if (err.code === 'ENOENT') {
      console.log('File does not exists');
    } else {
      console.log('unknown error: ', err.code);
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
