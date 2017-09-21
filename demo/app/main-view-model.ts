import { Observable } from 'tns-core-modules/data/observable';
import { AliyunOss } from 'nativescript-aliyun-oss';

export class HelloWorldModel extends Observable {
  public message: string;
  private aliyunOss: AliyunOss;
  public url: string = "";
  private progress: number = 0.0;
  public imgSrc: string = '';
  constructor() {
    super();

    // this.aliyunOss = new AliyunOss();
    // this.message = this.aliyunOss.message;
  }
  changeProgress(newValue) {
    this.progress = newValue;
    this.notifyPropertyChange("progress", newValue);
  }
}
