var { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
var S3 = new S3Client();
var listBucketsCommand = new ListBucketsCommand({});

const port = process.env.PORT || 3000,
  http = require("http"),
  fs = require("fs"),
  html = fs.readFileSync("index.html");

const server = http.createServer(async function (req, res) {
  const { Owner, Buckets } = await S3.send(listBucketsCommand);
  console.log(
    `${Owner.DisplayName} owns ${Buckets.length} bucket${
      Buckets.length === 1 ? "" : "s"
    }:`
  );
  res.write(`${Buckets.map((b) => ` • ${b.Name}`).join("\n")}`);
  res.end();
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:" + port + "/");
