import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGitRepos } from 'app/shared/model/git-repos.model';

type EntityResponseType = HttpResponse<IGitRepos>;
type EntityArrayResponseType = HttpResponse<IGitRepos[]>;

@Injectable({ providedIn: 'root' })
export class GitReposService {
  public resourceUrl = SERVER_API_URL + 'api/git-repos';

  constructor(protected http: HttpClient) {}

  create(gitRepos: IGitRepos): Observable<EntityResponseType> {
    return this.http.post<IGitRepos>(this.resourceUrl, gitRepos, { observe: 'response' });
  }

  update(gitRepos: IGitRepos): Observable<EntityResponseType> {
    return this.http.put<IGitRepos>(this.resourceUrl, gitRepos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGitRepos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGitRepos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
