import "./button.css";
export function Button(props: any) {
    return (
        <div className="groud">
            <div className="title"></div>
            <button className="buttonField" onClick={props.onClick} >{props.label}</button>
        </div>
    )
}