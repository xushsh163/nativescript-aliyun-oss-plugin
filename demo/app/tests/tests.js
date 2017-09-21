var AliyunOss = require("nativescript-aliyun-oss").AliyunOss;
var aliyunOss = new AliyunOss();

describe("greet function", function() {
    it("exists", function() {
        expect(aliyunOss.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(aliyunOss.greet()).toEqual("Hello, NS");
    });
});