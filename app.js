var AWS = require("aws-sdk");
var S3 = new AWS.S3({
  accessKeyId: "AKIAYDL5INNMUYTFRRXF",
  secretAccessKey: "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",
});

const port = process.env.PORT || 3000,
  http = require("http"),
  fs = require("fs"),
  html = fs.readFileSync("index.html");

const server = http.createServer(function (req, res) {
  S3.listBuckets(function (err, data) {
    console.log("in-1");
    var bucketList = "";
    if (err) bucketList = JSON.stringify(err); // an error occurred
    else {
      console.log("in-2");
      // successful response
      for (var a = 0; a < data.Buckets.length; a++) {
        bucketList += JSON.stringify(data.Buckets[a].Name);
      }
      console.log(bucketList);
    }
    console.log("in-4");
    res.writeHead(200);
    res.write(bucketList);
    res.end();
  });
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:" + port + "/");
