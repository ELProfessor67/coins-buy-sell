import cron from 'node-cron';
import UserModel from '../models/user.js';

const increatCoin = (balance) => {
    if (balance < 119 && balance >= 59) {
        return 1; // Return 1 if balance is between 59 and 118
    } else if (balance < 178 && balance >= 119) {
        return 2; // Return 2 if balance is between 119 and 177
    } else if (balance < 238 && balance >= 178) {
        return 3; // Return 3 if balance is between 178 and 237
    } else if (balance >= 238) {
        return 4; // Return 4 if balance is 238 or more
    } else {
        return 0; // Return 0 if balance is less than 59
    }
};

const handleCrement = async () => {
    const users = await UserModel.find();
    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        if(user.balance){
            const coinsToIncrement = increatCoin(user.balance);
            user.balance += coinsToIncrement
            await user.save()
        }
        
    }
}

export const initIncrementCron = () => {
    cron.schedule("0 0 * * *", handleCrement);
}