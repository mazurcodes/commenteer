# Commenteer

🔴 Under Development 🔴

## Table of Contents

- [Description](#description)
- [Demo](#demo)
- [Agile Board](#agile-board)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [License](#license)

## Description

Commenteer is an application specifically designed for media creators to simplify the process of generating multiple comments for their content. It leverages the power of Next.js, TypeScript, and Firebase to provide a seamless user experience.

With Commenteer, creators can easily create custom sets of comments to enhance engagement and interaction with their audience. The application allows users to specify the project name, comment type (positive, negative, neutral, or questions), and the desired quantity of comments.

### Key features of Commenteer:

- **_Easy Comment Generation_**: Commenteer streamlines the process of creating a large number of comments. With just a few simple inputs, YouTube creators can generate a customizable set of comments to be used in their videos.

- **_Random Comment Generation_**: Commenteer ensures that the generated comments are randomized, providing a diverse and natural-sounding set of comments for YouTube creators.

- **_Firebase Authentication_**: Commenteer utilizes Firebase Authentication to enable secure user registration and login. This ensures that only authorized creators have access to the application.

- **_Firestore Database_**: Commenteer leverages Firebase Firestore as its database solution. This allows for efficient storage and retrieval of comment data, ensuring optimal performance.

## Demo

Commenteer is currently in version 0.1 and under development:

- [Demo on Vercel](https://commenteer.vercel.app/)

## Agile Board

Check my trello agile board that I use for managing tasks:

- [Trello Commenteer Board](https://trello.com/b/E2uFBZuT/commenteer)

## Technologies Used

Technologies that ensure Commenteer delivers a performant, secure, and user-friendly experience for media creators:

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Firebase Authentication and Firestore](https://firebase.google.com/)
- [React-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks)
- [MaterialUI](https://mui.com/)
- [Vitest](https://vitest.dev/)

By leveraging these tools, I've managed to ensure the reliability and quality of this application.

---

## Installation

To run Commenteer locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/mazurcodes/commenteer.git
   ```

2. Navigate to the project directory:

   ```shell
   cd commenteer
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Set up the environment variables:

   Create a .env file in the root of the project.
   Add the necessary environment variables, such as Firebase API keys and configuration details:

   ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=Here_Goes_Your_Public_FIREBASE_API_KEY
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=Here_Goes_Your_Public_FIREBASE_AUTH_DOMAIN
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=Here_Goes_Your_Public_FIREBASE_PROJECT_ID
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=Here_Goes_Your_Public_FIREBASE_STORAGE_BUCKET
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=Here_Goes_Your_Public_FIREBASE_MESSAGING_SENDER_ID
    NEXT_PUBLIC_FIREBASE_APP_ID=Here_Goes_Your_Public_FIREBASE_APP_ID
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=Here_Goes_Your_Public_FIREBASE_MEASUREMENT_ID
   ```

5. Run the development server:

   ```shell
   npm run dev
   ```

6. Open your web browser and visit http://localhost:3000 to access Commenteer.

---

## Available Scripts

In the project directory, you can run the following scripts:

1. Runs the development server, allowing you to preview the app in development mode.

   ```shell
       npm run dev
   ```

2. Builds the app for production, creating an optimized bundle.

   ```shell
       npm run build
   ```

3. Starts the production server to serve the built app.

   ```shell
       npm start
   ```

4. Runs the linter to check for code style and formatting issues.

   ```shell
       npm run lint
   ```

---

## License

This project is licensed under the MIT License.
