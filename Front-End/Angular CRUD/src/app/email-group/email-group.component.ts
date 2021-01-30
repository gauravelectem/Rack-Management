import {
    Component,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {
    EmailGroupService
} from '@app/service/email-group.service';

@Component({
    selector: 'app-email-group',
    templateUrl: './email-group.component.html',
    styleUrls: ['./email-group.component.less']
})
export class EmailGroupComponent implements OnInit {

    emailGroupList: any;

    constructor(private emailGroupService: EmailGroupService,
                private route: ActivatedRoute,
                private router: Router, ) {}

    ngOnInit(): void {
        this.fetchAllEmailGroups();
    }

    redirectToEditPage() {
        this.router.navigate(['/editEmailGroup'], {
            relativeTo: this.route
        });
    }

    fetchAllEmailGroups() {
        this.emailGroupService.fetchAllEmailGroups()
            .subscribe((data) => {
                this.emailGroupList = data;
            });
    }
    deleteEmailGroup(emailGroupId: any) {
        this.emailGroupService.deleteEmailGroup(emailGroupId)
            .subscribe((data) => {
                this.emailGroupList = data;
            });
    }
    redirectToEmailGroupWithId(emailGroupId: any) {
        this.emailGroupService.setEmailGroupId(emailGroupId);
        this.router.navigate(['/editEmailGroup'], {
            relativeTo: this.route
        });
    }
}
