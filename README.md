# Isolation Emotional Outlet

This website was made for people that are stuck at home during quarantine and don't have people they can express their emotions to. A user can signup and can post a post and have the ability to see it on his or her page and have the option to delete or to edit. Also the user can also see everyones post and they are kept anonymous so that everyone can see how other people are doing without knowing who wrote it. Also if the the user needs a emotinal boost or some humour they can go to the get a joke page anf watch jokes that come from an API. 

## website Link https://proj2-isolation.herokuapp.com/


## What It Includes

* Local Auth (email and password)
* Passport and passport-local
* Sessions for saving user info and displaying flash message
* Settings for PostresSQL and sequelize
* Hashed passwords
* EJS templating and ejs layouts
* Sequelize user model
* Materialize styling - nav and footer
* Method-override
* 2 API's



## Included Models
**User Model**

| column | Type | Notes |
| ----------- | ---------- | --------------------|
| id | Integer | Serial primary key |
| firstname | String | Required lenght > 1 |
| lastname | String | - |
| email | String | Serial Unique Login |
| password | String | Hash |
| birtday | Date | - |
| admin | Boolean | Defaulted to False |
| pic | String | - |
| bio | text | - |
| createdAt | Date | Automatically added by Sequelize |
| updatedAt | Date | Automatically added by Sequelize |


**Post Model**
| column | Type | Notes |
|------------- | ---------- | -----------------|
| id | Integer | Serial primary key |
| userId | Integer | - |
| content | text | - |

**Tags Model**
| column | Type | Notes |
|------------- | ---------- | -----------------|
| id | Integer | Serial primary key |
| tagName | text | - |

**tagsPosts Model**
| column | Type | Notes |
|------------- | ---------- | -----------------|
| id | Integer | Serial primary key |
| postId | Integer | - |
| tagId | Integrer | - |

## Included Routes

**Routes in Index (main)**

| Method | path | purpose |
| ----| ------------------------- | --------------- |
| GET | `/` | Home page - displays coronavirus API and login button |
| GET | `*` | Catch-all for 404s |



**Routes in controllers/auth.js**

| Method | path | purpose |
| ----| ------------------------- | --------------- |
| GET | `/auth/login` | Render login form |
| POST | `/auth/login` | Process login data |
| GET | `/auth/signup` | Render sign form |
| POST | `/auth/signup` | Process sign data |
| GET | `/auth/logout` | Remove user from session + redirect |

**Routes in controllers/profile.js**

| Method | Path | Purpose |
| ------ | ---------------------- | ---------------------------- |
| GET | `/profile/user` | Show user dashboard (authorized user only) - has posts and user info |
| PUT | `/profile/user` | To edit post on profile page |
| GET | `/profile/user/edit/:id` | Shows form to edit the post |
| DELETE | `/profile/user` | Button to delete post |
| POST | `/profile/user` | Process form data from making a post with a tag |
| GET | `/profile/addPost` | Shows form to add a post |
| GET | `/profile/getAJoke` | Shows page with API for jokes |

**Routes in controllers/post.js**

| Method | Path | Purpose |
| ------ | ---------------------- | ---------------------------- |
| GET | `/profile/post` | Show user all the posts made by other users |




## Directions For Use

### 1. Clone the repository, but with a diffrent name

Run on the terminal

```sh
git clone <repo_link> <new_name>
```
**For example**

```sh
git clone git@github.com:davidvelichko52/node-auth-boiler-1.git shiny-new-project
```

### 2. Install the modules from package.json

```sh
npm i
```

### 3. Customize the new project

Remove defaulty stuff. For example:

* Tile in `layouts.ejs`
* Logo field in the nav bar
* Description and Repositry fields in package.json
* Remove this bpilerplate's readme content
* Swith Favicon to project-specific one (in `layouts.ejs` head section)

### 4. Create a new datebase for the new project

```sh
create <new_db_name>
```
**For example

```sh
createdb shiny_db
```

### 5. Alter Sequelize Config File

In `config/config.json`, update the database to the one created in step 4. Other settings likely okay, but check username, password, and dialect.

### 6. Check user model for relevance to new project's needs

For example, if the new project dosen't need a birthday field, then delete it from the user model and user migration files.

### 7. Run the Sequelize migrations

```sh
sequelize db:migrate
```
### 8. Create a file for environment variables

```sh
touch .env
```
> Alternatively just create via text editor
Include the following .env variables:
* SESSION_SECRETE - this a for the session to use

### 9. Run the server and make sure it works

**with nodemon**
```sh
nodemon
```

**without nodemon**

```sh 
node index.js
```

### 10. Delete the origin that points to the boilerplate repository

Currently if we run this command

```sh
git remote -v
```

It will show `origin` as being hooked up to the boilerplate repository. We want a fresh repository instead, so let's delete the origin remote:

```sh
git remote remove origin
```

### 11. create an empty git repository

Via the Github website. Follow directions as they show up when you create a new repository:

```sh
git init
git add .
git commit -m "Initial commit"
git remote add origin <new_repo_link>
git push origin master
```

Happy developing!
