import './style/main.scss';

import { DemoGame } from './class/demo-game';
(function(){
    
    document.addEventListener('DOMContentLoaded', (event) => {
        var game = new DemoGame();
    });

})();