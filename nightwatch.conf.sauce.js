const TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER;

let browsers = [
  {
    key: 'chrome_osx',
    browser: 'chrome',
    os: 'OS X 10.9'
  },
  {
    key: 'ff_osx',
    browser: 'firefox',
    os: 'OS X 10.9'
  },
  {
    key: 'safari_osx',
    browser: 'safari',
    os: 'OS X 10.9'
  },

  {
    key: 'ie_10',
    browser: 'internet explorer',
    platform: 'Windows 8',
    version: '10'
  },
  {
    key: 'ie_11',
    browser: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },

  {
    key: 'android',
    browser: 'android',
    // platform: 'Windows 8.1',
    version: '5.1'
  },
];

let obj = {
  'src_folders': [ 'e2e' ],
  'output_folder': './reports',
  'custom_commands_path' : 'e2e/custom_commands',
  'selenium': {
    'start_process': true,
    'server_path': './node_modules/nightwatch/bin/selenium.jar',
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver' : './node_modules/nightwatch/bin/chromedriver'
    }
  },
  'test_settings': {
    'default': {
      'selenium_port'  : 4445,
      'selenium_host'  : 'localhost',
      'silent': true,
      'username' : '${SAUCE_USERNAME}',
      'access_key' : '${SAUCE_ACCESS_KEY}',

      'desiredCapabilities': {
        'build': `build-${TRAVIS_JOB_NUMBER}`,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        'acceptSslCerts': true,
        'javascriptEnabled': true
      },
      'screenshots': {
        'enabled': false
      },
      'globals': {
        'waitForConditionTimeout': 5000,
        'baseUrl': 'http://localhost:9966'
      }
    }
  },
};


for (let i = 0; i < browsers.length; i++) {
  let current = browsers[i];

  obj.test_settings[current.key] = {
    desiredCapabilities: {
      browserName: current.browser,
      platform: current.os,
      javascriptEnabled: true,
      acceptSslCerts: true,
      version: current.version || 'latest'
    }
  };

  // if (current.version) {
  //   obj.test_settings[current.key].version = current.version;
  // }
}

module.exports = obj;
