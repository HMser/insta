const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Route to fetch Instagram profile details
app.get('/profile/:username', async (req, res) => {
  const username = req.params.username;
  const url = `https://levanter.onrender.com/ig?q=${username}`;
  
  try {
    const response = await axios.get(url);
    const data = response.data;

    // Extracting profile details from the API response
    const profile = {
      name: data.fullName,
      username: data.username,
      description: data.biography,
      avatar: data.profilePicUrl,
      posts: data.edge_owner_to_timeline_media.count,
      followers: data.edge_followed_by.count,
      following: data.edge_follow.count
    };
    
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching profile details');
  }
});

// Start the server listening on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
