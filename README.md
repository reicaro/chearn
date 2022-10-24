This is Chearner, my Software Studio project. Chearner aims to help the user manage their credit cards and maximize benefits.


Installation and setup:

Run npm install, navigate to the ios directory, and run pod install. If you don't have an openai key you can make a free one on the website, set it as an ENV variable and the app should be fully working.


Features/bugs list (order of priority):

~~Bug: Fix app state needing to be reloaded after state changes (new card added doesn't get included in optimization till reload, new sign name doesn't automatically reload)~~

~~Bug: Edit transaction breaks~~

TODO: Add more comments

~~Bug: Optimization call sometimes has " and breaks, can be fixed with a reload but still trying to figure out source~~

Feature: Default apple pay card access (Through Apple, to change it without requiring the user to navigate to card in the wallet)

Feature: Geolocation and background activity (Automatically select right card based on store user in in)

Feature: Analytics (Success vs errors for card selection, total saved, etc.)

Bug: Remove deprecated packages

~~Bug: Fix status bar being white~~
