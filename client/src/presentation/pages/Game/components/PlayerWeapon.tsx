
class PlayerWeapon
{

   
    random : number = 0;
    playerHearts : number = 3;
    WeaponIndex : number = -1;
    displayWeaponImg : boolean = false;
    setTime : boolean = true;
    rocketXMove : number = 0;
    explosionSound : boolean = true;

    randomAction = () =>
    {
        if (this.playerHearts === 3)
            this.WeaponIndex =  Math.floor(Math.random() * 2) + 1 ;
        else
            this.WeaponIndex =  Math.floor(Math.random() * 3);
        // this.WeaponIndex =  Math.floor(Math.random() * 1);

    }

    
    
}

export default PlayerWeapon