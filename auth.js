window.onload = function() {
  // Get the authorization code from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get('code');

  if (authorizationCode) {
    console.log("Authorization Code received:", authorizationCode);

    // Exchange the authorization code for an access token
    const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
    const clientId = '867639hjcxnxsb'; // Replace with your LinkedIn Client ID
    const clientSecret = 'ayIjiEN7Uj8zZ4ik'; // Replace with your LinkedIn Client Secret (not secure on the frontend!)
    const redirectUri = 'https://lithmiseneviratne.github.io/linkedin-redirect/auth/callback'; // Your GitHub Pages URL

    const bodyParams = new URLSearchParams({
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams
    })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        console.log("Access Token:", data.access_token);

        // Now you can fetch user data from LinkedIn
        fetch('https://api.linkedin.com/v2/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.access_token}`
          }
        })
        .then(response => response.json())
        .then(profileData => {
          console.log("LinkedIn Profile Data:", profileData);
          // You can now display or use the profile data as needed
        })
        .catch(err => console.error('Error fetching profile data:', err));
      } else {
        console.error('Failed to fetch access token:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching access token:', error);
    });
  } else {
    console.log("No Authorization Code found in the URL.");
  }
};
