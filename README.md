# Intania Jukebox

The web-based Spotify Web API music player for Intania Chula, powered by raspberry pi.

<p align="center">
  <image width="750" alt="System Architecture" src="./docs/images/architecture.png">
</p>

## Features

### Music Selector

Music Selector Interface             |  Search Functionality
:-------------------------:|:-------------------------:
![Queue](./docs/images/queue.png)  |  ![Search](./docs/images/search.png)

### Music Player

<image width="300" alt="Music Player" src="./docs/images/player.png">

Play music from Spotify Web API, on the web (for Spotify Premium users only).

<image width="300" alt="Speaker" src="./docs/images/speaker.jpg">

The music is played through a speaker connected to the Raspberry Pi.

### Keypad

<image width="300" alt="Keypad" src="./docs/images/pico_keypad.jpg">

Control the music player using a Piminori Pico RGB Keypad.

## Apps

### Frontend

The frontend is a web-based music player that allows users to select songs from a list and play them. The frontend is built using NextJS.

[Frontend](./frontend)

### Backend (Music Manager)

The backend service for the Intania Jukebox app.

[Backend](./music-manager)

### KeyPad

The keypad service for the Intania Jukebox app.

[KeyPad](./keypad)

## Disclaimer

This project is a part of the Intania Chula project, which is a project for the Software Development course at Chulalongkorn University. This project is not intended for commercial use.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
