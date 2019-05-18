export interface IGitRepos {
  id?: number;
  gitName?: string;
  gitUrl?: string;
  gitUser?: string;
  gitPass?: string;
  gitKey?: string;
}

export class GitRepos implements IGitRepos {
  constructor(
    public id?: number,
    public gitName?: string,
    public gitUrl?: string,
    public gitUser?: string,
    public gitPass?: string,
    public gitKey?: string
  ) {}
}
