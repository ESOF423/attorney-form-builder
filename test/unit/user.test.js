const puppeteer = require('puppeteer');
const faker = require('faker');
const { expect } = require('chai');

const server = 'http://server.redstonelab.net:8080'

var browser;
var page;
before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
})

after(async () => {
    await browser.close();
})

describe('user test', async () => {
  
  it('shouldn not login', async () => {
    await page.goto(`${server}/login`)
    await page.type('#email', 'fake@test.com')
    await page.type('#password', 'password')
    await page.click('#loginForm input[type=submit]')

    await page.waitFor(1000)

    var errorText = await page.$eval("#errorText", el => el.innerHTML);
  
    expect(errorText).to.equal("Invalid email or password") 
       
  }).timeout(10000);

});