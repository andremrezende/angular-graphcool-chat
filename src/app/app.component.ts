import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  private APIURL = 'https://api.graph.cool/simple/v1/cjjzmh11l3tp30148o00nco75';

  constructor(private http: HttpClient) {
    this.allUsers();
  }

  allUsers(): void {
    const body = {
      query: `query {
        allUsers {
          id
          email
          name
        }
      }`
    };

    this.http.post(this.APIURL, body).subscribe(res => console.log('Query: ', res))
  }
}
