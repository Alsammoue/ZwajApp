import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((err, caught: Observable<HttpEvent<any>>) => {
                if (err instanceof HttpErrorResponse) {
                    this.toastr.error(!err.error.message ? 'Internal Server Error' : err.error.message);
                    return of(err as any);
                }
                throw err;
            })
        );
    }
}