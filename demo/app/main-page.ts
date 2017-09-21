import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import * as tf from 'tns-core-modules/ui/text-field';
import * as la from 'tns-core-modules/ui/label';
import {HelloWorldModel} from './main-view-model';
import {AliyunOss} from 'nativescript-aliyun-oss';
import * as imagepicker from "nativescript-imagepicker";
import observableModule = require("tns-core-modules/data/observable");
import imagesource = require("tns-core-modules/image-source");
import {isIOS, isAndroid} from 'tns-core-modules/platform';

// Event handler for Page 'loaded' event attached in main-page.xml
let model;
let la1;
let img1;
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    let page = <pages.Page>args.object;
    page.bindingContext = new HelloWorldModel();
    la1 = page.getViewById('la1');
    img1 = page.getViewById('img1');
    model = page.bindingContext;
}

let source = new observableModule.Observable();
export function TFLoad(args) {
    console.log('TFLoad');
    let tf = <tf.TextField>args.object;
    const textFieldBindingOptions = {
        sourceProperty: "textSource",
        targetProperty: "text",
        twoWay: true
    };
    tf.bind(textFieldBindingOptions, source);
}

export function LaLoad(args) {
    console.log('LaLoad');
    let tf = <la.Label>args.object;
    const textFieldBindingOptions = {
        sourceProperty: "textSource",
        targetProperty: "text",
        twoWay: true
    };
    tf.bind(textFieldBindingOptions, '');
}

export function test() {
    // const policy = new android.os.StrictMode.ThreadPolicy.Builder().permitAll().build();
    // android.os.StrictMode.setThreadPolicy(policy);
    // const a = new AliyunOss();
    // console.log('AliyunOss: ' + JSON.stringify(a));
    /* AliyunOss.upload('1', '2', '3', '4', (ret) => {

    }); */
    const url = "https://help.aliyun.com/document_detail/31927.html?spm=5176.doc31926.6.633.WIvWTH";
    AliyunOss.getUploadToken(url, (ret) => {
        console.log('AliyunOss.getUploadToken: ' + ret);
    });
}

export function chooseImage() {
    let context = imagepicker.create({
        mode: "single" // use "multiple" for multiple selection
    });
    context
    .authorize()
    .then(function() {
        return context.present();
    })
    .then(function(selection) {
        selection.forEach(function(selected) {
            // process the selected image
        });
        // list.items = selection;
        console.log('Uri: ' + selection[0].uri);
        AliyunOss.getUploadToken(model.url, (ret) => {
            console.log('AliyunOss.getUploadToken: ' + ret);
            const json = JSON.parse(ret);
            const imageName = selection[0].fileUri.replace(/^.*[\\\/]/, '');
            const paramJSON = {
                "key": json["dir"] + imageName,
                "policy": json["policy"],
                "OSSAccessKeyId": json["accessid"],
                "success_action_status": "200",
                "callback": json["callback"],
                "signature": json["signature"]
            };
            console.log('paramJSON: ' + JSON.stringify(paramJSON));
            if (isIOS) {
                selection[0].getImage().then((value: imagesource.ImageSource) => {
                    console.log('ImageSource: ' + value.ios);
                    la1.text = '0.0';
                    const ret2 = AliyunOss.uploadImg(value.ios, imageName, 'file', json['host'], JSON.stringify(paramJSON),
                        (pro) => {
                            // model.progress = (pro * 100).toFixed(2);
                            // setTimeout(() => {
                            //     model.progress = (pro * 100).toFixed(2);
                            //     model.set('progress', (pro * 100).toFixed(2));
                            //     model.notifyPropertyChange("progress", (pro * 100).toFixed(2));
                            // }, 100);
                            // la1.text = (pro * 100).toFixed(2).toString();
                                model.progress = (pro * 100).toFixed(2);
                                model.notifyPropertyChange("progress", (pro * 100).toFixed(2));
                            // model.set('progress', (pro * 100).toFixed(2));
                            console.log('AliyunOss.progress: ' + (pro * 100).toFixed(2));
                        },
                        (ret) => {
                            console.log('AliyunOss.upload: ' + ret);
                            // model.imgSrc = json['host'] + '/' + json["dir"] + imageName;
                            img1.src = json['host'] + '/' + json["dir"] + imageName;
                        });
                    console.log('upload: ' + ret2);
                });
            } else {
                la1.text = '0.0';
                const ret2 = AliyunOss.upload(selection[0].fileUri, 'file', json['host'], JSON.stringify(paramJSON),
                (pro) => {
                    // model.progress = pro * 100;
                    la1.text = (pro * 100).toFixed(2);
                    console.log('AliyunOss.progress: ' + pro * 100);
                },
                (ret) => {
                    console.log('AliyunOss.upload: ' + ret);
                    img1.src = json['host'] + '/' + json["dir"] + imageName;
                });
                console.log('upload: ' + ret2);
            }
        });

    }).catch(function (e) {
        // process error
    });
}
