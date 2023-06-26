import "./header.css";
export function Header() {
    return (
        <div className="main">
            <div className="logo">CQA</div>
            <div className="items">Statistics</div>
            <div className="items-selected">Scenarios</div>
            <div className="items">Tests</div>
            <div className="items">AI support</div>
            <div className="items">Settings</div>
            <div className="items">Environments</div>
        </div>
    )
}