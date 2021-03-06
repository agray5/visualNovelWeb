const gController = () => {
    let graphics; //Graphics object
    let modes;
    let operations = new Map(); //contains operations and matching data for graphics state to render
    let player;

    return {
        init: (graphics_, player_) => {
            graphics = graphics_;
            player = player_;
            modes = graphics.getDivs();
            operations.set("load_page", player.getRoom()); // data can be a list [room, exitMsg], only one is assumed to be room
            operations.set("setInv", player.getInv()); //data should be am array of invmaps
            operations.set("updateInv", [null, false]); // data is [invItem, newItem], if newItem is not included it is assumed to be false
            operations.set("removeInv", null); // data is item
            operations.set("mode", "roam"); //set game mode
            operations.set("talking", null); // data is null if toggling off, but needs an actor to toggle on, special data "prev" and "next"
            operations.set("refresh_textArea", player.getRoom()); //data is the current room of the player
            operations.set("toggle_textArea", null); // doesnt need data
            operations.set("add_text", "text"); // data should be text to be added66
        },
        update: (operation, data = null) => {
            if (operation === "mode") {
                if(!modes.includes(data)){ //Can only set mode to an approved mode setting
                    warning("Warning: cannot set mode in graphics. Mode " + data + " is undefined.");
                    return false;
                }
            }
            
            if (operations.get(operation) === undefined) { //Can only set existing operations
                warning("Warning: cannot update graphics. " + operation + " is undefined");
                return false;
            }

            if(operation === "refresh_textArea"){//Refresh text area will always take the players current room, so there is no reason to have to specify it
                data = player.getRoom(); //data should always be players current room
            }

            

            operations.set(operation, data);
            graphics.render(operation, operations);
        }
    }
}

