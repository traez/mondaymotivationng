# Monday Motivation NG

My goal for this project was to create a responsive application with a strong emphasis on user experience, data visualization, secure authentication, and data persistence. To achieve this, I aimed to integrate APIs, implement robust data handling, and leverage state management tools, all while ensuring reliable backend storage for data preservation. In all I'm practicing and developing my coding competency by building projects after projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The Challenge/User Stories

* User Authentication  
- The user should be able to log in using GitHub or Google.  
* Quote Management  
- The user should be able to submit their favorite motivational quotes.
- The user should be able to edit or delete their own quotes.
- The user should be able to sort quotes based on various criteria (e.g., upvotes, date created, etc.).     
* Voting System  
- The user should be able to upvote or downvote quotes to indicate their agreement or disagreement.
- Each user should only be allowed to vote once per quote but can change their vote.   
* Commenting System
- The user should be able to leave comments on any quote.
- The user should be able to edit or delete their own comments.    
* User Profile & Interaction  
- The user should be able to visit a page that groups quotes by the users who created them.
- The user should be able to view individual quotes on their own pages, along with all related comments and votes.
- The user should be able to view other users’ profiles and their contributed quotes.   
* Theme Preference  
- The user should be able to toggle between light mode and dark mode for a personalized viewing experience.   
* Community Engagement  
- The user should be able to engage with the community by commenting on quotes and participating in conversations with other users.   
* Source Code & Project Links  
- The user should be able to access links to the project’s source code and other projects developed by Trae Zeeofor via the footer.    

### Screenshot

![](public/screenshot-desktop.png)

### Links

- Solution URL: [https://github.com/traez/nigerian-inflation-tracker-2024](https://github.com/traez/nigerian-inflation-tracker-2024)
- Live Site URL: [https://nigerian-inflation-tracker-2024.vercel.app/](https://nigerian-inflation-tracker-2024.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox and CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- Tailwind CSS
- Typescript
- Nodejs  
- MongoDB/Mongoose     
- Auth.js (NextAuth)  
- Shadcn UI      
- react-hook-form      
- Tanstack     
- react-icons     
- sonner  
- uuid  
- zod       

### What I learned
   
- **File Extensions for JavaScript and JSX**  
Use .js for files containing plain JavaScript without JSX syntax.  
Use .jsx for files that include JSX, embedding HTML-like syntax directly within JavaScript.  
For TypeScript, use .tsx and .ts      
- **UUID Package Installation**  
`npm install uuid` to generate unique identifiers.  
`npm i @types/uuid` for TypeScript projects, providing type definitions and enhancing code completion and type checking.  
- **Global State Management vs. Server-Side Rendering (SSR)**  
In purely front-end development, tools like Redux Toolkit and Context API were essential for managing global state.  
Transitioning to full-stack development with SSR changes the approach: global state management becomes less critical, with user preferences and state managed through database storage, props, cookies, and URL parameters.    
- **Handling MongoDB ObjectId Serialization**  
Encountered an issue with MongoDB’s ObjectId not being serializable to JSON, causing client-side errors.  
Resolved by modifying server actions to return plain objects, excluding MongoDB-specific types, ensuring compatibility and avoiding serialization issues.      
- **Sonner vs. React-Toastify for Notifications**  
Explored using Sonner for toast notifications as an alternative to React-Toastify.  
- **Future Enhancements**   
Authentication: Separate registration and login functionalities for a more user-friendly experience.    
- **Responsive Design Best Practices**  
Adopted design strategies for three breakpoints (320px, 640px, 1280px) in Figma, with the first as an edge case and the latter two as Tailwind CSS defaults.    
- **Tanstack Tables**  
Gained experience working with Tanstack Tables, deepening my understanding of table management in React.    
- **React Imports and Namespace Usage**  
`import * as React from "react"`; is beneficial in TypeScript projects or specific build environments, ensuring all React components, hooks, and utilities are accessible under the React namespace.    
Additionally, this import style supports efficient tree-shaking, allowing bundlers to remove unused code and optimize the final output. It also ensures compatibility with various build tools and older configurations, making it a versatile choice for both modern and legacy React projects.   
- **Comprehensive Understanding of Full-Stack Development**  
Completing this project provided clarity on the practical use of server components alongside client components.  
Gained confidence in how authentication, backend storage, data fetching, and UI responsiveness work together in a full-stack app—areas I was previously uncertain about.  

### Continued development

- More projects; increased competence!

### Useful resources

Stackoverflow  
YouTube  
Google  
ChatGPT

## Author

- Website - [Trae Zeeofor](https://github.com/traez)
- Twitter - [@trae_z](https://twitter.com/trae_z)

## Acknowledgments

-Jehovah that keeps breath in my lungs
