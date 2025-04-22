# LEMMA

Web application that integrates the formal language [LEAN](https://lean-lang.org/) into a LMS to enable autograding of student-written proofs.

## Prerequisite

### LEAN Adjacent
This project requires the [elan toolchain](https://leanprover-community.github.io/get_started.html) to be installed which provides [LEAN](https://lean-lang.org/) and its package manager [Lake](https://github.com/leanprover/lean4/tree/master/src/lake).

### Other Software
This projects also requires [Node.js](https://nodejs.org/en/download) and [BubbleWrap](https://github.com/containers/bubblewrap).

## Installation and Running
All of the following commands are expected to be ran on the root of the repo.

This project uses a postgres. The files necessary to create the server is seen in `data`. To generate the initialization of the database, 
```bash
data/create_db.sh
```
This creates a `data/init_db.sql` file that runs the other `data/*.sql` files in a valid order. You may run this within postgres with
```psql
\i data/init_db.sql
```

This project requires a `.env` file. The existing `.env.example` is on the repo with the environment variables used in the project.
```bash
cp .env.example .env
```
Fill out the variables in `.env` based on the comments.

Install the necessary packages
```bash
npm install
```

Running development
```bash
npm run dev
```

Running for deployment
```bash
npm run build
npm run start
```
