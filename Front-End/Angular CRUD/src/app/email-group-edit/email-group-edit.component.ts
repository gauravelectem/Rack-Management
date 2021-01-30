import {
    Component,
    OnInit
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {
    EmailGroupService
} from '@app/service/email-group.service';

@Component({
    selector: 'app-email-group-edit',
    templateUrl: './email-group-edit.component.html',
    styleUrls: ['./email-group-edit.component.less']
})
export class EmailGroupEditComponent implements OnInit {

    emailGroupId: any;
    emailGroupForm!: FormGroup;
    emailGroupList: any;

    constructor(private formBuilder: FormBuilder,
                private emailGroupService: EmailGroupService,
                private route: ActivatedRoute,
                private router: Router) {}

    ngOnInit(): void {
        this.emailGroupId = this.emailGroupService.getEmailGroupId();
        if (this.emailGroupId !== undefined && this.emailGroupId !== null) {
            this.fetchEmailGroupId(this.emailGroupId);
        } else {
            this.emailGroupForm = this.formBuilder.group({
                emailGroupName: ['', Validators.required],
            });
        }
    }

    onSubmit() {
        if (this.emailGroupId == null && this.emailGroupId == undefined) {
            this.createEmailGroup();
        } else {
            this.emailGroupService.updateEmailGroup(this.emailGroupId, this.emailGroupForm.value)
                .subscribe((data) => {
                    this.emailGroupList = data;
                    this.emailGroupService.fetchAllEmailGroups();
                });
        }
        this.reDirectToEmailGroup();
    }

    createEmailGroup() {
        this.emailGroupService.createEmailGroup(this.emailGroupForm.value)
            .subscribe((data) => {
                this.emailGroupList = data;
                this.emailGroupService.fetchAllEmailGroups();
                alert('EmailGroup Created Successfully');
            });
    }

    reDirectToEmailGroup() {
        this.router.navigate(['/emailGroup'], {
            relativeTo: this.route
        });
    }

    fetchEmailGroupId(emailGroupId: any) {
        this.emailGroupService.fetchEmailGroupId(emailGroupId)
            .subscribe((data) => {
                this.emailGroupList = data;
                this.loadEmailGroupData(this.emailGroupList);
            });
    }

    loadEmailGroupData(emailGroupList: any) {
        this.emailGroupForm = this.formBuilder.group({
            emailGroupName: [emailGroupList.emailGroupName, Validators.required],
        });
    }

}
