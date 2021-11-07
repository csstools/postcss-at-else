# @else <a href="https://github.com/postcss/postcss"><img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right"></a>

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-image]][lic-url]
[![Changelog][log-image]][log-url]
[![Gitter Chat][git-image]][git-url]

[@else] lets you use `@else` inverted media queries in CSS.

```css
/* before */

@media (min-width: 30em) {
	body {
		background-color: blue;
	}
} @else {
	body {
		background-color: yellow;
	}
}


/* after */

@media (min-width: 30em) {
	body {
		background-color: blue;
	}
} @media (max-width: 29.999em) {
	body {
		background-color: yellow;
	}
}
```

## Usage

Add [@else] to your build tool:

```bash
npm install postcss postcss-at-else --save-dev
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [@else] as a PostCSS plugin:

```js
postcss([
	require('postcss-at-else')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [@else] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
	return gulp.src('./src/*.css').pipe(
		postcss([
			require('postcss-at-else')({ /* options */ })
		])
	).pipe(
		gulp.dest('.')
	);
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [@else] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			use: [
				require('postcss-at-else')({ /* options */ })
			]
		},
		dist: {
			src: '*.css'
		}
	}
});
```

[npm-url]: https://www.npmjs.com/package/postcss-at-else
[npm-img]: https://img.shields.io/npm/v/postcss-at-else.svg
[cli-url]: https://github.com/csstools/postcss-at-else/actions/workflows/ci.yaml/badge.svg
[cli-img]: https://github.com/csstools/postcss-at-else/actions/workflows/ci.yaml
[lic-url]: LICENSE.md
[lic-image]: https://img.shields.io/npm/l/postcss-at-else.svg
[log-url]: CHANGELOG.md
[log-image]: https://img.shields.io/badge/changelog-md-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[git-image]: https://img.shields.io/badge/chat-gitter-blue.svg

[@else]: https://github.com/csstools/postcss-at-else
[PostCSS]: https://github.com/postcss/postcss
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
