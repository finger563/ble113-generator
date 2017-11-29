var fs = require('fs');

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

// now the main code
if (process.argv.length == 4) {
    if (process.argv[2] == '--array') {
        outputType = 'ARRAY';
    }
    else if (process.argv[2] == '--string') {
        outputType = 'STRING';
    }
    else {
        print_usage(true, -1);
    }
    
    input = process.argv[3];
    output = input + '.converted.json';
}
else if (process.argv.length == 3)
{
    if (process.argv[2] == '--help') {
        print_usage(true, 0);
    }
    else {
        input = process.argv[2];
        output = input + '.converted.json';
    }
}
else {
    console.error('Incorrect arguments!');
    print_usage(true, -1);
}
