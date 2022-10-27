# Chearner
This is a project that aims to optimize credit card benefits and management. 

It was built using majority React Native, SQLite, and Python. I used some APIs for the project, including CCstack.io, Google Places, and openai.com.

## Current Functionality
* Card identification and storage
* Credit optimization based on card benefits
* Transaction history and updates

## Roadmap (order of priority)
* ~~Bug: Fix app state needing to be reloaded after state changes (new card added doesn't get included in optimization till reload, new sign name doesn't automatically reload)~~
* ~~Bug: Edit transaction breaks~~
* TODO: Add more comments
* ~~Bug: Optimization call sometimes has " and breaks, can be fixed with a reload but still trying to figure out source~~
* Feature: Default apple pay card access (Through Apple, to change it without requiring the user to navigate to card in the wallet)
* Feature: ~~Geolocation~~ and background activity (Automatically select right card based on store user is in)
* Feature: Analytics (Success vs errors for card selection, total saved, etc.)
* ~~Bug: Fix status bar being white~~

## Installation and setup:

Clone the project

```
git clone https://github.com/reicaro/chearner
```

Install dependencies

```
npm install
```

```
cd ios
```

```
pod install
```

Until openAI approves the application to go live the user will need to supply their individual openai key, set as ENV variable OPENAI_API_KEY

With google maps integration added, there's now a project specific API key with places enabled and billing set up on free trial, if needed message me on discord reіd#0001 (copy and paste) and I'll help.

Run project

```
cd ..
```

```
npx react-native run-ios
```
