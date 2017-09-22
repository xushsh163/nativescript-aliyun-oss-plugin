# nativescript-aliyun-oss

Add your plugin badges here. See [nativescript-aliyun-oss](https://github.com/xushsh163/nativescript-aliyun-oss) for example.

Then describe what's the purpose of your plugin. 

In case you develop UI plugin, this is where you can add some screenshots.

## (Optional) Prerequisites / Requirements

Describe the prerequisites that the user need to have installed before using your plugin. See [nativescript-firebase plugin](https://github.com/eddyverbruggen/nativescript-plugin-firebase) for example.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```javascript
tns plugin add nativescript-aliyun-oss
```

## Usage 

First import:
	
```javascript
    import { AliyunOss } from 'nativescript-aliyun-oss';
```)

(Optional) get uploadToken if needed, just a simple http get method

```javascript
    AliyunOss.getUploadToken('http://127.0.0.1?userId=xxxx&password=xxx', (ret) => {
  	dosomething here
    });
```)

upload

```javascript
AliyunOss.upload(fileUri, 'file', uploadUrl, JSON.stringify(param),
	(pro) => {
	    console.log('AliyunOss.progress: ' + pro * 100);
	},
	(ret) => {
	    console.log('AliyunOss.upload: ' + ret);
	});
```)

or in IOS you can directly send UIImage

```javascript
   const ret2 = AliyunOss.uploadImg(ImageSource.ios, imageName, 'file', uploadUrl, JSON.stringify(param),
	(pro) => {
	    console.log('AliyunOss.progress: ' + (pro * 100).toFixed(2));
	},
	(ret) => {
	    console.log('AliyunOss.upload: ' + ret);
	});
    console.log('upload: ' + ret2);
```)

## API

    
| func | Platfomr | Description |
| --- | --- | --- |
| getUploadToken | ios/android | just a async http get |
| upload | ios/android | upload by filePath |
| uploadImg | ios | because filePath doesn't work well in ios, you can use this directly uploading UIImage |
    
## License

Apache License Version 2.0, January 2004
