// tooling
const postcss = require('postcss');

// and/or matchers
const andMatch = /\s+and\s+/;
const orMatch  = /\s*,\s*/;

// not matcher
const notMatch = /^not\s+(all|print|screen|speech)$/;

// min/max matchers
const maxMatch = /^max-/;
const minMatch = /^min-/;

// feature matchers
const featureMatch = /^\s*\(\s*([a-z-]+)\s*:\s*([^\)]+)\s*\)\s*$/;
const lengthMatch = /([-+]?\d*\.?\d+)(%|[a-z]+)?/;
const aspectMatch = /([-+]?\d*\.?\d+)\/([-+]?\d*\.?\d+)/;

// step values
const up   = 0.001;
const down = -0.001;

// plugin
module.exports = postcss.plugin('postcss-at-else', ({
	prefix = ''
} = {}) => {
	// dashed prefix
	const dashedPrefix = prefix ? `-${ prefix }-` : '';

	return (css) => {
		// walk each matching at-rule
		css.walkAtRules(`${ dashedPrefix }else`, (elseRule) => {
			// previous node
			const ifRule = elseRule.prev();

			// if previous node is an at-rule
			if (ifRule.type === 'atrule') {
				// rename else at-rule to media at-rule
				elseRule.name = 'media';

				// apply inverted media query
				elseRule.params = ` ${ invert(ifRule.params) }`;
			}
		});
	};
});

// override plugin#process
module.exports.process = function (cssString, pluginOptions, processOptions) {
	return postcss([
		0 in arguments ? module.exports(pluginOptions) : module.exports()
	]).process(cssString, processOptions);
};

// invert media query
const invert = (params) => {
	const features = [];

	// for each query
	params.split(orMatch).forEach((query, queryIndex) => {
		// for each combinator
		query.split(andMatch).forEach((feature, index) => {
			// if this feature index yet exists
			if (!features[index]) {
				// feature index
				features[index] = features[index - 1] ? features[index - 1].slice(0, queryIndex) : [];
			}

			// push the inverted feature to the feature index
			features[index].push(invertFeature(feature));
		});
	});

	// return all features invertly joined
	return features.map((feature) => feature.join(' and ')).join(', ');
};

// invert feature
const invertFeature = (feature) => {
	// matched feature query
	const matches = feature.match(featureMatch);

	// if the feature query was matched
	if (matches) {
		// name and value of query
		const name  = matches[1];
		const value = matches[2];

		// update orientation query
		if (name === 'orientation') {
			return `(${ name }: ${ value === 'portrait' ? 'landscape' : 'portrait' })`;
		}

		// update min-length query
		if (minMatch.test(name)) {
			return `(${ name.replace(minMatch, 'max-') }: ${ stepNumber(value, down) })`;
		}

		// update max-length query
		if (maxMatch.test(name)) {
			return `(${ name.replace(minMatch, 'min-') }: ${ stepNumber(value, up) })`;
		}

		return feature;
	} else if (notMatch.test(feature)) {
		// replaced not query
		return feature.replace(notMatch, '');
	} else {
		// notted any other query
		return `not ${ feature }`;
	}
};

// step a number up or down by a value
const stepNumber = (number, step) => {
	// aspect ratio and length
	const aspects = number.match(aspectMatch);
	const lengths = number.match(lengthMatch);

	// step aspect ratios
	if (aspects) {
		const first  = aspects[1];
		const second = String(parseFloat(aspects[2]) + step);

		return `${ first }/${ second }`;
	}

	// step lengths
	if (lengths) {
		const length = String(parseFloat(lengths[1]) + step);
		const suffix = lengths[2] || '';

		return length + suffix;
	}

	return number;
};
