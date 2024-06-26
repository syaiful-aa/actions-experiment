
const fs = require('fs');
const yaml = require('yaml');

// Function to convert version from v3 to ">=3.0.0 <4.0.0"
function convertVersion(version) {
    const major = parseInt(version.substring(1)); 
    const nextMajor = major + 1;
    return `>=${major}.0.0 <${nextMajor}.0.0`;
}

// Function to update dependency section
function updateDependency(depName, yamlObj, hostedLink) {
    const depDetails = yamlObj['dependencies'][depName];
    if (depDetails && depDetails.git) {
        depDetails.hosted = hostedLink;
        if (!depDetails.git.ref.startsWith('v')) {
            depDetails.version = 'any';
        } else {
            depDetails.version = convertVersion(depDetails.git.ref);
        }
        delete depDetails.git;
    }
}

// Function to find dependencies with git references
function findDependenciesWithGit(yamlObj) {
    return Object.keys(yamlObj.dependencies).filter(depName => {
        return yamlObj['dependencies'][depName] && yamlObj['dependencies'][depName].git;
    });
}


// Function to process YAML file and update dependencies
function processYamlFile(hostedLink) {
    const filename = 'pubspec.yaml';
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filename}: ${err}`);
            return;
        }

        try {
            const yamlObj = yaml.parse(data);
            const dependencies = findDependenciesWithGit(yamlObj);

            dependencies.forEach(depName => {
                updateDependency(depName, yamlObj, hostedLink);
            });

            // Convert YAML object back to string
            const updatedYaml = yaml.stringify(yamlObj);

            // Write updated YAML back to file
            fs.writeFile(filename, updatedYaml, 'utf8', (err) => {
                if (err) {
                    console.error(`Error writing file ${filename}: ${err}`);
                    return;
                }
                console.log(`Replacement complete. Check the file ${filename}`);
            });
        } catch (e) {
            console.error(`Error parsing YAML in file ${filename}: ${e}`);
        }
    });
}

module.exports = {
    processYamlFile
};
