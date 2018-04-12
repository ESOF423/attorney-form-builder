/*
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

describe('formBuilder test', async () => {
	it('should login', async () => {
		await page.goto('${server}/login')
		await page.type('#email', 'attorney@test.com')
		await page.type('#password', 'password')

	})

    it('should create', async () => {
    	await page.goto('${server}/formBuilder')
        await page.type('#name','unit')
        await page.type('#cost', '1')
        await page.type('#state', 'Montana')
        await page.click('#addQuestion, input[type=addQuestion]')
        await page.type('#label', 'Heir')
        await page.type('#type', 'Textbox')
  		await page.click('#addContainer, input[type=addContainter]')
  		await page.type('#conditionText', 'Jewelry')
        await page.click('#formBuilder, input[type=submit]')
        await page.waitFor(1000)
    
        var successText = await page.$eval("#successText", el => el.innerHTML);

    	expect(successText).to.equal("Success")
	})
    
    it('should not create', async() => {
    	await page.goto('${server}/formBuilder')
    	await page.type('#name', 'unit2')
    	await page.type('#cost', 'invalid')
    	await page.type('#state', 'Alabama')
    	await page.click('#submit, input[type=submit]')

    	var errorText = await page.$eval("#errorText", el => el.innerHTML);

    	expect(errorText).to.equal(" ")
    })
    
    }).timeout(10000);
*/