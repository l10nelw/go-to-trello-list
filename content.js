let $NAMES; // List-name elements on the board

browser.runtime.onMessage.addListener(receiveMessage);

async function receiveMessage(message) {
    // From popup when it opens
    if (message.needNames) {
        return { names: getNames() };
    }
    // From popup when a button is clicked; contains a name index
    if ('scrollTo' in message) {
        return scrollTo($NAMES[message.scrollTo]);
    }
}

function getNames() {
    $NAMES = document.body.querySelectorAll('.list-header-name');
    const names = [...$NAMES].map($ => $.textContent);
    return names;
}

function scrollTo($) {
    $.scrollIntoView({ inline: 'center' });
}