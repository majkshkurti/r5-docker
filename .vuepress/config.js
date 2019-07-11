module.exports = {
    title: 'Documentation',
    description: 'Quick and easy install of Conveyal Analysis on any modern operating system, using Docker.',
    dest: 'public',
    base: '/conveyal-analysis-docker/',
    themeConfig: {
        sidebar: [
        '/',
        '/INSTALL'
        ],
        displayAllHeaders: true,
        sidebarDepth: 2,
        repo: 'https://git.digitaltransport4africa.org/commons/conveyal-analysis-docker',
        docsDir: '.',
        editLinks: true,
        editLinkText: 'Edit on GitLab',
        nav: [
            {text: 'DT4A', link: 'https://digitaltransport4africa.org/'},
            {text: 'Resource Center', link: 'https://git.digitaltransport4africa.org/'},
        ],
        lastUpdated: 'Last update',
	}
}
