import { IGitRepos } from 'app/shared/model/git-repos.model';

export interface ITicket {
  id?: number;
  ticketNumber?: number;
  ticketUrl?: string;
  ticketEstimation?: number;
  repos?: IGitRepos;
}

export class Ticket implements ITicket {
  constructor(
    public id?: number,
    public ticketNumber?: number,
    public ticketUrl?: string,
    public ticketEstimation?: number,
    public repos?: IGitRepos
  ) {}
}
