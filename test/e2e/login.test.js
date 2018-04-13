const puppeteer = require('puppeteer');
const faker = require('faker');
const { expect } = require('chai');

//const server = 'http://localhost:8080';
const server = 'http://server.redstonelab.net:8080'

var email = 'user@test.com';
var pass = 'password';

var browser;
var page;
before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
})

after(async () => {
    await browser.close();
})

describe('login test', async () => {
  it('should login', async () => {
    await page.goto(`${server}/login`)
    await page.type('#email', 'test@test.com')
    await page.type('#password', 'password')
    await page.click('#loginForm input[type=submit]')
    await page.waitFor(1000)
    
    var successText = await page.$eval("#successText", el => el.innerHTML);

    expect(successText).to.equal('')
  }).timeout(10000);

  it('shouldn\'t login', async () => {
    await page.goto(`${server}/login`)
    await page.type('#email', 'invalid')
    await page.type('#password', 'invalid')
    await page.click('#loginForm input[type=submit]')

    await page.waitFor(1000)

    var errorText = await page.$eval("#errorText", el => el.innerHTML);
    // await page.screenshot({path: 'example.png'})
    expect(errorText).to.equal("Invalid email or password") 
       
  }).timeout(10000);

});