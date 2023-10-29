var AWS = require("aws-sdk");
var S3 = new AWS.S3();

const port = process.env.PORT || 3000,
  http = require("http"),
  fs = require("fs"),
  html = fs.readFileSync("index.html");

const server = http.createServer(function (req, res) {
  S3.listBuckets(function (err, data) {
    var bucketList = "";
    if (err) bucketList = JSON.stringify(err); // an error occurred
    else {
      for (var a = 0; a < data.Buckets.length; a++) {
        bucketList += JSON.stringify(data.Buckets[a].Name);
      }
    }
    res.writeHead(200);
    res.write(bucketList);
    res.end();
  });
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:" + port + "/");
