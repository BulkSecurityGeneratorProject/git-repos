package com.vd5.gitrepos.application.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GitRepos.
 */
@Entity
@Table(name = "git_repos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GitRepos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "git_name")
    private String gitName;

    @Column(name = "git_url")
    private String gitUrl;

    @Column(name = "git_user")
    private String gitUser;

    @Column(name = "git_pass")
    private String gitPass;

    @Column(name = "git_key")
    private String gitKey;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGitName() {
        return gitName;
    }

    public GitRepos gitName(String gitName) {
        this.gitName = gitName;
        return this;
    }

    public void setGitName(String gitName) {
        this.gitName = gitName;
    }

    public String getGitUrl() {
        return gitUrl;
    }

    public GitRepos gitUrl(String gitUrl) {
        this.gitUrl = gitUrl;
        return this;
    }

    public void setGitUrl(String gitUrl) {
        this.gitUrl = gitUrl;
    }

    public String getGitUser() {
        return gitUser;
    }

    public GitRepos gitUser(String gitUser) {
        this.gitUser = gitUser;
        return this;
    }

    public void setGitUser(String gitUser) {
        this.gitUser = gitUser;
    }

    public String getGitPass() {
        return gitPass;
    }

    public GitRepos gitPass(String gitPass) {
        this.gitPass = gitPass;
        return this;
    }

    public void setGitPass(String gitPass) {
        this.gitPass = gitPass;
    }

    public String getGitKey() {
        return gitKey;
    }

    public GitRepos gitKey(String gitKey) {
        this.gitKey = gitKey;
        return this;
    }

    public void setGitKey(String gitKey) {
        this.gitKey = gitKey;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GitRepos)) {
            return false;
        }
        return id != null && id.equals(((GitRepos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "GitRepos{" +
            "id=" + getId() +
            ", gitName='" + getGitName() + "'" +
            ", gitUrl='" + getGitUrl() + "'" +
            ", gitUser='" + getGitUser() + "'" +
            ", gitPass='" + getGitPass() + "'" +
            ", gitKey='" + getGitKey() + "'" +
            "}";
    }
}
