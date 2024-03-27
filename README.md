# commentcast - Chrome Extension (Internal Documentation)

Welcome to the internal documentation for commentcast, a proprietary Chrome extension developed using React. This tool is designed to enhance our app's user experience by enabling companies to allow their users to make comments directly on the UI of the app, which can be viewed internally by their engineers or product managers. It's a crucial development tool aimed at ensuring our app delivers a seamless and inclusive user experience across various regions by capturing and managing UI feedback efficiently.

## Features

- **Overlayed UI Commenting:** commentcast allows users to overlay comments directly on the UI, making it easier to understand and address user feedback.
- **Easy Installation:** With a simple installation process, commentcast can be set up and ready to use in no time.
- **Ability to Save Different Comments:** Users can save different comments for future reference or to share with others.
- **Toggle Comments On and Off:** Users have the option to toggle comments on and off, providing flexibility in their viewing experience.

## Getting Started for Developers

1. **Installation:** Add commentcast to your Chrome browser. The installation package can be found in our internal tools repository.
2. **Configuration:** Launch the commentcast extension and set up your target audiences along with specific parameters tailored to our app's needs for efficient UI feedback collection.
3. **Initiate UI Feedback Collection:** With commentcast activated, navigate through the app. The extension will highlight areas that your cursor hovers over. Click to then open a text box to begin commenting.

4. **Issue Resolution:** Utilize the captured comments to pinpoint and resolve any detected issues within the app related to UI feedback collection.

## Requirements

- Google Chrome Browser

## Development Process

To ensure a smooth development process for our commentcast Chrome Extension, follow these steps:

1. **Environment Setup:** Make sure you have Node.js and npm installed. Clone the repository and run `npm install` to install all dependencies.

2. **Development Build:** Use the command `npm run build` to compile the TypeScript and React files into JavaScript. This command uses webpack to bundle the application, as specified in `webpack.config.js`.

3. **Testing Changes:** To test your changes, load the `dist` folder as an unpacked extension in Chrome. Navigate to `chrome://extensions/`, enable Developer mode, and click on "Load unpacked". Select the `dist` folder within the project directory.

4. **Watching for Changes:** For a more efficient development workflow, use `npm run watch` to automatically rebuild the project when files are changed. This allows for rapid testing and iteration.

5. **Submitting Changes:** Once you're satisfied with your changes, submit a pull request for review. Ensure your PR includes a detailed description of the changes and any necessary testing instructions.

6. **Review and Merge:** The code will be reviewed by a peer, and upon approval, it will be merged into the main branch. Continuous integration tools will automatically deploy the new version of the extension.
