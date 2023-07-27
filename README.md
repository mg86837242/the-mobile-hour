# The Mobile Hour

A very basic e-commerce website created for schoolwork. The website is built by using vanilla JavaScript, HTML, CSS and fetch API. The website features database integration, RESTful API integration, and basic authentication.

For demonstration purposes, screenshots of wireframing and Figma prototyping can be found in [this Google Docs file](https://docs.google.com/document/d/e/2PACX-1vSYzZD_uASKbKKmuOrPQBfxw_pfwT8zZmTSL7K1DPHrSFyESnXmLQ-rxYaHdjzbYEOsJxOisUAY7gZa/pub).

For deployed version of this webite, check the [deployment section](#3-deployment).

## 1. Usage

> **Note:**
> (1) The following instructions are given assuming it's in Windows OS, adjust to your OS accordingly.
> (2) All commands examples are bash, if necessary, adjust to the scripting language of your choice accordingly.

**Step 1:** To run this web app in local environment, clone the backend repository to a folder of your choice (e.g. `my-folder`) and install dependencies:

```bash
git clone https://github.com/mg86837242/the-mobile-hour

cd the-mobile-hour

npm install
```

**Step 2** Install MySQL Server and MySQL Workbench by following [this guide](https://www.simplilearn.com/tutorials/mysql-tutorial/mysql-workbench-installation) (optional)

Skip this step if MySQL Server and MySQL Workbench are already installed

**Step 3:** Open MySQL Workbench to import dataset. Steps for using the MySQL Workbench tool:

1.  Administration tab –> data import/restore
2.  Import from self-contained file
3.  Select the dump file called `database.sql` located at `./the-mobile-hour/src`
4.  Start import

**Step 4:** Configure database adapter's options, then start the API server (backend):

Configure the `host`, `user`, `password` and `database` options by modifying `the-mobile-hour/database.js` ([example](https://github.com/sidorares/node-mysql2#using-connection-pools)), then start the server:

```bash
npm start
```

Navigate to [`http://localhost:3000`](http://localhost:3000) in the browser to open the web app.

## 2. Wireframing and Prototyping

[This Google Docs](https://docs.google.com/document/d/e/2PACX-1vSYzZD_uASKbKKmuOrPQBfxw_pfwT8zZmTSL7K1DPHrSFyESnXmLQ-rxYaHdjzbYEOsJxOisUAY7gZa/pub) contains screenshots of wireframe and prototype drawings for this project, which are created for before the code implementation.

## 3. Deployment

For deployed version of this web app, visit: https://themobilehourdemo.space/

Technologies used for deployment includes but not limited to:

- Amazon Web Services (AWS), including IAM, EC2 and RDS
- Linux (Ubuntu)
- Bash (Git Bash)
- Node
- Nginx – web server and reverse proxy
- PM2 – backend process management
