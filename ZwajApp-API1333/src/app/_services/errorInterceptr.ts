import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {




    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(req).pipe(catchError((error, caught: Observable<HttpEvent<any>>) => {
            if (error instanceof HttpErrorResponse) {
                const applicationError = error.headers.get('Application-Error');
                if (applicationError)
                 { throw applicationError ; }

            }

            ///ModelState Errors
            const serverError = error.error;
            let modelStateErrors = '';
            if (serverError && typeof serverError === 'object') {
                for (const key in serverError) {
                    if (serverError[key]) {
                        modelStateErrors += serverError[key] + '\n';
                    }
                }
            }
            //Unauthorized errors
          if (error.status == 401) {
             //  return throwError('Unauthorized errors');
              return throwError( error.statusText.toString());
          }

          if (error.status === 400) {
            return throwError('One or more validation errors occurred.');
           // return throwError( error.statusText.toString());
          }

            throw (modelStateErrors.toString() || serverError || 'Server Error')
            ////////////////////////////
        })
        )
    }

}


export const ErrorInterceptorProvidor = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
