# next-template

This is a template repository for building Next.js Apps. This template will provide a Mongo Atlas connection, Auth (db and providers), CI/CD, and basic templates.

## How to Use

In order to create a new project using this template, you can follow these steps:

### How to Install

There are two ways you can use this repo as starter code for your own project. You can `use as template` which will make the process quicker with a few less steps, but will mean you _do not_ have access to any future updates that are made to this template. If you would like to be able to recieve updates that are made to the template, then you will have to `clone the repo` instead.

#### Use as template

- Click the `use as template` button at the top of this repo

- Select the account you want to own the new repo

- Choose a name for your repo, and optionally write a short description

- Choose if your repo should be public or private

- Click `Create Repository from Template`

#### Clone the Repo

- Create your own repo on GitHub

- Clone the repo
  ```zsh
  git clone git@github.com:Dino-Martinez/next-template.git
  ```

- Enter the directory
  ```zsh
  cd express-quickstart
  ```

- Set the origin to your new repo
  ```zsh
  git remote set-url origin http://github.com/YOUR_USERNAME/YOUR_REPO
  ```

### How to Run
#### In development

Thanks to Next.js, running in development is as simple as running 
```zsh
next dev
```
#### In production

To set up CI/CD, just go ahead to https://vercel.com/new and select the git repo you want to host!