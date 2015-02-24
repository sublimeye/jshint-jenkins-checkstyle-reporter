JSHint checkstyle reporter
==================================

##Changes of this Fork
This is fork extends the checkstyle reporter of sublimeye. The reporter is now retrieved by a factory function. For each creation of a reporter it saves all files that were reported to have errors. When JSHint is finished the plugin offers a generateReport() method to retrieve a **single** checkstyle XML string containing the results of all these files.

## For JSHint Report Plugin (Jenkins Checkstyle Plugin)

Modified version of JSHint checkstyle reporter that supports different severity levels:
`High`, `Medium`, `Low`.

This reporter will add colors to your JSHint Trend reports in Jenkins,
produced by [JSHint Report Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Checkstyle+Plugin).

## Getting Started
It is designed to use together with grunt (& grunt-contrib-jshint plugin).

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install jshint-jenkins-checkstyle-reporter --save-dev
```

Also you may want to install it globally by passing `-g` flag. That allows you to use this
reporter in all your projects.

Once the reporter has been installed, it may be enabled inside your Gruntfile in jshint
configuration:

```js
jshint: {
	options: {
		reporter: require('jshint-jenkins-checkstyle-reporter'),
		reporterOutput: 'report-jshint-checkstyle.xml'
	}
}
```

P.S. Don't try to fix reporter for Jenkins Validations Plugin. The plugin has hardcoded severity
level and must be fixed first.

P.P.S. Perhaps these modifications should/will be pulled into JSHint checkstyle reporter some day
. Or will be added as additional reporter.
