var rowId = 0;
addInputRow();

function disableSpan(input: HTMLSpanElement) {
    input.contentEditable = "false"
    input.classList.add('disabled');
}

function repeatedFocus(event: FocusEvent) {
    event.preventDefault();
    const input: HTMLSpanElement | null = document.getElementById(`editable${rowId}`);
    input!.focus();
}

function onSubmit(event: KeyboardEvent) {
    const input: HTMLSpanElement | null = document.getElementById(`editable${rowId}`);
    if (event.key === 'Enter') {
        var command: string = input!.textContent != null ? input!.textContent : "";
        if (!command.endsWith("\\")) {
            event.preventDefault();
            disableSpan(input!);
            command = command.split("\\").join("");
            print(command);
            console.log(command);
            input!.removeEventListener('blur', repeatedFocus);
            input!.removeEventListener('keydown', onSubmit);
            addInputRow();
        }
    }
}

function addInputRow() {
    const paragraph = document.createElement("p");
    const first = document.createElement("span");
    const second = document.createElement("span");
    const input = document.createElement("span");
    first.setAttribute("id", "first");
    first.textContent = "~";
    second.setAttribute("id", "second");
    second.textContent = "$";
    input.setAttribute("class", "editable");
    input.setAttribute("role", "textbox");
    input.setAttribute("id", `editable${++rowId}`)
    input.contentEditable = "true";
    paragraph.appendChild(first)
    paragraph.appendChild(second);
    paragraph.appendChild(input);

    document.body.appendChild(paragraph);

    input.addEventListener('blur', repeatedFocus);
    input.addEventListener('keydown', onSubmit);
    input.focus();
}

function print(text: string) {
    var p = document.createElement("p");
    p.textContent = text;
    document.body.appendChild(p);
}