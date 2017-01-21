module.exports = {
  'Basic test' : function (browser) {

    /**
     * TODO: test Promise and fetch/Headers
     */

    browser
      .url(browser.globals.baseUrl + '/e2e/grid/index.html')
      .expect.element('#barba-wrapper').to.have.attribute('aria-live').equals('polite');

    browser
      .assert.title('Homepage')
      .assert.urlContains('index.html');

    browser
      .click('a[href="1.html"]')
      .pause(1000);

    browser
      .assert.title('1')
      .assert.urlContains('1.html');

    browser.assert.cssClassPresent('.full', 'test-class');

    browser.end();
  },

  afterEach: function(client, done) {
    client.customSauceEnd();

    setTimeout(function() {
      done()
    }, 1000);
  }
};
