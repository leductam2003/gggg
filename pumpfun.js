// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-05-25
// @description  try to take over the world!
// @author       You
// @match        *pump.fun/*
// @match        https://www.pump.fun/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pump.fun
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function createPhotonButton() {
        const targetDiv = document.querySelector('.w-\\[350px\\].grid.gap-4');
        if (targetDiv && !document.querySelector('.open-in-photon')) {
            const photonButton = document.createElement('button');
            photonButton.className = 'p-2 text-center rounded bg-blue-400 text-white open-in-photon';
            photonButton.textContent = 'Open in photon';
            photonButton.onclick = function() {
                window.open('https://photon-sol.tinyastro.io/lp' + window.location.pathname, '_blank');
            };
            targetDiv.appendChild(photonButton);
        }

    }
    function createTextarea() {
        const targetElement = document.querySelector('.w-\\[350px\\].grid.gap-4');
        if (targetElement && !document.querySelector('.check-bundle-response') &&  window.location.pathname.length > 30) {
            const textarea = document.createElement('textarea');
            textarea.value = "Checking..."
            textarea.className = 'check-bundle-response'
            textarea.style.width = '100%';
            textarea.style.height = '300px';
            textarea.style.marginTop = '20px';
            targetElement.appendChild(textarea);
            const token_address = window.location.pathname.replace('/', '')
            fetch('https://api.pumpv2.fun/api/v1/pumpfun/checkBundle/' + token_address)
                .then(response => response.json())
                .then(data => {
                if (data.length === 0){
                    textarea.value = "No Bundled Transaction found"
                }else{
                    let total_bundle_amount = 0;
                    let t_buy = 0;
                    for (let d of data) {
                        if (d.is_buy) {
                            t_buy++;
                            for (let trade of d.trades_info) {
                                if (trade.is_buy) {
                                    total_bundle_amount += trade.sol_amount;
                                }
                            }
                        }
                    }
                    textarea.value = `Total Bundle Transaction: ${data.length}\nTotal Amount Buy: ${total_bundle_amount.toFixed(2)} SOL \nTotal Buy Transaction: ${t_buy}\n` + JSON.stringify(data, null, 2);
                }
            })
                .catch(error => {
                console.error('Error fetching data:', error);
                textarea.value = 'Error fetching data: ' + error;
            });
        } else {
            console.error('Target element not found');
        }
    }


    // Check for the target div and add the button every 2 seconds
    setInterval(createPhotonButton, 1000);
    setInterval(createTextarea, 1000)
})();
