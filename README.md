# Wave: Social Media App for Students
### [Link to Documentation](https://ashikkabeer.notion.site/Social-Media-App-Documentaion-bddbf5b9377043b8b81a3e7dccb8e526)


### [Live Link](http://studentsocials-env.eba-vcmmdpxm.eu-north-1.elasticbeanstalk.com/)
![gif](https://media.giphy.com/media/l1J9IFcDSYcAeHH5m/giphy.gif)

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
2. MongoDB Database
3. Git (optional, but recommended)

## Installation

```bash
# Clone the repository to your local machine
git clone https://github.com/ashikkabeer/Wave-Social-Media-App-Backend.git

# Change directory to the project folder
cd Wave-Social-Media-App-Backend

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
    - authControl.js 
    - collegeControl.js
    - imageUpload.js
    - postControl.js
    - userControl.js
  - /config
    -db.js
  - /model
    - college.js
    - message.js
    - post.js
    - user.js
  - /routes
    - authRoutes.js
    - collegeRoutes.js
    - index.js
    - postRoutes.js
    - userRoutes.js
  - /util
    - hashingHelper.js
    - timeConvertHelper.js
    - tryCatch.js
- /public
- /views
- .env
- .dockerignore
- compose.yaml
- Dockerfile
- .gitignore
- app.js
- package.json
```
### mykeys.json file
```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "-----BEGIN PRIVATE KEY-----\n\n-----END PRIVATE KEY-----\n",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": "  "
}
```
### .env file
```
MONGO_URI = <mongo-uri>
PORT = 3000
SESSION_SECRET = <Random String>
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
