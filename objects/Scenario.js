import { Game } from "./Game";
import { Menu } from "./Menu";
import { Leaderboard } from "./Leaderboard";
import Logo from "./../assets/evaQode.png";
import { Name } from "./Name";

const loadLogo = () => {
    const logo = new Image();
    logo.src = Logo;
    return logo;
}

const mainMenuButtons = {
    buttons: [
        {
            text: "New game",
            event: "entername",
        },
        {
            text: "Stats",
            event: "showleaderboard",
        }
    ]
}

const nameButtons = {
    buttons: [
        {
            text: "Back",
            event: "showmainmenu",
        }
    ]
}


export const startScenario = async () => {
    const logo = await loadLogo();
    const mainMenu = new Menu(mainMenuButtons);
    const game = new Game(40);
    const leaderboard = new Leaderboard();
    const name = new Name(nameButtons);

    mainMenu.setLogo(logo);
    mainMenu.render();

    document.addEventListener("entername", () => {
        mainMenu.stop();
        setTimeout(() => { name.start(); }, 1);
    });

    document.addEventListener("startgame", () => {
        name.stop();
        game.start(name.name);
        name.name = "";
    });

    document.addEventListener("pausegame", game.gameStateToggle.bind(game));
    document.addEventListener("resumegame", game.gameStateToggle.bind(game));


    document.addEventListener("exitgame", () => {
        game.popup.reset();
        game.reset();
        mainMenu.start(true);
    });

    document.addEventListener("finishgame", () => {
        game.popup.reset();
        game.reset();
        setTimeout(() => {
            mainMenu.start(true);
        }, 3000);
    });

    document.addEventListener("showleaderboard", () => {
        mainMenu.stop();
        leaderboard.load();
        leaderboard.render();
    });

    document.addEventListener("showmainmenu", () => {
        name.stop();
        leaderboard.stop();
        mainMenu.start();
    })

}