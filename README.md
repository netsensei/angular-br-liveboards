## Angular Belgian Rail Liveboards

### What is this?

So you want to add a Belgian Rail Liveboard with real time information to your
app? This project packs a directive that does just that.

### How to use?

Add the br-liveboards data attribute to any element in your Angular templates:

```
<div br-liveboards>
```

You don't want to the liveboard of a specific station? Can do!

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
