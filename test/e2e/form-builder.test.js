const puppeteer = require('puppeteer');
const faker = require('faker');
const { expect } = require('chai');

//const server = 'http://localhost:8080';
const server = 'http://server.redstonelab.net:8080'

async function login(){
  await page.goto(`${server}/login`)
  await page.type('#email', 'attorney@test.com')
  await page.type('#password', 'password')
  await page.click('#loginForm input[type=submit]')
  await page.waitFor(1000)
}

var browser;
var page;
before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

})

after(async () => {
    await browser.close();
})

describe('build forms test', async () => {
  it('should add a question', async () => {
    await login()
    await page.goto(`${server}/formBuilder`)
    await page.waitFor(1000)

    await page.click('input[value="Add Question"]')
    await page.waitFor(1000)

    await page.screenshot({path: 'example.png'})
    
    var rows = await page.$$eval(".question-container div div", (el) => {
      return el.length > 0
    });
    
    expect(rows).to.equal(true) 
  }).timeout(10000);

  it('should add a container', async () => {
    await login()

    await page.goto(`${server}/formBuilder`)
    await page.waitFor(1000)

    await page.click('input[value="Add Container"]')
    await page.waitFor(1000)

    await page.screenshot({path: 'example.png'})
    
    var rows = await page.$$eval(".question-container div div", (el) => {
      return el.length > 0
    });
    
    expect(rows).to.equal(true) 
  }).timeout(10000);
});