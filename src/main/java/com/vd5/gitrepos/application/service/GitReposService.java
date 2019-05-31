package com.vd5.gitrepos.application.service;

import com.vd5.gitrepos.application.domain.GitRepos;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link GitRepos}.
 */
public interface GitReposService {

    /**
     * Save a gitRepos.
     *
     * @param gitRepos the entity to save.
     * @return the persisted entity.
     */
    GitRepos save(GitRepos gitRepos);

    /**
     * Get all the gitRepos.
     *
     * @return the list of entities.
     */
    List<GitRepos> findAll();


    /**
     * Get the "id" gitRepos.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GitRepos> findOne(Long id);

    /**
     * Delete the "id" gitRepos.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
