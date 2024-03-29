const core = require('@actions/core');

try {
  const command = core.getInput('command');

  const action = command.split(' ')[0];
  const validActions = ['/test', '/build', '/release', '/patch'];
  if (!validActions.includes(action)) {
    throw {
      'message': 'invalid action'
    }
  }

  core.setOutput("action", action);

  if (action === '/test') {
    return;
  }

  const options = command.replace(action, '').split(',').map(mapOption).filter(e => e)
  const argsDependentActions = ['/build', '/release', '/patch'];
  if (argsDependentActions.includes(action) && options.length === 0) {
    throw {
      'message': 'none of the build options are valid'
    }
  }

  core.setOutput("build_options", JSON.stringify(options));
} catch (error) {
  core.setFailed(error.message);
}

function mapOption(option) {
  let options = option.trim().split(' ')

  if (options.length < 2) {
    return null
  }

  let artifact = 'apk'
  if (options.length > 2) {
    artifact = options[0]
    options.shift()
  }

  const flavor = options[0];
  const allowedFlavors = ['dev', 'staging', 'production']
  if (!allowedFlavors.includes(flavor)) {
    return null
  }

  const mode = options[1];
  const allowedMode = ['debug', 'release', 'profile']
  if (!allowedMode.includes(mode)) {
    return null
  }

  const buildOption = `${artifact} ${flavor} ${mode}`;
  const blackListOptions = [
    'appbundle dev debug',
    'appbundle dev profile',
    'appbundle dev release',
    'appbundle staging debug',
    'appbundle staging profile',
    'appbundle staging release',
    'appbundle production debug',
    'appbundle production profile'
  ]
  if (blackListOptions.includes(buildOption)) {
    return null
  }

  return {
    'artifact': artifact,
    'flavor': flavor,
    'mode': mode
  };
}