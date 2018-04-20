const puppeteer = require('puppeteer')
const faker = require('faker')
const { expect } = require('chai')

//server address
const server = 'http://server.redstonelab.net:8080'

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

describe('Purchase form test', async() => {
  it('should purchase', async() => {
    await login()
    await page.goto(`${server}/purchaseForm?formId=7`)
    await page.waitFor(1000)

    var successText = await page.$eval("#successText", el => el.innerHTML);
    expect(successText).to.equal('')

  }).timeout(10000);

    it('should not purchase', async() => {
        await page.goto(`${server}/purchaseForm`)
        await login()

        await page.click('#loginForm input[type=submit]')
        

        var errorText = await page.$eval("#errorText", el => el.innerHTML);

    expect(errorText).to.equal('')
    }).timeout(10000);

})
