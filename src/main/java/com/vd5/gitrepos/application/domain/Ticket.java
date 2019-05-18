package com.vd5.gitrepos.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Ticket.
 */
@Entity
@Table(name = "ticket")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ticket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ticket_number")
    private Long ticketNumber;

    @Column(name = "ticket_url")
    private String ticketUrl;

    @Column(name = "ticket_estimation")
    private Double ticketEstimation;

    @ManyToOne
    @JsonIgnoreProperties("tickets")
    private GitRepos repos;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTicketNumber() {
        return ticketNumber;
    }

    public Ticket ticketNumber(Long ticketNumber) {
        this.ticketNumber = ticketNumber;
        return this;
    }

    public void setTicketNumber(Long ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public String getTicketUrl() {
        return ticketUrl;
    }

    public Ticket ticketUrl(String ticketUrl) {
        this.ticketUrl = ticketUrl;
        return this;
    }

    public void setTicketUrl(String ticketUrl) {
        this.ticketUrl = ticketUrl;
    }

    public Double getTicketEstimation() {
        return ticketEstimation;
    }

    public Ticket ticketEstimation(Double ticketEstimation) {
        this.ticketEstimation = ticketEstimation;
        return this;
    }

    public void setTicketEstimation(Double ticketEstimation) {
        this.ticketEstimation = ticketEstimation;
    }

    public GitRepos getRepos() {
        return repos;
    }

    public Ticket repos(GitRepos gitRepos) {
        this.repos = gitRepos;
        return this;
    }

    public void setRepos(GitRepos gitRepos) {
        this.repos = gitRepos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ticket)) {
            return false;
        }
        return id != null && id.equals(((Ticket) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Ticket{" +
            "id=" + getId() +
            ", ticketNumber=" + getTicketNumber() +
            ", ticketUrl='" + getTicketUrl() + "'" +
            ", ticketEstimation=" + getTicketEstimation() +
            "}";
    }
}
