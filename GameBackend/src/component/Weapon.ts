import Ball from "./ball";

class WeaponTemplate
{
    alertY      : number = 0;
    // alertDirection : boolean = true;
    // ballHitAlert: boolean = false;
    // weaponIndex : number = -1
}


let moveAlert = (ball : Ball) =>
{
    if (ball.alertDirection === true)
        ball.alertY += 0.5;
    else
        ball.alertY -= 0.5;
    if (ball.alertY <= 0)
        ball.alertDirection = true;
    if (ball.alertY === 200 - 200 / 20)
        ball.alertDirection = false;
}

// let isBallHitTheAlert = (ball : Ball) =>
// {
//     if (ball.ballHitTheAlert === false && ball.ballDirection !== undefined && ball.ballFirst50Time >= 250)
//     {
//         if (ball.ballX >= 400 / 2 - 400 / 40 && ball.ballX <= 400 / 2 + 400 / 40)
//         {
//             if (ball.ballY >= ball.alertY && ball.ballY < ball.alertY + 400 / 20)
//             {
//                 if (ball.ballDirection !== undefined /* && ball.first50hit */)
//                     ball.ballHitTheAlert = true;
//                 ball.ballDirectionOnHit = ball.ballDirection;
//                 // if (ball.ballHitTheAlert === true)
//                 // {
//                 //     setTimeout(() => {
//                 //         ball.ballHitTheAlert = false;
//                 //         ball.ballDirectionOnHit = undefined;
//                 //     }, 20000)
//                 // }
//             }
//         }
//     }
// }

let weaponIndex = (ball : Ball) =>
{
    // // console.log('called :' , ball.ballHitTheAlert, ball.plyOneWeaponIndex, ball.plyTwoWeaponIndex)
    // if (ball.ballHitTheAlert && ball.plyOneWeaponIndex === -1 && ball.plyTwoWeaponIndex === -1)
    // {
    //     let index : number = Math.floor(Math.random() * 3);
    //     console.log('index :' , index);
    //     ball.plyOneWeaponIndex = index;

    //     ball.plyTwoWeaponIndex = index;
    //     ball.ballHitTheAlert = false
    // }
}
export default WeaponTemplate;

export { moveAlert,  weaponIndex}
