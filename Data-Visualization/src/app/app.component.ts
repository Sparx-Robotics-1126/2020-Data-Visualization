import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Data-Visualization';
  socket = new WebSocket("ws://localhost:8081");
  data = {name: "Test", timestamp: 1, x: 1};

  ngOnInit(){
    var self = this;
    this.socket.onmessage = function(result){
      var json = JSON.parse(result.data);
      if(json.name){
        self.data = json;
      }
    }
  }

}
