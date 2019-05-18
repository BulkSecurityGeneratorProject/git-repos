import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'git-repos',
        loadChildren: './git-repos/git-repos.module#GitReposGitReposModule'
      },
      {
        path: 'ticket',
        loadChildren: './ticket/ticket.module#GitReposTicketModule'
      },
      {
        path: 'region',
        loadChildren: './region/region.module#GitReposRegionModule'
      },
      {
        path: 'country',
        loadChildren: './country/country.module#GitReposCountryModule'
      },
      {
        path: 'location',
        loadChildren: './location/location.module#GitReposLocationModule'
      },
      {
        path: 'department',
        loadChildren: './department/department.module#GitReposDepartmentModule'
      },
      {
        path: 'task',
        loadChildren: './task/task.module#GitReposTaskModule'
      },
      {
        path: 'employee',
        loadChildren: './employee/employee.module#GitReposEmployeeModule'
      },
      {
        path: 'job',
        loadChildren: './job/job.module#GitReposJobModule'
      },
      {
        path: 'job-history',
        loadChildren: './job-history/job-history.module#GitReposJobHistoryModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GitReposEntityModule {}
