module.exports = {
  'Users should see landing Page': (client) => {
    client
      .url('http://localhost:50000')
      .waitForElementVisible('body', 1000)
      .pause(5000)
      .end();
  }
};

