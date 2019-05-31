package com.vd5.gitrepos.application.repository;

import com.vd5.gitrepos.application.domain.GitRepos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GitRepos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GitReposRepository extends JpaRepository<GitRepos, Long> {

}
