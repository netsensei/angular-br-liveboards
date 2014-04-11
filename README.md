## Angular Belgian Rail Liveboards

### What is this?

So you want to add a Belgian Rail Liveboard with real time departure information to your
app? This project packs an [Angular](http://angularjs.org) directive that does just that.

### How to use?

Use this directive in your Angular templates:

```
<div br-liveboards>
```

The above tag will show a dropdown of all the available stations in the iRail API. After
selecting a station, the liveboard will be retrieved and dipslayed.

You want to display the liveboard of a specific station? Can do! Add the ```station```
attribute:

```
<div br-liveboards station="'Antwerp Central'">
```

### How to install?

- Add the CSS and JS files from the build/ folder in your app.
- Add the directive anywhere to your templates
- Profit!

### How does it work?

The data is pulled from [data.irail.be](https://data.irail.be/). There are no
guarantees about the correctness of the data or the availablity of the API.

### Contribute

Development requires Grunt, Node and Bower. You'll need to run these commands to
get going:

```
npm install
bower install
```

Unit tests provided via Karma via ```grunt watch```.

Please file issues in the Github issue queue.

## License

The MIT License (MIT)
