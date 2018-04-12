
const puppeteer = require('puppeteer')
const faker = require('faker')
const { expect } = require('chai')

//server address
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

describe('Purchase form test', async() => {
    it('should purchase', async() => {
        await page.goto(`${server}/purchaseForm`)
        await page.type('#formName','Will')
        await page.type('#formId', '5')
        await page.type('#userId','1')
        
        var successText = await page.$eval("#successText", el => el.innerHTML);

    expect(successText).to.equal("Success")
    }).timeout(10000);

    it('should not purchase', async() => {
        await page.goto(`${server}/purchaseForm`)
        await page.type('#formName', 'Will')
        await page.type('#formId', 'invalid')
        await page.type('#userId', '1')

        var errorText = await page.$eval("#errorText", el => el.innerHTML);

        expect(errorText).to.equal("Invalid formId")
    }).timeout(10000);

    it('should not purchase', async() => {
        await page.goto(`${server}/purchaseForm`)
        await page.type('#formName', 'Will')
        await page.type('#formId', '5')
        await page.type('#userId', 'invalid')

        var errorText = await page.$eval("#errorText", el => el.innerHTML);

        expect(errorText).to.equal("Invalid userId")
    }).timeout(10000);

    it('should not purchase', async() => {
        await page.goto(`${server}/purchaseForm`)
        await page.type('#formName', 'invalid')
        await page.type('#formId', '5')
        await page.type('#userId', '1')

        var errorText = await page.$eval("#errorText", el => el.innerHTML);

        expect(errorText).to.equal("Invalid formName")
    }).timeout(10000);
})
