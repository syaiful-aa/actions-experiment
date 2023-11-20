const core = require('@actions/core');

try {
  let body = core.getInput('pr_body');
  console.log(`input:\n${body}`);

  body = body.replaceAll('\n', '').replaceAll('\r', '');
  const delimiter = "- [x]";

  let items = body.split(delimiter).map(x => x.trim());
  items.shift();

  let message = '';
  for (const item of items) {
      message += `${item}\n`
  }

  console.log(`output:\n${message}`);

  core.setOutput("message", message);
} catch (error) {
  core.setFailed(error.message);
}
