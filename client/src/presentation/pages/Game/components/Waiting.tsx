import './Waiting.css'
import UserInfo from './UserInfo';
// import { io, Socket } from 'socket.io-client';
import { tabId as waitingTabsId } from './App'
import { useEffect } from 'react';
import { Howl, Howler } from 'howler';
import { useJoinMatchGameMutation } from 'gql/index';
import { useMatchWaitingListSubscription} from "gql/index";

Howler.volume(1.0);

interface waitingProps 
{
    playerOne: UserInfo;
    playerTwo: UserInfo | undefined;
    updateRobotOpetion: (val: boolean) => void;
    updateMatchId: (val: string) => void;
    updatePlayerTwo: (newPlayWithRobot: boolean, newTabId: string, newMatchId: string, newMatchWager: number,
        newModePlaying: number, newUserName: string, newUserAvatar: string, newUserLogo: string, newMatchWon: number,
        newBestWinStreak: number, newMatchPlayed: number, newLevel: number, newTournentPlayed: number,
        newTournentWon: number, newPlayWithMouse: number, usrid : number) => void;
}


let Waiting = ({ playerOne, playerTwo, updateRobotOpetion, updateMatchId, updatePlayerTwo }: waitingProps) => 
{
    const serverUrl: string = 'ws://localhost:4055';
    // let socket: Socket | null = null;
    let plyOneImg: HTMLElement | null = null;
    let plyTwoImg: HTMLElement | null = null;
    let PlayWithRobot: HTMLElement | null = null;
    let TheSwitch: boolean = false;
    let playersImages: string[] = ["/images/broko.jpg", "/images/flamingo.jpg", "/images/franky.jpg", "/images/Mihawk.jpg", "/images/paji.jpg", "/images/sabo.jpg", "/images/usopp.jpg", "/images/zoro.jpg", "/images/ice.jpg", "/images/bigMama.jpg", "/images/illumi.jpg", "/images/miluki.jpg", "/images/pakunda.jpg", "/images/shalnark.jpg", "/images/shizuku.jpg", "images/corollo.jpg", "/images/kurapika.jpeg", "/images/sanji.jpg", "/images/chopper.jpg", "/images/nami.jpg", "/images/luffy.jpg", "/images/perona.jpg", "/images/robin.jpg"];
    let index: number = 0;
    let playerMode : string;
    let joinGame;

    const [joinMatch] = useJoinMatchGameMutation();
    //Use the subscription hook
    const { data: subscriptionData, loading, error } = useMatchWaitingListSubscription({
        variables: {
            userId: playerOne.userId,
        },
    });



    // useEffect(() => {
    //     console.log( "This is changed: ", subscriptionData);
    // }, [subscriptionData])

    
    switch (playerOne.modePlaying) {
        case 1:
            playerMode = 'classic';
            break;
        case 2:
            playerMode = "sandstorm";
            break;
        case 3:
            playerMode = 'lastPong';
    }

    useEffect(() => 
    {
        const fetchData = async () => 
        {
            try 
            {
                joinGame = await joinMatch(
                {
                    variables: {
                        transferFundsInput: {
                            userId: playerOne.userId,
                            betAmount: playerOne.matchWager,
                        },
                        JoinMatchmakingInput: {
                            userId: playerOne.userId,
                            matchType: playerMode,
                        },
                    },
                });
                console.log('player send mutation to join the game:', joinGame);
            }
            catch (error) 
            {
                console.error('Error during joinMatch:', error);
            }
        };

        fetchData();
    }, []);
 


 
   
    // let slideSound: any = new Howl({
    //     src: ['/Sounds/slideImageSoundEffect.mp3'],
    //     onload: () => {
    //         console.log('Audio loaded successfully');
    //         // You can play the sound or perform other actions here
    //     },
    //     onloaderror: (error: any) => {
    //         console.error('Error loading audio:', error);
    //     },
    // });

    // plyOneImg = document.getElementById("WaitingAvatarR1");
    // plyTwoImg = document.getElementById("WaitingAvatarR2");
    // PlayWithRobot = document.getElementById("robotReq");

    // useEffect(() => {
    //     const checkDocLoaded = () => {
    //         if (plyOneImg === null) {
    //             setTimeout(() => {
    //                 plyOneImg = document.getElementById("WaitingAvatarR1");
    //                 plyTwoImg = document.getElementById("WaitingAvatarR2");
    //                 PlayWithRobot = document.getElementById("robotReq");
    //                 plyOneImg?.setAttribute('src', playerOne.userAvatar);
    //             }, 500);
    //         }
    //     }
    //     checkDocLoaded();

    // }, [plyOneImg])

    // useEffect(() => {
    //     const changeAvatar = () => {

    //         if (TheSwitch !== true) {
    //             setTimeout(() => {
    //                 plyTwoImg?.setAttribute('src', playersImages[index]);
    //                 slideSound.play();
    //                 index++;
    //                 if (index === playersImages.length)
    //                     index = 0;
    //             }, 100)
    //         }
    //         else {
    //             clearInterval(intervalId);
    //         }
    //     }
    //     const intervalId = setInterval(changeAvatar, 100);

    // }, [TheSwitch])

    // document.addEventListener('DOMContentLoaded', function () {
    //     plyOneImg?.setAttribute('src', playerOne.userAvatar);
    //     plyTwoImg?.setAttribute('src', "/images/question-mark.jpeg");
    // });

    // let setRobotOpetion = (val: boolean) => {
    //     updateRobotOpetion(val);
    // }

    // let hideRobotOpetiondiv = () => {
    //     if (PlayWithRobot)
    //         PlayWithRobot.style.display = 'none';

    // }
    console.log("Player one : ", playerOne.userId);
    useEffect(() => 
    {
        //console.warn('Subscription structure :', subscriptionData);
        if (subscriptionData && subscriptionData.matchWaitingList) 
        {
            const { matchWaitingList } = subscriptionData;
            console.log('Subscription data:', matchWaitingList);
        }
        else
            console.warn('Subscription data is null:', subscriptionData);

        },[subscriptionData])

    if (loading) 
        return <p >Loading...</p>;
    else if (error) 
        return <p>Error occurred</p>;
    else
    {
        return (
            <div className='WaitingContainer'>
                <div className='WaitingState'>
                    <p>Wating for another player!</p>
                </div>
                <div className="WaitingVs">
                    <div className="WaitingFlashLight"><p>VS</p></div>
                </div>
                <div className='WaitingCoins'>
                    {/* <p>1000 &#128176;</p> */}
                </div>
                <div className='WaitingPlayer1'>
                    <div className='WaitingPlyInside1'>
                        {/* <p className="winLose"> </p> */}
                        <div className="WaitingAvatarR1Cover">
                            <div className="WaitingAvatarR1"><img id="WaitingAvatarR2" src="/images/question-mark.jpeg" alt="Avatar" ></img></div>
                        </div>
                        <div className='WaitingPlayerName1'>
                            <p>{playerTwo?.userName}</p>
                        </div>
                    </div>
                </div>
                <div className='playWithRobot' id="robotReq" >
                    <p>No player found online <br />if you want to play with Robot click Yes <br />otherwize you will wait until a new player come online</p>
                    <div className='WaitingBtn'>
                        {/* <button onClick={() => setRobotOpetion(true)}>Yes</button> */}
                        {/* <button onClick={() => hideRobotOpetiondiv()}>No</button> */}
                    </div>
                </div>
                <div className='WaitingPlayer2'>
                    <div className='WaitingPlyInside2'>
                        {/* <p className="winLose">Winner</p> */}
                        <div className="WaitingAvatarR2Cover">
                            <div className="WaitingAvatarR2"><img id="WaitingAvatarR1" src="/images/question-mark.jpeg" alt="Avatar"></img></div>
                        </div>
                        <div className='WaitingPlayerName2'>
                            <p>{playerOne.userName}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Waiting;


    // socket = io(serverUrl, { path: '/game-container', transports: ['websocket'], query: { waitingTabsId } });

    // socket.on('connect', () => {
    //     console.log(`Connected to WebSocket server from waiting page`);
    //   });

    // socket.on('disconnect', () => {
    //     console.log(`Waiting page disconnected from WebSocket server `);
    //   });

    // socket.emit('updatePlayerObject', playerOne);

    // socket.emit('matchingRequest', playerOne);

    // socket.on('machingResponse', (player : UserInfo | undefined) : void =>
    // {
    //     setTimeout(() => 
    //     {
    //         TheSwitch = true;
    //         setTimeout( () =>
    //         {
    //             if (player === null)
    //             {
    //                 plyTwoImg?.setAttribute('src', "/images/question-mark.jpeg");
    //                 setTimeout(() => 
    //                 {
    //                     console.log('match id ', playerOne.matchId)
    //                     if (PlayWithRobot)
    //                         PlayWithRobot.style.display = 'inline-block';
    //                 }, 100);
    //             }
    //             else if (player)
    //             {
    //                 if (player)
    //                 updatePlayerTwo(player?.playWithRobot, player?.tabId, player?.matchId, 
    //                 player?.matchWager, player?.modePlaying, player?.userName, player?.userAvatar,
    //                 player?.userLogo , player?.matchWon, player?.bestWinStreak, player?.matchPlyed,
    //                 player?.level, player?.tournentPlayed, player?.tournentWon, player?.playWithMouse, player?.userId);
    //                 if (playerTwo)
    //                 {
    //                     plyTwoImg?.setAttribute('src', playerTwo.userAvatar);
    //                     console.log('The hidden match id is ', playerOne.matchId , playerTwo.matchId);
    //                     updateMatchId(playerTwo.matchId)
    //                 }
    //             }

    //         }, 500)
    //     }, 3000);// 3s for switching images 
    // });    
    //

    //