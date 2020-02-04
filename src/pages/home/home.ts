import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Subscription } from 'rxjs/Subscription';
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hasActivate$: Subscription;
  hasDeactivate$: Subscription;
  private urlapi = 'https://app.api.integ.readycaresforyou.com/info';

  constructor(public navCtrl: NavController, private backgroundMode: BackgroundMode) {

  }

  ngOnInit() {
    console.log('ngOnInit HomePage');
    this.backgroundMode.enable();
    this.hasActivate$ = this.backgroundMode.on('activate').subscribe(
      () => {
        console.log('Info at [HomePage.ts]: App went to background mode!!');
        this.backgroundMode.disableWebViewOptimizations();
        setInterval(this.backgroundFunct, 10000);        
      },
      err => console.log(err)
    );
    
    this.hasDeactivate$ = this.backgroundMode.on('deactivate').subscribe(
      () => {
        console.log('Info at [HomePage.ts]: App went to foreground mode!!');
        setInterval(this.foregroundFunct, 10000);
      },
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    this.hasActivate$.unsubscribe();
    this.hasDeactivate$.unsubscribe();
  }

  backgroundFunct(){
    console.log('... backgroundFunct');
    const url = 'https://app.api.integ.readycaresforyou.com/info';

    cordova.plugin.http.get(url, {}, {}, function(response) {
      console.log(response.status);
      console.log(response.data); // data received by server
      console.log(response.headers);
    }, function(response) {
      console.error(response.status);
      console.error(response.error);
      console.error(response.headers);
    });
  }

  foregroundFunct(){
    console.log('... foregroundFunct');
  }

}
