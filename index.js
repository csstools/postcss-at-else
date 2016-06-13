var postcss = require('postcss');

var allRE = /^(all|print|screen|speech)$/;
var notRE = /^not\s+(all|print|screen|speech)$/;

var maxRE = /^max-/;
var minRE = /^min-/;

var andRE = /\s+and\s+/;
var orRE  = /\s*,\s*/;

var featureRE = /^\s*\(\s*([a-z-]+)\s*:\s*([^\)]+)\s*\)\s*$/;
var lengthRE  = /([-+]?\d*\.?\d+)(%|[a-z]+)?/;
var aspectRE  = /([-+]?\d*\.?\d+)\/([-+]?\d*\.?\d+)/;

var up   = 0.001;
var down = -0.001;

module.exports = postcss.plugin('postcss-at-else', function (opts) {
	var prefix = opts && opts.prefix ? '-' + opts.prefix + '-' : '';

	return function (css) {
		css.walkAtRules(prefix + 'else', function (elseRule) {
			var ifRule = elseRule.prev();

			if (ifRule.type === 'atrule') {
				elseRule.name = 'media';

				elseRule.params = ' ' + invert(ifRule.params);
			}
		});
	};
});

function invert(params) {
	var features = [];

	params.split(orRE).map(function (query, queryIndex) {
		query.split(andRE).map(function (feature, index) {
			if (!features[index]) {
				features[index] = features[index - 1] ? features[index - 1].slice(0, queryIndex) : [];
			}

			features[index].push(invertFeature(feature));
		});
	});

	return features.map(function (feature) {
		return feature.join(' and ');
	}).join(', ');
}

function invertFeature(feature) {
	var matches = feature.match(featureRE);

	if (matches) {
		var name  = matches[1];
		var value = matches[2];

		if (name === 'orientation') {
			if (value === 'portrait') {
				return '(' + name + ': landscape)';
			} else {
				return '(' + name + ': portrait)';
			}
		}

		if (minRE.test(name)) {
			return '(' + name.replace(minRE, 'max-') + ': ' + stepNumber(value, down) + ')';
		}

		if (maxRE.test(name)) {
			return '(' + name.replace(maxRE, 'min-') + ': ' + stepNumber(value, up) + ')';
		}
	} else {
		if (allRE.test(feature)) {
			return 'not ' + feature;
		}

		if (notRE.test(feature)) {
			return feature.replace(notRE, '');
		}
	}

	return feature;
}

function stepNumber(number, step) {
	var aspects = number.match(aspectRE);
	var lengths = number.match(lengthRE);

	if (aspects) {
		var first  = aspects[1];
		var second = String(parseFloat(aspects[2]) + step);

		return first + '/' + second;
	}

	if (lengths) {
		var length = String(parseFloat(lengths[1]) + step);
		var suffix = lengths[2] || '';

		return length + suffix;
	}

	return number;
}
