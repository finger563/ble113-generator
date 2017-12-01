var filendir = require('filendir');
var fs = require('fs');
var ejs = require('ejs');
require('amd-loader');

var templates = require('./templates/Templates');

// command line help printing and related utilities
var scriptName = process.argv[1].split('/');
scriptName = scriptName[ scriptName.length - 1 ];

function get_usage() {
    var usage = "\n";
    usage += "Usage: " + scriptName + ' <options> <output folder>\n';
    usage += "options:\n";
    usage += get_options('\t') + '\n';
    return usage;
}

function get_options(prefix) {
    var options = "";
    options += prefix + '--language <language to generate templates for: bgs | c | c++>\n';
    return options
}

function print_usage(exit, code) {
    console.log(get_usage());
    if (exit) {
        process.exit(code);
    }
}

// Template handling code
function generateProject(projectName, language) {
    var lang = language || 'cpp';
    var artifacts = {};

    // make folder name
    var prefix = projectName;

    // select artifacts by language
    var selectedArtifactKeys = Object.keys(templates).filter(function(key) { return key.startsWith(lang + '/'); });

    // render all artifacts
    selectedArtifactKeys.map(function(key) {
	artifacts[key] = ejs.render( templates[key], {} );
        // make filename
        var fileName = prefix + '/' + key;
        // now write all artifacts out
        filendir.ws(fileName, artifacts[key]);
        console.log('wrote: '+fileName);
    });
}

// now the main code
var projectName = 'BLEProject';
var language = 'cpp';
var artifacts = {};

if (process.argv.length == 5) {
    if (process.argv[2] == '--language') {
        language = process.argv[3];
        projectName = process.argv[4];
    }
    else {
        print_usage(true, -1);
    }
}
else if (process.argv.length == 3)
{
    if (process.argv[2] == '--help') {
        print_usage(true, 0);
    }
    else {
        projectName = process.argv[2];
    }
}
else {
    console.error('Incorrect arguments!');
    print_usage(true, -1);
}

generateProject( projectName, language );
