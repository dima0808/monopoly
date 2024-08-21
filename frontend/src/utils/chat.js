export function handleKeyDown(event, handleSendMessage) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
    }
}

export function handleInputChange(event) {
    if (event.target.value.length > 250) {
        event.target.value = event.target.value.slice(0, 250);
    }
}