const core = require('@actions/core');
const github = require('@actions/github');
const { processYamlFile } = require('./updateYaml'); 

try {
  const hostedLink = core.getInput('hosted_link');
  processYamlFile(hostedLink);
} catch (error) {
  core.setFailed(error.message);
}
