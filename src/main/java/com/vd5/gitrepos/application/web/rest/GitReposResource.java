package com.vd5.gitrepos.application.web.rest;

import com.vd5.gitrepos.application.domain.GitRepos;
import com.vd5.gitrepos.application.service.GitReposService;
import com.vd5.gitrepos.application.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.vd5.gitrepos.application.domain.GitRepos}.
 */
@RestController
@RequestMapping("/api")
public class GitReposResource {

    private final Logger log = LoggerFactory.getLogger(GitReposResource.class);

    private static final String ENTITY_NAME = "gitRepos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GitReposService gitReposService;

    public GitReposResource(GitReposService gitReposService) {
        this.gitReposService = gitReposService;
    }

    /**
     * {@code POST  /git-repos} : Create a new gitRepos.
     *
     * @param gitRepos the gitRepos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gitRepos, or with status {@code 400 (Bad Request)} if the gitRepos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/git-repos")
    public ResponseEntity<GitRepos> createGitRepos(@RequestBody GitRepos gitRepos) throws URISyntaxException {
        log.debug("REST request to save GitRepos : {}", gitRepos);
        if (gitRepos.getId() != null) {
            throw new BadRequestAlertException("A new gitRepos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GitRepos result = gitReposService.save(gitRepos);
        return ResponseEntity.created(new URI("/api/git-repos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /git-repos} : Updates an existing gitRepos.
     *
     * @param gitRepos the gitRepos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gitRepos,
     * or with status {@code 400 (Bad Request)} if the gitRepos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gitRepos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/git-repos")
    public ResponseEntity<GitRepos> updateGitRepos(@RequestBody GitRepos gitRepos) throws URISyntaxException {
        log.debug("REST request to update GitRepos : {}", gitRepos);
        if (gitRepos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GitRepos result = gitReposService.save(gitRepos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gitRepos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /git-repos} : get all the gitRepos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gitRepos in body.
     */
    @GetMapping("/git-repos")
    public List<GitRepos> getAllGitRepos() {
        log.debug("REST request to get all GitRepos");
        return gitReposService.findAll();
    }

    /**
     * {@code GET  /git-repos/:id} : get the "id" gitRepos.
     *
     * @param id the id of the gitRepos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gitRepos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/git-repos/{id}")
    public ResponseEntity<GitRepos> getGitRepos(@PathVariable Long id) {
        log.debug("REST request to get GitRepos : {}", id);
        Optional<GitRepos> gitRepos = gitReposService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gitRepos);
    }

    /**
     * {@code DELETE  /git-repos/:id} : delete the "id" gitRepos.
     *
     * @param id the id of the gitRepos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/git-repos/{id}")
    public ResponseEntity<Void> deleteGitRepos(@PathVariable Long id) {
        log.debug("REST request to delete GitRepos : {}", id);
        gitReposService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
