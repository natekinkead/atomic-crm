import * as ghpages from 'gh-pages';

ghpages.publish(
    'dist',
    {
        branch: process.env.DEPLOY_BRANCH || 'gh-pages',
        repo: process.env.DEPLOY_REPO_URL || undefined,
        cname: process.env.DEPLOY_CNAME || 'crm.campercapital.net',
    },
    function (err) {
        if (err) {
            console.error('Failed to deploy to GitHub Pages', err);
        }
    }
);
