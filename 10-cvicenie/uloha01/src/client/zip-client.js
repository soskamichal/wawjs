const fs = require('fs')
const http = require('http')
const path = require('path')
const { pipeline } = require('stream');
const argv = require('minimist')(process.argv.slice(2));

if(argv['h']){
    console.log(
        `----------------------------------------------------
-i=<file>:                  inputFile: file path
                            to be compressed.
-o=<file>:                  specified output file.
-h:                         Prints help
----------------------------------------------------` )
    process.exit(0)
}

input = argv['i']

if( input == null ) {
    console.error({ message: 'File was not specified !'})
    process.exit(1)
}

const output = argv['o']
const outputStream = output != null ? fs.createWriteStream(output) : process.stdout

const url = "http://localhost:8000"
const request = http.request(url, {method: "POST"})

request
.on("response", (res) => {
    if(res.statusCode !== 200){
        console.error({message: 'Error occured on server side', response: res.statusMessage})
        process.exit(1)
    }
    res.pipe(outputStream)
    .on('error', console.error)
})

request.setHeader('file-name', path.basename(input))

pipeline(
    fs.createReadStream( input, {encoding:'utf-8'} ),
    request,
    err => {
        if(err){
            console.error({ message: 'Error occured when sending to server!', error: err})
            process.exit(1)
        }
        else{
            console.log('File successfully sent to server!')
        }
    }
)