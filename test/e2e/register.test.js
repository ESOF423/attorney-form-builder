const puppeteer = require('puppeteer');
const faker = require('faker');
const { expect } = require('chai');

//const server = 'http://localhost:8080';
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

describe('register test', async () => {
  it('should register', async () => {
    await page.goto(`${server}/register`)
    await page.type('#email', faker.internet.email())

    var pass = faker.internet.password()
    await page.type('#password', pass)
    await page.type("#passwordRetype", pass)

    await page.click('#registerForm input[type=submit]')
    await page.waitFor(1000)
    
    var errorText = await page.$eval("#errorText", el => el.innerHTML);

    expect(errorText).to.equal("")
  }).timeout(10000);

  it('shouldn\'t register - not equal passwords', async () => {
    await page.goto(`${server}/register`)
    await page.type('#email', faker.internet.email())
    await page.type('#password', faker.internet.password())
    await page.type("#passwordRetype", faker.internet.password())

    await page.click('#registerForm input[type=submit]')

    await page.waitFor(1000)

    var successText = await page.$eval("#successText", el => el.innerHTML);
    expect(successText).to.equal("") 
       
  }).timeout(10000);

  it('shouldn\'t register - used email', async () => {
    await page.goto(`${server}/register`)
    await page.type('#email', "test@test.com")
    await page.type('#password', faker.internet.password())
    await page.type("#passwordRetype", faker.internet.password())

    await page.click('#registerForm input[type=submit]')

    await page.waitFor(1000)

    var successText = await page.$eval("#successText", el => el.innerHTML);
    expect(successText).to.equal("") 
       
  }).timeout(10000);

});