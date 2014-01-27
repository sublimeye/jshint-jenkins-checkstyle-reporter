// Author: Boy Baukema
// Modifications for Jenkins JSHint reporter: Sublimeye, Roman Morozov <sublimeye.ua@gmail.com>

module.exports = {
    reporter: function (results) {
        'use strict';

        var files = {}, out = [], pairs = {
                '&': '&amp;',
                '"': '&quot;',
                '\'': '&apos;',
                '<': '&lt;',
                '>': '&gt;'
            }, /* these codes parsed by Jenkins JSHint plugin */
            severityCodes = {
                'e': 'error',
                'w': 'warning',
                'i': 'info'
            }, severity, message, line, column, source;

        function encode(s) {
            for (var r in pairs) {
                if (pairs.hasOwnProperty(r)) {
                    if (typeof(s) !== 'undefined') {
                        s = s.replace(new RegExp(r, 'g'), pairs[r]);
                    }
                }
            }
            return s || '';
        }

        function getSeverity(code) {
            return severityCodes[code.charAt(0).toLowerCase()] || '';
        }

        function makeAttribute(attr, valueObject) {
            if (valueObject[attr]) {
                return ' ' + attr + '="' + valueObject[attr] + '"';
            }
            return '';
        }

        results.forEach(function (result) {
            // Register the file
            result.file = result.file.replace(/^\.\//, '');
            if (!files[result.file]) {
                files[result.file] = [];
            }

            // Add the error
            files[result.file].push({
                line    : result.error.line,
                column  : result.error.character,
                severity: getSeverity(result.error.code),
                message : encode(result.error.reason),
                source  : 'jshint.' + result.error.code
            });
        });

        out.push('<?xml version=\"1.0\" encoding=\"utf-8\"?>');
        out.push('<checkstyle version=\"4.3\">');

        Object.keys(files).forEach(function (file) {
            out.push('\t<file name="' + file + '">');

            files[file].forEach(function (error) {

                line = makeAttribute('line', error);
                column = makeAttribute('column', error);
                severity = makeAttribute('severity', error);
                message = makeAttribute('message', error);
                source = makeAttribute('source', error);

                out.push('\t\t<error' + line + column + severity + message + source + ' />');
            });

            out.push('\t</file>');
        });

        out.push('</checkstyle>');

        process.stdout.write(out.join('\n') + '\n');
    }
};
