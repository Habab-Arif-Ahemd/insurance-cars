import { Component, ElementRef, EventEmitter ,OnInit,Output, ViewChild} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AppService } from './../../../../services/app/app.service';
import { ProfileService } from './../../../../services/profile/profile.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import DropDownValues from 'src/app/helpers/utils/DropDownValues';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
})

export class AddTicketComponent implements OnInit {
  @Output() showTicketsAnaltics = new EventEmitter();
  @ViewChild("ticketCreationForm", { static: false })
  ticketCreationForm: ElementRef;
  ticketCreationFormGroup: FormGroup;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  TicketProiority = DropDownValues.TicketProiority;
  ticketsType: any;
  lang: string;
  clients: any;
  isUploading: boolean;
  allowedFileType: string[] = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "application/vnd.ms-excel",
    "application/pdf",
  ];
  supportedFile: boolean = true;
  submitted: boolean;
  successAlert: boolean;
  errorAlert: boolean;

  constructor(
    private profileService: ProfileService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.getAppLang();
    this.getTicketsTypes();
    this.getClients();
    this.initForm();
    this.initUploader();
  }

  initUploader() {
    this.uploader = new FileUploader({ url: "", autoUpload: false });
    console.log(this.uploader);
  }

  onFileSelected(event) {
    const uploadItems: any[] = this.uploader.queue; // Uploader's uploaded items
    console.log(uploadItems);
    uploadItems.forEach((file) => {
      if (this.allowedFileType.indexOf(file.file.type) > -1) {
        console.log(file.file.type);
      } else {
        setTimeout(() => {
          console.log(file);
          this.supportedFile = true;
        }, 2000);
        this.supportedFile = false;
        file.remove();
      }
    });
  }

  initForm() {
    this.ticketCreationFormGroup = new FormGroup({
      ticketTypeId: new FormControl(null, Validators.required),
      clientId: new FormControl(null),
      body: new FormControl(null, Validators.required),
    });
  }

  get f() {
    return this.ticketCreationFormGroup.controls;
  }

  createTicket(): void {
    this.submitted = true;
    for (const i in this.ticketCreationFormGroup.controls) {
      this.ticketCreationFormGroup.controls[i].markAsDirty();
      this.ticketCreationFormGroup.controls[i].updateValueAndValidity();
    }

    if (this.ticketCreationFormGroup.invalid) {
      return;
    }
    console.log(this.ticketCreationFormGroup.value);
    const uploadItems: any[] = this.uploader.getNotUploadedItems(); // Uploader's uploaded items
    const formData = new FormData(this.ticketCreationForm.nativeElement); // Holds the files and data
    uploadItems.forEach((item) => {
      formData.append("files", item._file);
    });

    formData.append(
      "ticketTypeId",
      this.ticketCreationFormGroup.get("ticketTypeId").value
    );
    formData.append(
      "clientId",
      this.ticketCreationFormGroup.get("clientId").value
    );
    formData.append("body", this.ticketCreationFormGroup.get("body").value);

    this.isUploading = true;
    // Send the request to create the ticket
    this.profileService.createTicket(formData).subscribe(
      (res: any) => {
        if (res.isSuccess) {
          this.successAlert = true;
          setTimeout(() => {
            this.successAlert = false;
          }, 2000);
          this.isUploading = false;
        }
      },
      (err) => {
        this.isUploading = false;
        this.errorAlert = true;
        setTimeout(() => {
          this.errorAlert = false;
        }, 2000);
        console.log(err);
      }
    );
  }

  getTicketsTypes() {
    this.profileService.getTicketsTypes().subscribe((types) => {
      this.ticketsType = types;
    });
  }

  getAppLang() {
    this.appService.getAppLang().subscribe((lang) => (this.lang = lang));
  }

  getClients() {
    this.profileService.getIdentities().subscribe((clients: any) => {
      this.clients = clients.data;
      console.log(this.clients);
    });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  resetForm(): void {
    this.ticketCreationFormGroup.reset();
  }
}
