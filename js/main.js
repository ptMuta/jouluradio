var metadataSource = 'http://jouluradio.pingtimeout.net/tunkki.php';

function updateMetadata() {
    $.get(metadataSource, function (data) {
        console.log('läcä', data);
    });
}

updateMetadata();
setInterval(updateMetadata, 5000);