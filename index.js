// Import the puppeteer library
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
//   Go to login Page
  await page.goto('https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin');
//   Enter your LinkedIn Username
  await page.type('#username','example@gmail.com')
//   Enter your LinkedIn Password
  await page.type('#password','myLinkedInPassword')
  
  await Promise.all([
      page.waitForNavigation(),
      page.click('.from__button--floating')

  ])
  await Promise.all([
    page.waitForNavigation(),
    await page.click('#mynetwork-tab-icon')

])
  
// Enter the number of people that you want to connect
var peopleToConnect = 20;


var connected=0;
async function timer(i = 0) {
  await page.waitFor(4000)
  let ToConnect= await page.$$("button[data-control-name='invite']")
  connected+=ToConnect.length;
  console.log(connected)
  for ( connect of ToConnect ){
    connect.click()
  }
  
  if(connected>=peopleToConnect){
      return "Completed";
  }
  await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
  return timer(i + 1)
}
timer().then(console.log)
    
await browser.close();
})();