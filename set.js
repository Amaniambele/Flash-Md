const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVA2WjQ1SzBCTVBUQWVNVm1SMmZKdG9IdmdlTHBSWHhwa2FmV0xWUW0xVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUhVTEJ5Q0IrMnJKbWkvOWQ4c2VOUXVNUFBJNHd3N3VnZm9naFpINUZUYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtTElGN3dTdDlISVVKa1YvWHI5RkdHVHZHU2FCQTFCaXc2NzBhZ01nVFhrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaZGg0RnJJa3Bkc2pxMWxXVWlvcHZERktuVW1vNWhxcVVrZGZ3OVRKM1dzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJDblJBeDRlWkVJMTJRMUwwcUcveTlDSHB3N2VUT0FuWXE2d1JqcEpqbmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik11Z1lVQ2dPekdjWmZ1L2FHaUlsNmdoK05rcnA1K0haY1JyZk5yRVRqVEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkhaT2M5ZXRKUEsvdUh0QnVkSUxJVWhKdlJYT2xBeTFLTktEN3BVdkRuaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibnVNMFpMTTNESCtiU3Z4OXBERkc4MzVoTTM4ZFdnT1IzNUtqR1BSUC9tRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IisyYzdHZm83MGZFbmhQNUdiVjlTZmJEYUxYK1JSNmJVMkgxcm1sc1pUVjQzT2VJSW1OcGNtOE1hTGxEcXBGT2FKZExmYkNHeU5WWlJvbExoMFdNWGhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIzLCJhZHZTZWNyZXRLZXkiOiJxeGtPTFg4a2Zqd3R2SHlEb29PUitVVXFYcUx0MWhySzNtSy85Wlo4dEJ3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqdldJQTg3UlNEMjZTei1ZU0ZraGJRIiwicGhvbmVJZCI6IjBkZWJjNGZkLWI4NTYtNDE0MC05YzQ3LTZmY2Y4YjlkODVlMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGRmpObGk2ZUJxMVFGaSsyRVFNQVB4RVFlekU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDdkQ2dKMjFKejZSQ0lEeTZmaEFCaHJaS2RRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlM0TVJHWDFHIiwibWUiOnsiaWQiOiIyNTU2OTY0OTc3MDk6NDVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQTEgUGhvdG9ncmFwaGVyIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPRFZnWndDRUl6OXBMY0dHQ01nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJOeDdhYm1jTVhqaTdNS0daQVFWdFBRc3RQaG95c0h2T3dXMnlWSkZCREg0PSIsImFjY291bnRTaWduYXR1cmUiOiJUNmNONE1kdWUyOGhWbitEQlVRUmVCSHIvZ1VpWmZLc05nbHhiaDZlTzBBSkZzUDVyaHdiYUF5UXNzOFlhaEtVUkZKVC9KcXkwODlmd3hjODR2Z0tEdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNjcvQU84blZ3V1Y1dEsvNDdhSGZEcU9ZSTdXVzI0QVZiQVZUMUlHUVhwSUY3ck0xSVZWcG9hc1dCWmgxZkxxaXAvTXJaTFVNNWwwQmJ2SGF1aURiZ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2OTY0OTc3MDk6NDVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVGNlMm01bkRGNDR1ekNobVFFRmJUMExMVDRhTXJCN3pzRnRzbFNSUVF4KyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNjU2MTk0NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLdFQifQ==',
    PREFIXES: (process.env.PREFIX || '*').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
