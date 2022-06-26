var notepad = document.getElementById('notepad')
var saveStatus = document.getElementById('saveStatus')
var currentTab
var storage = {}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

getCurrentTab().then(
    function(value) {
        currentTab = value.url
        console.log(currentTab)
        
        chrome.storage.local.get(currentTab, function(result) {
            if (result[currentTab] != undefined) {
                notepad.value = result[currentTab]
            }
        })

        function saveNotepad() {
            storage[currentTab] = notepad.value
            chrome.storage.local.set(storage)
            saveStatus.innerHTML = "Last saved: " + new Date().toLocaleTimeString()
            chrome.storage.local.get(currentTab, function(result) {
                console.log(`url: ${currentTab}`)
                console.log(`value that was just saved: ${result[currentTab]}`)
            })
        }
        setInterval(saveNotepad, 5000)
    }
)
