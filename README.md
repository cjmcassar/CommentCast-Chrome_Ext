# Localizer - Chrome Extension (Internal Documentation)

Welcome to the internal documentation for Localizer, a proprietary Chrome extension developed using React. This tool is designed to enhance our app's localization by automatically testing for optimized localization and capturing screenshots of events or pages that are not properly adapted to different languages. It's a crucial development tool aimed at ensuring our app delivers a seamless and inclusive user experience across various regions.

## Features

- **Automated Localization Testing:** Localizer meticulously scans our app to verify that all elements are accurately localized for the intended target languages.
- **Screenshot Capture for Review:** It captures screenshots of any page or event within our app that does not pass the localization tests, facilitating quick identification and rectification of such issues.
- **Developer-Friendly:** With its straightforward setup and user-friendly interface, Localizer is crafted to blend effortlessly into our development process.
- **Customizable Testing Parameters:** Developers can customize the localization tests to address the unique requirements of our app, ensuring a thorough validation of all functionalities.

## Getting Started for Developers

1. **Installation:** Add Localizer to your Chrome browser. The installation package can be found in our internal tools repository.
2. **Configuration:** Launch the Localizer extension and set up your target languages along with specific tests tailored to our app's needs.
3. **Initiate Localization Tests:** With Localizer activated, navigate through the app. The extension will autonomously identify and screenshot any localization discrepancies.
4. **Issue Resolution:** Utilize the captured screenshots to pinpoint and resolve any detected localization issues within the app.

## Requirements

- Google Chrome Browser

## Development Process

To ensure a smooth development process for our Localizer Chrome Extension, follow these steps:

1. **Environment Setup:** Make sure you have Node.js and npm installed. Clone the repository and run `npm install` to install all dependencies.

2. **Development Build:** Use the command `npm run build` to compile the TypeScript and React files into JavaScript. This command uses webpack to bundle the application, as specified in `webpack.config.js`.

3. **Testing Changes:** To test your changes, load the `dist` folder as an unpacked extension in Chrome. Navigate to `chrome://extensions/`, enable Developer mode, and click on "Load unpacked". Select the `dist` folder within the project directory.

4. **Watching for Changes:** For a more efficient development workflow, use `npm run watch` to automatically rebuild the project when files are changed. This allows for rapid testing and iteration.

5. **Submitting Changes:** Once you're satisfied with your changes, submit a pull request for review. Ensure your PR includes a detailed description of the changes and any necessary testing instructions.

6. **Review and Merge:** The code will be reviewed by a peer, and upon approval, it will be merged into the main branch. Continuous integration tools will automatically deploy the new version of the extension.
