# Contribute to barba.js (v2-dev)
Hi!
So, you want to help building a better barba.js!
**Great!** 💪 you are in the right place.

### Contributing != Coding
Contributing isn't just about coding.
I am also seeking for code advices, discussion on the structure/API, concepts and documentation.
Don't be shy and partecipate to the various github issues.



### How to send a pull request
*(Before adding a new feature or modify some behaviour it's better to discuss it first with a github issue.)*

- Fork & Clone the repository
- Create your branch from the `v2-dev` branch
- Install all the depdendencies with `yarn install` (we use [yarn](https://yarnpkg.com) instead of npm)
- Modify the source code
- If you added new features, make sure to create tests for it and to add jsdoc annotations
- Make sure all the tests passes (`yarn run test`)
- Create a build (`yarn run build`)
- Create a pull request! 🎉

We use package scripts for all the tasks.
Please look at `package.json` for all the task available.

Please note, in order to run e2e tests (selenium based using nightwatch) you need Java on your machine.

### E2E tests with [Saucelabs](https://saucelabs.com/)
If you also want to run e2e tests on saucelab you need to export the following environment variables (that assumes you have an account on saucelabs)
- `SAUCE_USERNAME`
- `SAUCE_ACCESS_KEY`
    
then:
`yarn run e2e-sauce`

