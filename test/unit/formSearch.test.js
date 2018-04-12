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

describe('formSearch test', async () => {
    it('should find', async () => {
        await page.goto(`${server}/formSearch`)
        await page.type('#name','Will')
        await page.type('#attorney','Bill Waterson')
        await page.type('#cost', '4')
        await page.click('#formSearch input[type=submit]')
        await page.waitFor(1000)
    
        var successText = await page.$eval("#successText", el => el.innerHTML);

    expect(successText).to.equal("Success")
    }).timeout(10000);

    it('should not find', async () => {
        await page.goto(`${server}/formSearch`)
        await page.type('#name', 'Will')
        await page.type('#attorney', 'invalid')
        await page.type('#cost','4')
        await page.click('#formSearch input[type=submit]')
        await page.waitFor(1000)

        var errorText = await page.$eval("#errorText", el => el.innerHTML);

        expect(errorText).to.equal("No forms for submitted attorney")
    }).timeout(10000);

    it('should not find', async () => {
        await page.goto(`${server}/formSearch`)
        await page.type('#name', 'invalid')
        await page.type('#attorney', 'Bill Waterson')
        await page.type('#cost', '4')
        await page.click('#formSearch input[type=submit]')
        await page.waitFor(1000)
        
        var errorText = await page.$eval("#errorText", el => el.innerHTML);

        expect(errorText).to.equal("Invalid form name")
    }).timeout(10000);

    it('should not find', async () => {
        await page.goto(`${server}/formSearch`)
        await page.type('#name', 'Will')
        await page.type('#attorney', 'Bill Waterson')
        await page.type('#cost', 'invalid')
        await page.click('#formSearch input[type=submit]')
        await page.waitFor(1000)

        var errorText = await page.$eval("#errorText", el => el.innerHTML);

        expect(errorText).to.equal("Invalid form cost")
    }).timeout(10000);
});
