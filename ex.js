/*
con);

const puppeteer = require('puppeteer');

const app = express();

const port = 3000;

app.get('/:username', async (req, res) => {

  const { username } = req.params;

  const url = `https://www.instagram.com/${username}/`;

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(url);

  // Get profile name

  const name = await page.evaluate(() => {

    const element = document.querySelector('.rhpdm');

    return element ? element.innerText : null;

  });

  // Get profile username

  const profileUsername = await page.evaluate(() => {

    const element = document.querySelector('.nJAzx');

    return element ? element.innerText : null;

  });

  // Get profile description

  const description = await page.evaluate(() => {

    const element = document.querySelector('.-vDIg span');

    return element ? element.innerText : null;

  });

  // Get profile post count

  const postCount = await page.evaluate(() => {

    const element = document.querySelector('.g47SY');

    return element ? element.innerText : null;

  });

  // Get profile follower count

  const followerCount = await page.evaluate(() => {

    const element = document.querySelectorAll('.g47SY')[1];

    return element ? element.innerText : null;

  });

  // Get profile following count

  const followingCount = await page.evaluate(() => {

    const element = document.querySelectorAll('.g47SY')[2];

    return element ? element.innerText : null;

  });

  await browser.close();

  res.send({

    name,

    profileUsername,

    description,

    postCount,

    followerCount,

    followingCount,

  });

});

app.listen(port, () => {

  console.log(`App listening at ${port}`);

});
*/

const express = require('express');
const instaScraper = require('instagram-basic-data-scraper-with-username');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/profile', (req, res) => {
  const username = req.body.username;
  instaScraper(username)
    .then((data) => {
      const profilePicUrl = data.profilePicUrl;
      const followerCount = data.edgeFollowedBy.count;
      const postCount = data.edgeOwnerToTimelineMedia.count;
      const responseData = {
        profilePicUrl: profilePicUrl,
        followerCount: followerCount,
        postCount: postCount
      };
      res.json(responseData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving profile data' });
    });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
