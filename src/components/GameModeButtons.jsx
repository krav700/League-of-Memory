import { useEffect } from "react";
import "../styles/Buttons.css";

function GameModeButtons({ setGamemodeSkins }) {

    let onLoadGameMode = true;
    useEffect(() => {
        if (onLoadGameMode && localStorage.getItem("gamemodeSkins")) {
            onLoadGameMode = false;
            const gameModeCont = document.querySelector(".gamemode-container");
            if (localStorage.getItem("gamemodeSkins") == "false") {
                gameModeCont.children[0].classList.add('disabled');
                gameModeCont.children[1].classList.remove('disabled');
            } else {
                gameModeCont.children[0].classList.remove('disabled');
                gameModeCont.children[1].classList.add('disabled');
            }
        }
    }, []);

    return (
        <>
            <div className="gamemode-container button-container">
                <button
                    onClick={(e) => {
                        setGamemodeSkins(false);
                        e.target.classList.add("disabled");
                        e.target.parentElement.children[1].classList.remove("disabled");
                        localStorage.setItem("gamemodeSkins", false);
                    }}
                    className={'disabled'}
                    data-text={"Champions"}
                >
                    Champions
                </button>
                <button
                    onClick={(e) => {
                        setGamemodeSkins(true);
                        e.target.parentElement.children[0].classList.remove("disabled");
                        e.target.classList.add("disabled");
                        localStorage.setItem("gamemodeSkins", true);
                    }}
                    data-text={"Skins"}
                >
                    Skins
                </button>
            </div>
        </>
    );
}

export default GameModeButtons;
