package com.vd5.gitrepos.application.web.rest;

import com.vd5.gitrepos.application.GitReposApp;
import com.vd5.gitrepos.application.domain.GitRepos;
import com.vd5.gitrepos.application.repository.GitReposRepository;
import com.vd5.gitrepos.application.service.GitReposService;
import com.vd5.gitrepos.application.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.vd5.gitrepos.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link GitReposResource} REST controller.
 */
@SpringBootTest(classes = GitReposApp.class)
public class GitReposResourceIT {

    private static final String DEFAULT_GIT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_GIT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_GIT_URL = "AAAAAAAAAA";
    private static final String UPDATED_GIT_URL = "BBBBBBBBBB";

    private static final String DEFAULT_GIT_USER = "AAAAAAAAAA";
    private static final String UPDATED_GIT_USER = "BBBBBBBBBB";

    private static final String DEFAULT_GIT_PASS = "AAAAAAAAAA";
    private static final String UPDATED_GIT_PASS = "BBBBBBBBBB";

    private static final String DEFAULT_GIT_KEY = "AAAAAAAAAA";
    private static final String UPDATED_GIT_KEY = "BBBBBBBBBB";

    @Autowired
    private GitReposRepository gitReposRepository;

    @Autowired
    private GitReposService gitReposService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restGitReposMockMvc;

