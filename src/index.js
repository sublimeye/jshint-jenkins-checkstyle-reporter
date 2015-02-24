module.exports = function() {

    var out = [
        '<?xml version="1.0" encoding="utf-8"?>',
        '<checkstyle version="4.3">'
    ];

    return {

        reporter: function(results, data, opts) {
            'use strict';

            var files = {},
                pairs = {
                    '&': '&amp;',
                    '"': '&quot;',
                    '\'': '&apos;',
                    '<': '&lt;',
                    '>': '&gt;'
                },
                /* these codes parsed by Jenkins JSHint plugin */
                severityCodes = {
                    'e': 'error',
                    'w': 'warning',
                    'i': 'info'
                },
                file, severity, message, line, column, source;

            function encode(s) {
                for (var r in pairs) {
                    if (typeof(s) !== 'undefined') {
                        s = s.replace(new RegExp(r, 'g'), pairs[r]);
                    }
                }
                return s || '';
            }

            function getSeverity(code) {
                return severityCodes[code.charAt(0).toLowerCase()] || '';
            }

            function makeAttribute(attr, valueObject) {
                if (!valueObject[attr]) {
                    throw Error('No property ' + attr + ' in error object');
                }

                return ' ' + attr + '="' + valueObject[attr] + '"';
            }

            results.forEach(function(result) {
                // Register the file
                result.file = result.file.replace(/^\.\//, '');
                if (!files[result.file]) {
                    files[result.file] = [];
                }

                // Add the error
                files[result.file].push({
                    line: result.error.line,
                    column: result.error.character,
                    severity: getSeverity(result.error.code),
                    message: encode(result.error.reason),
                    source: 'jshint.' + result.error.code
                });
            });

            Object.keys(files).forEach(function(file) {
                out.push('\t<file name="' + file + '">');

                files[file].forEach(function(error) {

                    line = makeAttribute('line', error);
                    column = makeAttribute('column', error);
                    severity = makeAttribute('severity', error);
                    message = makeAttribute('message', error);
                    source = makeAttribute('source', error);

                    out.push('\t\t<error' + line + column + severity + message + source + ' />');
                });

                out.push('\t</file>');
            });
        },

        generateReport: function() {
            return out.concat(['</checkstyle>']).join('\n');
        }

    };

};
