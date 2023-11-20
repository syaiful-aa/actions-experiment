const core = require('@actions/core');

try {
  const body = core.getInput('pr_body');

  console.log(body);

  let message = '';
  core.setOutput("message", message);
} catch (error) {
  core.setFailed(error.message);
}
