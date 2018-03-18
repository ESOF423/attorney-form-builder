const puppeteer = require('puppeteer');
const faker = require('faker');
const { expect } = require('chai');

const server = 'http://localhost:8080';
//const server = 'http://server.redstonelab.net:8080'

async function login(){
  await page.goto(`${server}/login`)
  await page.type('#email', 'test@test.com')
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

describe('search forms test', async () => {
  it('should find forms', async () => {
    await login()

    await page.goto(`${server}/formSearch`)

    await page.waitFor(1000)

    // await page.screenshot({path: 'example.png'})
    
    var rows = await page.$$eval(".pure-table tbody tr", (el) => {
      return el.length > 0
    });
    
    expect(rows).to.equal(true) 
  }).timeout(10000);


  it('should purchase form', async () => {
    await login()
    await page.goto(`${server}/formSearch`)
    await page.waitFor(1000)
    
    expect(await page.getUrl()).to.equal(`${server}/purchaseForm`) 
  }).timeout(10000);

});