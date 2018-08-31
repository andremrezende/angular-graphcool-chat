import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ApolloConfigModule } from './../apollo-config.module';

@NgModule({
 exports: [
  BrowserAnimationsModule, 
  ApolloConfigModule,
  HttpClientModule,
 ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error("CoreModule is already. Import it in the AppModule only.");
    }
  }
}
