module.exports =
{
	reporter: function (results)
	{
		"use strict";

		var files = {},
				out = [],
				pairs = {
					"&": "&amp;",
					'"': "&quot;",
					"'": "&apos;",
					"<": "&lt;",
					">": "&gt;"
				},
				severityCodes = {
					'e': 'HIGH',
					'w': 'MEDIUM',
					'i': 'LOW'
				},
				file, i, issue, severity, reason, evidence, character, line;

		function encode(s) {
			for (var r in pairs) {
				if (typeof(s) !== "undefined") {
					s = s.replace(new RegExp(r, "g"), pairs[r]);
				}
			}
			return s || "";
		}

		function parseSeverity(code) {
			return severityCodes[ code.charAt(0).toLowerCase() ] || '';
		}


		results.forEach(function (result) {
			result.file = result.file.replace(/^\.\//, '');
			if (!files[result.file]) {
				files[result.file] = [];
			}
			files[result.file].push(result.error);
		});

		out.push("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		out.push("<jslint>");

		for (file in files) {
			out.push('\t<file name="/' + file + '">');

			for (i = 0; i < files[file].length; i++) {
				issue = files[file][i];
				reason = encode(issue.reason);
				evidence = encode(issue.evidence);
				severity = encode(parseSeverity(issue.code));
				character = issue.character;
				line = issue.line;

				out.push('\t\t<issue line="'+line+'" char="'+character+'" reason="'+reason+'" evidence="'+evidence+'" severity="'+severity+'" />');

			}
			out.push('\t</file>');
		}

		out.push("</jslint>");

		process.stdout.write(out.join("\n") + "\n");
	}
};
