
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PopupService {
    private subject = new Subject<any>();
    openPopup() {
        console.log("open seric" );
        this.subject.next({ openPopup: true });
    }
    closePopup() {
        this.subject.next({ openPopup: false });
    }
    getPopup(): Observable<any> {
        return this.subject.asObservable();
    }

}
