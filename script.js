jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/si_bm/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Justin Bieber ft Benny Blanco - Lonely",
                "duration": "2:38",
                "file": "V1"
            }, {
                "track": 2,
                "name": "24kGoldn - Mood",
                "duration": "2:30",
                "file": "V2"
            }, {
                "track": 3,
                "name": "Justin Bieber - Beauty And A Beat",
                "duration": "4:53",
                "file": "V3"
            }, {
                "track": 4,
                "name": "Justin Bieber - Holy",
                "duration": "5:29",
                "file": "V4"
            }, {
                "track": 5,
                "name": "Justin Bieber - One Time",
                "duration": "4:03",
                "file": "V5"
            }, {
                "track": 6,
                "name": "Post Malone - Rockstar",
                "duration": "4:02",
                "file": "V14"
            }, {
                "track": 7,
                "name": "Post Malone - Circle",
                "duration": "3:46",
                "file": "V13"
           }, {
                "track": 8,
                "name": "Paramore - Still Into You",
                "duration": "3:40",
                "file": "V12"
            }, {
                "track": 9,
                "name": "Pink Sweat$ - At My Worst",
                "duration": "3:05",
                "file": "Pink Sweat$ - At My Worst (Lyrics)"
            }, {
                "track": 10,
                "name": "Sia - Snowman [Official Video]",
                "duration": "2:52",
                "file": "Sia - Snowman [Official Video]"
            }, {
                "track": 11,
                "name": "Douglas e Vinícius - Figurinha - part. MC Bruninho",
                "duration": "3:33",
                "file": "Douglas e Vinícius - Figurinha - part. MC Bruninho"
            }, {
                "track": 12,
                "name": "Witt Lowry - Into Your Arms (feat. Ava Max) (Lyrics)",
                "duration": "3:07",
                "file": "Witt Lowry - Into Your Arms (feat. Ava Max) (Lyrics)"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});