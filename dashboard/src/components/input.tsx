import "./input.css";
export function Input(props: any) {
    return (
        <div className="input">
            <div className="title">{props.label}</div>
            <input className="inputField" size={40} maxLength={40} value={props.value} onChange={props.onChange} type={props.type} />
        </div>
    )
}