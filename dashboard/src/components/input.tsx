import "./input.css";
export function Input(props: any) {
    if (props.type === "button") {
        return (
            <div className="input">
                <div className="title"></div>
                <button className="buttonField">{props.name}</button>
            </div>
        )
    }

    return (
        <div className="input">
            <div className="title">{props.name}</div>
            <input className="inputField" size={40} maxLength={40} />
        </div>
    )
}