    private GitRepos gitRepos;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GitReposResource gitReposResource = new GitReposResource(gitReposService);
        this.restGitReposMockMvc = MockMvcBuilders.standaloneSetup(gitReposResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GitRepos createEntity(EntityManager em) {
        GitRepos gitRepos = new GitRepos()
            .gitName(DEFAULT_GIT_NAME)
            .gitUrl(DEFAULT_GIT_URL)
            .gitUser(DEFAULT_GIT_USER)
            .gitPass(DEFAULT_GIT_PASS)
            .gitKey(DEFAULT_GIT_KEY);
        return gitRepos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GitRepos createUpdatedEntity(EntityManager em) {
        GitRepos gitRepos = new GitRepos()
            .gitName(UPDATED_GIT_NAME)
            .gitUrl(UPDATED_GIT_URL)
            .gitUser(UPDATED_GIT_USER)
            .gitPass(UPDATED_GIT_PASS)
            .gitKey(UPDATED_GIT_KEY);
        return gitRepos;
    }

    @BeforeEach
    public void initTest() {
        gitRepos = createEntity(em);
    }

    @Test
    @Transactional
    public void createGitRepos() throws Exception {
        int databaseSizeBeforeCreate = gitReposRepository.findAll().size();

        // Create the GitRepos
        restGitReposMockMvc.perform(post("/api/git-repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitRepos)))
            .andExpect(status().isCreated());

        // Validate the GitRepos in the database
        List<GitRepos> gitReposList = gitReposRepository.findAll();
        assertThat(gitReposList).hasSize(databaseSizeBeforeCreate + 1);
        GitRepos testGitRepos = gitReposList.get(gitReposList.size() - 1);
        assertThat(testGitRepos.getGitName()).isEqualTo(DEFAULT_GIT_NAME);
        assertThat(testGitRepos.getGitUrl()).isEqualTo(DEFAULT_GIT_URL);
        assertThat(testGitRepos.getGitUser()).isEqualTo(DEFAULT_GIT_USER);
        assertThat(testGitRepos.getGitPass()).isEqualTo(DEFAULT_GIT_PASS);
        assertThat(testGitRepos.getGitKey()).isEqualTo(DEFAULT_GIT_KEY);
    }

    @Test
    @Transactional
    public void createGitReposWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gitReposRepository.findAll().size();

        // Create the GitRepos with an existing ID
        gitRepos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGitReposMockMvc.perform(post("/api/git-repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitRepos)))
            .andExpect(status().isBadRequest());

        // Validate the GitRepos in the database
        List<GitRepos> gitReposList = gitReposRepository.findAll();
        assertThat(gitReposList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGitRepos() throws Exception {
        // Initialize the database
        gitReposRepository.saveAndFlush(gitRepos);

        // Get all the gitReposList
        restGitReposMockMvc.perform(get("/api/git-repos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gitRepos.getId().intValue())))
            .andExpect(jsonPath("$.[*].gitName").value(hasItem(DEFAULT_GIT_NAME.toString())))
            .andExpect(jsonPath("$.[*].gitUrl").value(hasItem(DEFAULT_GIT_URL.toString())))
            .andExpect(jsonPath("$.[*].gitUser").value(hasItem(DEFAULT_GIT_USER.toString())))
            .andExpect(jsonPath("$.[*].gitPass").value(hasItem(DEFAULT_GIT_PASS.toString())))
            .andExpect(jsonPath("$.[*].gitKey").value(hasItem(DEFAULT_GIT_KEY.toString())));
    }
    
    @Test
    @Transactional
    public void getGitRepos() throws Exception {
        // Initialize the database
        gitReposRepository.saveAndFlush(gitRepos);

        // Get the gitRepos
        restGitReposMockMvc.perform(get("/api/git-repos/{id}", gitRepos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gitRepos.getId().intValue()))
            .andExpect(jsonPath("$.gitName").value(DEFAULT_GIT_NAME.toString()))
            .andExpect(jsonPath("$.gitUrl").value(DEFAULT_GIT_URL.toString()))
            .andExpect(jsonPath("$.gitUser").value(DEFAULT_GIT_USER.toString()))
            .andExpect(jsonPath("$.gitPass").value(DEFAULT_GIT_PASS.toString()))
            .andExpect(jsonPath("$.gitKey").value(DEFAULT_GIT_KEY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGitRepos() throws Exception {
        // Get the gitRepos
        restGitReposMockMvc.perform(get("/api/git-repos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGitRepos() throws Exception {
        // Initialize the database
        gitReposService.save(gitRepos);

        int databaseSizeBeforeUpdate = gitReposRepository.findAll().size();

        // Update the gitRepos
        GitRepos updatedGitRepos = gitReposRepository.findById(gitRepos.getId()).get();
        // Disconnect from session so that the updates on updatedGitRepos are not directly saved in db
        em.detach(updatedGitRepos);
        updatedGitRepos
            .gitName(UPDATED_GIT_NAME)
            .gitUrl(UPDATED_GIT_URL)
            .gitUser(UPDATED_GIT_USER)
            .gitPass(UPDATED_GIT_PASS)
            .gitKey(UPDATED_GIT_KEY);

        restGitReposMockMvc.perform(put("/api/git-repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGitRepos)))
            .andExpect(status().isOk());

        // Validate the GitRepos in the database
        List<GitRepos> gitReposList = gitReposRepository.findAll();
        assertThat(gitReposList).hasSize(databaseSizeBeforeUpdate);
        GitRepos testGitRepos = gitReposList.get(gitReposList.size() - 1);
        assertThat(testGitRepos.getGitName()).isEqualTo(UPDATED_GIT_NAME);
        assertThat(testGitRepos.getGitUrl()).isEqualTo(UPDATED_GIT_URL);
        assertThat(testGitRepos.getGitUser()).isEqualTo(UPDATED_GIT_USER);
        assertThat(testGitRepos.getGitPass()).isEqualTo(UPDATED_GIT_PASS);
        assertThat(testGitRepos.getGitKey()).isEqualTo(UPDATED_GIT_KEY);
    }

    @Test
    @Transactional
    public void updateNonExistingGitRepos() throws Exception {
        int databaseSizeBeforeUpdate = gitReposRepository.findAll().size();

        // Create the GitRepos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGitReposMockMvc.perform(put("/api/git-repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitRepos)))
            .andExpect(status().isBadRequest());

        // Validate the GitRepos in the database
        List<GitRepos> gitReposList = gitReposRepository.findAll();
        assertThat(gitReposList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGitRepos() throws Exception {
        // Initialize the database
        gitReposService.save(gitRepos);

        int databaseSizeBeforeDelete = gitReposRepository.findAll().size();

        // Delete the gitRepos
        restGitReposMockMvc.perform(delete("/api/git-repos/{id}", gitRepos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<GitRepos> gitReposList = gitReposRepository.findAll();
        assertThat(gitReposList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GitRepos.class);
        GitRepos gitRepos1 = new GitRepos();
        gitRepos1.setId(1L);
        GitRepos gitRepos2 = new GitRepos();
        gitRepos2.setId(gitRepos1.getId());
        assertThat(gitRepos1).isEqualTo(gitRepos2);
        gitRepos2.setId(2L);
        assertThat(gitRepos1).isNotEqualTo(gitRepos2);
        gitRepos1.setId(null);
        assertThat(gitRepos1).isNotEqualTo(gitRepos2);
    }
}
