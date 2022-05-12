import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit {
  formdata: any;
  fullname: string = "";
  data: any;
  email: string = "";
  city: string = "";
  panNumber: string = "";
  mobile: string = "";
  otp: any;
  isresend: boolean = false;
  otpcount: number = 0;
  disablereset: boolean = true;
  secret: any;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.formdata = new FormGroup({

      fullname: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(140)])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")])),
      city: new FormControl("", Validators.required),
      panNumber: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")])),
      mobile: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])),

      otp: new FormControl("", Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])),
    });


  }


  submitdata(data: any) {
    console.log(data);
    let mydata = { mobile: data.mobile, otp: data.otp };
    this.http.post(' http://apps.thinkoverit.com/api/verifyOTP.php', mydata).subscribe((data: any) => {
      console.log(data.status);
      this.secret == data.status;
      if (this.secret == "Success") {
        alert("Thanks for verification " + data.name);
      }

    });


  }

  mobilecheck(event: Event) {
    let ctrl = (<HTMLInputElement>event.target).value;
    console.log(ctrl);
    let pattern = "^((\\+91-?)|0)?[0-9]{10}$";
    let check = ctrl.match(pattern);

    let data = {
      panNumber: this.panNumber,
      city: this.city,
      fullname: this.fullname,
      email: this.email,
      mobile: this.mobile
    }


    if (check?.index == 0) {
      this.http.post("http://apps.thinkoverit.com/api/getOTP.php", data).subscribe((data: any) => {
        console.log(data);

      })
    }

  }

  resendotp() {
    // this.isresend = true;
    // setTimeout(()=>{
    //   this.isresend = false;
    // },30000);

    this.otpcount += 1;
    console.log(this.otpcount);


    if (this.otpcount == 3) {
      alert("Please try again after an hour");
      this.disablereset = false;
      setTimeout(() => {
        this.disablereset = true;

      }, 10000);
    }

  }




}


