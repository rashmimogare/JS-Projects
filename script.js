const token =' BQDmlUugUfjGed9j5MDcBeDKGJqPDsfYBHO3esN8VbAV7aEz152-QaBFLDfmWz_gSPMecy2kKzG-_ClsGLHBfHl_C3N_5vtINteEC2pn_pGlhKtp4eFS1XSWJan3ZHAjeZb50EuiTsnu2CXYONCJyTGGkrUarhMLW5uZUVE2GnKnIbwP3EZkbeAKSJtPZQ7d6cEJppGXbKIi3eO_cM32vHR7-vl3uRx2uljmcBa-N9GfaZ81eiIfFDEOLgnB1T7O_P7H_gRGbUWQakDN5lnC26L3';
const artistIds = [
  "5tvfyAT4aOIOkumo6vw1yL",
  "3IX32wm6CoEIYovZ0VcjBJ",
  "4iA6bUhiZyvRKJf4FNVX39",
  "1plObTufEAfeL1hk8Qz24v",
  "4YRxDV8wJFPHPTeXepOstw",
  "61JrslREXq98hurYL2hYoc",
  "2GoeZ0qOTt6kjsWW4eA6LS",
  "2ae6PxICSOZHvjqiCcgon8",
  "0oOet2f43PA68X5RxKobEy",
  "3eDT9fwXKuHWFvgZaaYC5v"
];

const url = `https://api.spotify.com/v1/artists?ids=${artistIds.join("%2C")}&include_groups=album,single`;

async function fetchArtistData() {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const { artists } = await response.json();
    const artistList = document.getElementById("artist-list");

    artists.forEach((artist) => {
      const artistCard = createArtistCard(artist);
      artistList.appendChild(artistCard);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function createArtistCard(artist) {
	  const artistCard = document.createElement("div");
  artistCard.classList.add("artist-card");

  const artistImage = document.createElement("img");
  artistImage.src = artist.images[0].url;

  const artistName = document.createElement("div");
  artistName.classList.add("artist-name");
  artistName.textContent = artist.name;

  const artistGenres = document.createElement("p");
  artistGenres.classList.add("artist-genres");
  artistGenres.textContent = artist.genres;

  const artistAlbums = document.createElement("div");
  artistAlbums.classList.add("artist-albums");

  // Fetch artist's albums and append them
  fetchArtistAlbums(artist.id, artistAlbums);

  artistCard.appendChild(artistImage);
  artistCard.appendChild(artistName);
  artistCard.appendChild(artistGenres);
  artistCard.appendChild(artistAlbums);

  return artistCard;
}

async function fetchArtistAlbums(artistId, artistAlbums) {
  try {
    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (albumsResponse.ok) {
      const albumsData = await albumsResponse.json();
      const albums = albumsData.items;

      albums.forEach((album) => {
        const albumName = document.createElement("div");
        albumName.textContent = album.name;
        artistAlbums.appendChild(albumName);
      });
    } else {
      console.error(`Error fetching albums for artist ${artistId}: ${albumsResponse.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
}

fetchArtistData();



