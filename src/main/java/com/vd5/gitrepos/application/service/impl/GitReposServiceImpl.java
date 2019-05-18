package com.vd5.gitrepos.application.service.impl;

import com.vd5.gitrepos.application.service.GitReposService;
import com.vd5.gitrepos.application.domain.GitRepos;
import com.vd5.gitrepos.application.repository.GitReposRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link GitRepos}.
 */
@Service
@Transactional
public class GitReposServiceImpl implements GitReposService {

    private final Logger log = LoggerFactory.getLogger(GitReposServiceImpl.class);

    private final GitReposRepository gitReposRepository;

    public GitReposServiceImpl(GitReposRepository gitReposRepository) {
        this.gitReposRepository = gitReposRepository;
    }

    /**
     * Save a gitRepos.
     *
     * @param gitRepos the entity to save.
     * @return the persisted entity.
     */
    @Override
    public GitRepos save(GitRepos gitRepos) {
        log.debug("Request to save GitRepos : {}", gitRepos);
        return gitReposRepository.save(gitRepos);
    }

    /**
     * Get all the gitRepos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<GitRepos> findAll() {
        log.debug("Request to get all GitRepos");
        return gitReposRepository.findAll();
    }


    /**
     * Get one gitRepos by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GitRepos> findOne(Long id) {
        log.debug("Request to get GitRepos : {}", id);
        return gitReposRepository.findById(id);
    }

    /**
     * Delete the gitRepos by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GitRepos : {}", id);
        gitReposRepository.deleteById(id);
    }
}
