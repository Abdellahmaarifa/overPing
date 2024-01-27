import { Howl, Howler } from "howler";
import p5Types from "p5";
import GameContainer from "./gamecontainer";
import Game from "./gameInstance";

class SoundsClass {
  muteSound: boolean = true;
  soundButton: p5Types.Element | null = null;

  //racket sound and its adjusment variables
  racketSound: any;
  isTap: number = 0;

  //goal sound and its variables
  goalSound: any;
  //opponent goal sound
  opponentGoalSound: any;
  isOppGoal: boolean = false;

  // top buttom rebound
  topButtomReboundSound: any;
  isHitTopOrButtom: number = 0;

  // win the game
  winSound: any;
  // lose the game
  loseSound: any;

  //modes music
  mode1Music: any;
  mode2Music: any;
  mode3Music: any;

  isMusicPlayed: boolean = false;

  //mode 3 animation sounds
  rocketLanding: any;
  rocketWhoosh: any;
  switchSound: any;
  heartSound: any;
  alertHitSound: any;
  freezeSound: any;

  loadSounds = () => {
    this.racketSound = new Howl({
      src: ["/Sounds/racketRebound.wav"],
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });

    this.goalSound = new Howl({
      src: ["/Sounds/goal.wav"],
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });

    this.opponentGoalSound = new Howl({
      src: ["/Sounds/opponentGoal.wav"],
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });

    this.topButtomReboundSound = new Howl({
      src: ["/Sounds/topButtomRebound.mp3"],
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });

    this.winSound = new Howl({
      src: ["/Sounds/successGameOver.wav"],
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });

    this.loseSound = new Howl({
      src: ["/Sounds/loseGameOver.wav"],
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });

    this.mode1Music = new Howl({
      src: ["/Sounds/mode1Music.mp3"],
      loop: true,
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });

    this.mode2Music = new Howl({
      src: ["/Sounds/mode2Music.mp3"],
      loop: true,
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });

    this.mode3Music = new Howl({
      src: ["/Sounds/mode3Music.mp3"],
      loop: true,
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });

    this.rocketLanding = new Howl({
      src: ["/Sounds/rocketLanding.wav"],
      loop: true,
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });

    this.rocketWhoosh = new Howl({
      src: ["/Sounds/rocketWhoosh.wav"],
      loop: true,
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });

    this.switchSound = new Howl({
      src: ["/Sounds/slideImageSoundEffect.mp3"],
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });
    this.heartSound = new Howl({
      src: ["/Sounds/heart.wav"],
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });
    this.alertHitSound = new Howl({
      src: ["/Sounds/alertHit.wav"],
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });
    this.freezeSound = new Howl({
      src: ["/Sounds/freeze.wav"],
      onload: () => {
        // console.log('Audio loaded successfully');
      },
      onloaderror: (error: any) => {
        console.error("Error loading audio:", error);
      },
    });
  };

  changeSoundOpetion = () => {
    this.muteSound = !this.muteSound;
    if (this.muteSound) {
      // Howler.volume(1.0)
      Howler.mute(false);
      if (this.soundButton) this.soundButton.html("mute");
    } else {
      // Howler.volume(0.0)
      // Howler.stop();
      Howler.mute(true);
      if (this.soundButton) this.soundButton.html("unmute");
    }
  };

  displayModeMusic = (mode: number) => {
    if (mode === 1 && this.muteSound && this.isMusicPlayed === false) {
      this.isMusicPlayed = true;
      this.mode1Music.play();
    }
    if (mode === 2 && this.muteSound && this.isMusicPlayed === false) {
      this.isMusicPlayed = true;
      this.mode2Music.play();
    }
    if (mode === 3 && this.muteSound && this.isMusicPlayed === false) {
      this.isMusicPlayed = true;
      this.mode3Music.play();
    }
  };
  displayRacketReboundSound = (
    gameCapsule: GameContainer,
    game: Game,
    ballX: number,
    ballY: number,
    ballWH: number
  ) => {
    if (
      gameCapsule.init &&
      ballX - ballWH < game.p5.width / 80 &&
      this.isTap === 0 &&
      gameCapsule.ball.ballDirection !== undefined
    ) {
      if (
        ballY > game.rightRacket.racketY &&
        ballY < game.rightRacket.racketY + game.rightRacket.racketH
      ) {
        this.racketSound.play();
        this.isTap++;
      }
      if (
        gameCapsule.playerNumber === 3 &&
        ballY > game.leftRacket.racketY &&
        ballY < game.leftRacket.racketY + game.leftRacket.racketH
      ) {
        this.racketSound.play();
        this.isTap++;
      }
    } else if (
      gameCapsule.init &&
      ballX + ballWH > game.p5.width - game.p5.width / 80 &&
      this.isTap === 0 &&
      gameCapsule.ball.ballDirection !== undefined
    ) {
      if (
        ballY > game.rightRacket.racketY &&
        ballY < game.rightRacket.racketY + game.rightRacket.racketH
      ) {
        this.racketSound.play();
        this.isTap++;
      }
    } else if (
      gameCapsule.init &&
      ballX - ballWH >= game.p5.width / 80 &&
      ballX + ballWH < game.p5.width - game.p5.width / 80
    ) {
      this.isTap = 0;
    }
  };

  displayTopBottomRebound = (game: Game, ballY: number, ballWH: number) => {
    if (
      ballWH &&
      (ballY + ballWH >= game.p5.height || ballY - ballWH <= 0) &&
      this.isHitTopOrButtom === 0
    ) {
      this.topButtomReboundSound.play();
      this.isHitTopOrButtom++;
    } else if (ballY + ballWH < game.p5.height && ballY - ballWH > 0)
      this.isHitTopOrButtom = 0;
  };
}

export default SoundsClass;
