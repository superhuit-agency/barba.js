// var SauceLabs = require("saucelabs");

module.exports = {
  'Basic test' : function (browser) {
    browser
      .url(browser.globals.baseUrl + '/e2e/grid/index.html')
      .expect.element('#barba-wrapper').to.have.attribute('aria-live').equals('polite');

    browser
      .assert.title('Homepage')
      .assert.urlContains('index.html');

    // browser
    //   .click('a[href="about.html"]')
    //   .pause(1000);

    // browser
    //   .assert.title('about')
    //   .assert.urlContains('about.html')
    //   .assert.cssClassPresent('body', 'about');

    browser.end();
  },

  afterEach: function(client, done) {
    client.customSauceEnd();

    setTimeout(function() {
      done()
    }, 1000);
  }
};
