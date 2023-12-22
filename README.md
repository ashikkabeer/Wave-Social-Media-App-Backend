# Social Media App for Students
### [Link to Documentation](https://ashikkabeer.notion.site/Social-Media-App-Documentaion-bddbf5b9377043b8b81a3e7dccb8e526)

## Description

It is a social media platform designed exclusively for students. It offers a space for students to connect, share information, and engage in discussions related to their colleges and academic interests. This Node.js backend-focused project powers the core functionality of this app.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Getting Started
### Prerequisites
Before setting up this app, ensure you have the following installed:

1. Node.js v20.1.0 and npm (Node Package Manager)
2. MongoDB (or a compatible database)
3. Git (optional, but recommended)

## Installation

```bash
# Clone the repository to your local machine
git clone https://github.com/ashikkabeer/Social-Media-App-Backend.git

# Change directory to the project folder
cd Social-Media-App-Backend

# Install dependencies
npm install

# Create a .env file in the root directory and configure your environment variables, including database connection details, API secrets, and any other required settings.

# Start the app
npm start
```

## Usage

- User registration and authentication.
- Creating and sharing posts.
- Uploading images.
- Adding colleges to profiles.
- Following colleges.
- Navigating the news feeds and timeline.
- Customizing user profiles.


```bash
# Create a new user account
1. Go to the registration page.
2. Fill out the required information.
3. Click the "Sign Up" button.

# Post a new message
1. Log in to your account.
2. Click the "New Post" button.
3. Enter your message and click "Post."

# Connect with other users
1. Search for colleges name and follow.
```

## Project Structure

Explain the organization of your project's source code. Describe the purpose of each major directory and file.

```
- /src
  - /controllers
    - collegeControl.js
    - imageUpload.js
    - postControl.js
    - userControl.js
  - /db
    -connect.js
  - /schema
    - college.js
    - user.js
  - /routes
    - collegeRoutes.js
    - index.js
    - postRoutes.js
    - userRoutes.js
- /public
- /views
    - addColleges.hbs
    - addPost.hbs
    - error.hbs
    - index.hbs
    - layout.hbs
    - login.hbs
    - signup.hbs
    userProfile.hbs
- .env
- .gitignore
- app.js
- package.json
```


## Features

This app offers a range of features to enhance the student experience:

- **Basic Authentication:** Users can sign up, log in, and maintain their profiles securely.
- **Create Posts:** Students can create and share posts, including text and images.
- **Upload Images:** Users can upload images to include in their posts.
- **Add Colleges:** Colleges can be added to profiles to specify academic affiliations.
- **Follow Colleges:** Students can follow colleges to receive updates and news.
- **News Feeds and Timeline:** Users have access to personalized news feeds and timelines.
- **User Profiles:** Detailed user profiles with customizable information.
