# Angular + Require.js app

Angular application that utilises requirejs for lazy loading.

## Setup
All of the code and templates are based outside of the public folder.
The application uses grunt to concatenate, uglify and copy code and templates
to the relevant directories in public.

```
$ grunt
```

## Tests
### Install karma
```
$ npm install -g karma-cli
$ npm install
```

### Run tests
```
$ cd app
$ karma start karma.conf.js
```
