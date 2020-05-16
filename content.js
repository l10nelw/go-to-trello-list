
const $board = document.getElementById('board');
let $names;

browser.runtime.onMessage.addListener(onMessageReceived);

async function onMessageReceived(message) {

    if (message.popup) {
        $names = [...$board.querySelectorAll('.list-header-name')];
        const names = $names.map($ => $.textContent);
        return { names };
    }

    if ('button' in message) {
        return scrollTo($names[message.button]);
    }

}

function scrollTo($) {
    $.scrollIntoView({ inline: 'center' });
}