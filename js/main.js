document.addEventListener('DOMContentLoaded', function () {
    var currentVolume = 50;
    var metadataSource = 'http://jouluradio.pingtimeout.net/tunkki.php';
    var volumeEl = document.getElementsByClassName('volume-value')[0];
    var volumeLabelEl = document.getElementsByClassName('volume-label')[0];
    var songTitleEl = document.getElementsByClassName('song-title')[0];
    var songArtistEl = document.getElementsByClassName('song-artist')[0];
    var songAlbumEl = document.getElementsByClassName('song-album')[0];

    function updateMetadata() {
        $.get(metadataSource, function (data) {
            if (data.title) {
                songTitleEl.innerHTML = data.title;
            }
            if (data.artist) {
                songArtistEl.innerHTML = data.artist;
            }
            if (data.album) {
                songAlbumEl.innerHTML = data.album;
            }
        });
    }

    function updateVolume() {
        volumeLabelEl.innerHTML = currentVolume;
        volumeEl.style.height = currentVolume + '%';
    }

    document.getElementsByClassName('amplitude-volume-up')[0].addEventListener('click', function () {
        if (currentVolume >= 100) {
            return;
        }

        currentVolume += 10;
        updateVolume();
    });

    document.getElementsByClassName('amplitude-volume-down')[0].addEventListener('click', function () {
        if (currentVolume <= 0) {
            return;
        }

        currentVolume -= 10;
        updateVolume();
    });

    updateVolume();
    updateMetadata();
    setInterval(updateMetadata, 5000);

    Amplitude.init({
        songs: [
            {
                name: "Tanssipelaajien Jouluradio 2016",
                artist: "Artist",
                album: "Album",
                url:"http://taika.org:8000/jouluradio",
                live: true,
                cover_art_url: "http://jouluradio.pingtimeout.net/banner.png"
            }
        ],
        default_album_art: "http://jouluradio.pingtimeout.net/banner.png",
        volume: currentVolume / 100,
        volume_increment: 10,
        volume_decrement: 10
    });
});