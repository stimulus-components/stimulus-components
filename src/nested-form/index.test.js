require('expect-puppeteer')

beforeAll(async () => {
  await page.goto('http://localhost:3000')
})

describe('#nestedForm', () => {
  it('should toggle the input type', async () => {
    const button = await page.$('#nested-form-button')
    const target = await page.$('#nested-form-target')
    let previousSibling = await target.evaluateHandle(element => element.previousElementSibling)
    let content = await (await previousSibling.getProperty('innerHTML')).jsonValue()

    expect(content).toContain('Your todo')
    await button.click()

    previousSibling = await target.evaluateHandle(element => element.previousElementSibling)
    content = await (await previousSibling.getProperty('innerHTML')).jsonValue()
    expect(content).toContain('New todo')
  })
})
