import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { RegistrationResponse } from 'src/app/payload/responses/auth/RegistrationResponse';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

    /* Verification */
    verificationCode: number;
    isSubmitting: boolean;
    isLoading: boolean;
    isResending: boolean;
    /* Alert */
    errorMessage;
    successMessage;
    isErrorAlertVisible;
    isSuccessAlertVisible;
    validationErrors: string[];

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
    }

    sendVerificationCode(): void {
        // Set submission state to true (used for form validation)
        this.isSubmitting = true;

        if (this.verificationCode) {
            // Show the loader on button
            this.isLoading = true;
            console.log(this.verificationCode);
            // Send the request
            this.authService.sendVerificationCode(this.verificationCode).subscribe(
                (res: any) => {
                    // Stop the loader
                    this.isLoading = false;
                    if (res.isSuccess) {
                        
                        // Check the if login was opened from the inquire
                        /* if (this.authService.getIsAuthModalShown().value) {
                           this.authService.setIsAuthModalShown(false);
                           this.loginFormGroup.reset();
                        } else {
                           this.router.navigate([AppRoutes.landing]);
                        } */
                        this.authService.setIsAuthModalShown(false);

                    } else {
                        this.displayAlert('ErrorAlert', res);
                    }
                },
                (err) => {
                    // Close modal on server error
                    if (err.status == 0 || err.status == 500) 
                    // Stop the loader
                    this.isLoading = false;
                    this.displayAlert('ErrorAlert', err.error);
                }
            );
        }
    }


    resendVerficationCode(): void {
        // Display loader
        this.isResending = true;
        this.isLoading = true;

        // Get phone number and user ID from local storage
        let userPhoneNumber = localStorage.getItem(LocallyStoredItemsKeys.VerificationPhoneNumber);
        let userId = localStorage.getItem(LocallyStoredItemsKeys.VerificationUserId);

        // Construct resend request data
        let userVerficationData: RegistrationResponse = {
            phoneNumber: userPhoneNumber,
            userId: userId,
        };

        // Resend the request
        this.authService.resendVerficationCode(userVerficationData).subscribe(
            (res: any) => {
                // Stop the loader
                this.isLoading = false;
                this.isResending = false;
                // Display alert
                if (res.isSuccess) this.displayAlert('SuccessAlert', res);
                else this.displayAlert('ErrorAlert', res);
            },
            (err) => {
                // Close modal on server error
                if (err.status == 0 || err.status == 500)
                // Stop the loader
                this.isLoading = false;
                this.isResending = false;
                // Display alert
                this.displayAlert('ErrorAlert', err.error);
            }
        );

    }

    /**
     * Displays an alert with the retreived message(s) from an API response
     *
     * @private
     * @param {('ErrorAlert' | 'SuccessAlert')} alertType Specifies the alert type of Success or Error
     * @param {string} message The message to be displayed on the alert
     * @memberof AuthenticationPageComponent
     */
    private displayAlert(alertType: 'ErrorAlert' | 'SuccessAlert', apiResponse: ApiResponse): void {
        switch (alertType) {
            case 'ErrorAlert':

                // Set error message
                this.errorMessage = apiResponse.responseMessage;

                // Set validation errors
                if (apiResponse.validationErrors && apiResponse.validationErrors.length > 0) {

                    // Init empty array
                    let errorsArr: string[] = [];

                    // Push the errors into the array
                    apiResponse.validationErrors.forEach(err => errorsArr.push(err.description));

                    // Set the validation errors
                    this.validationErrors = errorsArr;

                } else {
                    this.validationErrors = null;
                }

                // Display alert
                this.isErrorAlertVisible = true;

                // Hide after timeout
                setTimeout(() => this.isErrorAlertVisible = false, 10000);

                break;
            case 'SuccessAlert':

                // Set the success message
                this.successMessage = apiResponse.responseMessage;

                // Display alert
                this.isSuccessAlertVisible = true;

                // Hide after timeout
                setTimeout(() => this.isSuccessAlertVisible = false, 10000);

                break;
            default: break;
        }
    }

}
