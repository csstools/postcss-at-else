# At-Else

<a href="https://github.com/postcss/postcss"><img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="80" height="80" align="right"></a>

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[At-Else] is a [PostCSS] plugin that allows you to use `@else` inverted media queries.

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

Follow these steps to use [At-Else].

Add [At-Else] to your build tool:

```bash
npm install postcss-at-else --save-dev
```

#### Node

```js
require('postcss-at-else')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [At-Else] as a PostCSS plugin:

```js
postcss([
    require('postcss-at-else')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [At-Else] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-at-else')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [At-Else] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-at-else')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

## Options

#### `prefix`

Type: `String`  
Default: `null`

Specifies a prefix to be surrounded by dashes before the at-rule (e.g. `x` for `@-x-else`).

[ci]:      https://travis-ci.org/jonathantneal/postcss-at-else
[ci-img]:  https://img.shields.io/travis/jonathantneal/postcss-at-else.svg
[npm]:     https://www.npmjs.com/package/postcss-at-else
[npm-img]: https://img.shields.io/npm/v/postcss-at-else.svg

[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss

[At-Else]: https://github.com/jonathantneal/postcss-at-else
