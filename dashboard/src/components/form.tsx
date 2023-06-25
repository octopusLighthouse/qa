import "./form.css";
import { Input } from "./input";
export function Form(props: any) {
    return (
        <div>
            <Input name="Email"/>
            <Input name="Password"/>
            <Input name="Sign In to your account" type="button" onClick={props.onClick} />
        </div>
    )
}