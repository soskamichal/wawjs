const bom = require("../../src/bom");

const assert = require("assert");
const fs = require("fs");

describe("bom_rem.js tests", function () {


    const bomBuffer = Buffer.from([0xEF, 0xBB, 0xBF])

    it("shall not buffer all until _flush", (done) => {
        let called = 0;
        let file = `${__dirname}/data/with-bom.txt`;
        fs.createReadStream(file, { highWaterMark: 1 })
            .pipe(bom.remove())
            .on("error", done)
            .on("data", (chunk) => {
                called++;
            })
            .on("finish", () => {
                assert(called === "// with".length)
                done();
            });
    });

    it("remove bom from file", function (done) {
        const chunks = []
        let file = `${__dirname}/data/with-bom.txt`;
        fs.createReadStream(file)
            .pipe(bom.remove())
            .on("error", done)
            .on("data", (chunk) => chunks.push(chunk))
            .on("finish", () => {
                let chunk = Buffer.concat(chunks)
                assert(Buffer.isBuffer(chunk))
                assert(chunk.equals(Buffer.from([0x2f, 0x2f, 0x20, 0x77, 0x69, 0x74, 0x68])))
                done()
            })
    });

    it("remove bom with chunks of size 1", (done) => {
        const chunks = [];
        let file = `${__dirname}/data/with-bom.txt`
        fs.createReadStream(file, { highWaterMark: 1 })
            .pipe(bom.remove())
            .on("error", done)
            .on("data", (chunk) => chunks.push(chunk))
            .on("finish", () => {
                let chunk = Buffer.concat(chunks)
                assert(Buffer.isBuffer(chunk))
                assert(chunk.equals(Buffer.from([0x2f, 0x2f, 0x20, 0x77, 0x69, 0x74, 0x68])))
                done();
            });
    });

    it("do nothing if file does not have bom", (done) => {
        const chunks = [];
        let file = `${__dirname}/data/without-bom.txt`;
        fs.createReadStream(file)
            .pipe(bom.remove())
            .on("error", done)
            .on("data", (chunk) => chunks.push(chunk))
            .on("finish", () => {
                let chunk = Buffer.concat(chunks)
                assert(Buffer.isBuffer(chunk))
                assert(chunk.equals(Buffer.from([0x2f, 0x2f, 0x20, 0x77, 0x69, 0x74, 0x68, 0x6f, 0x75, 0x74])));
                done();
            });
    });

    it("do not remove when file is empty", function (done) {
        const chunks = [];
        let file = `${__dirname}/data/without-bom-empty.txt`;
        fs.createReadStream(file)
            .pipe(bom.remove())
            .on("error", done)
            .on("data", (chunk) => chunks.push(chunk))
            .on("finish", () => {
                let chunk = Buffer.concat(chunks)
                assert(Buffer.isBuffer(chunk))
                assert(chunk.equals(Buffer.from([])));
                done();
            });
    });








});