module.exports = {
  // Indicates which directories should be searched for test files
  roots: ["<rootDir>/tests"],
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.js$": "babel-jest", // Use Babel to transpile JavaScript files
    "^.+\\.vue$": "vue-jest", // Use vue-jest for Vue.js Single File Components
  },
  // The module file extensions to process
  moduleFileExtensions: ["js", "vue", "json"],
  // A list of paths to directories that Jest should use to search for files
  modulePaths: ["<rootDir>/src"],
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map @ to src directory
  },
  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "json", "vue"],
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
};
