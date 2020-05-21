
const $POPUP = document.body;
const $NOTREADY = $POPUP.querySelector('aside');
let TAB_ID;

onPopupOpen();
$POPUP.addEventListener('click', onClick);

async function onPopupOpen() {
    TAB_ID = await getTabId();
    const response = await sendMessageToTab({ needNames: true }); // Expect array of list names
    if (!response) return;
    $NOTREADY.remove();
    response.names.forEach(addButton);
}

function onClick(event) {
    sendMessageToTab({ scrollTo: event.target.value }); // Send the target list's index
    window.close();
}

async function getTabId() {
    const [tab] = await browser.tabs.query({ currentWindow: true, active: true });
    return tab.id;
}

function addButton(name, index) {
    const $button = document.createElement('button');
    $button.textContent = name;
    $button.value = index;
    $POPUP.appendChild($button);
}

async function sendMessageToTab(message) {
    return browser.tabs.sendMessage(TAB_ID, message).catch(() => null);
}
