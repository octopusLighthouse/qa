import "./paginator.css";
import {
    Link,
} from "react-router-dom";
export function Paginator(props: any) {

    const renderPagesSelectorDivs = () => {
        const pagesDivs = [];
        for (let i = 50; i < 200; i+=50) {
            
            if (props.pageSize === i) {
                const linkFormed = `${props.base}page=${props.page}&pageSize=${i}`;
                pagesDivs.push(
                    <div className="paginator-pages-selected">
                        <Link className="naked" to={linkFormed}>
                            {i}
                        </Link>
                    </div>
                )
            }
            else {
                const linkFormed = `${props.base}page=${props.page}&pageSize=${i}`;
                pagesDivs.push(
                    <div className="paginator-pages">
                        <Link className="naked" to={linkFormed}>
                            {i}
                        </Link>
                    </div>
                )
            }
        }
        return pagesDivs;
    }

    const renderRepeatedDivs = () => {
        const divs = [];
        for (let i = 0; i < (props.pages/props.pageSize); i++) {

            const linkFormed = `${props.base}page=${i+1}&pageSize=${props.pageSize}`;
            if (props.page === i+1)
            {
                divs.push(<div className="pagination-buble-selected" key={i}>
                    <Link className="naked" to={linkFormed}>
                        {i + 1}
                    </Link>
                </div>);
            }else {
                divs.push(<div className="pagination-buble" key={i}>
                    <Link className="naked" to={linkFormed}>
                        {i + 1}
                    </Link>
                </div>);
            }
        }
        return divs;
      };

    return (
        <div className="paginator-main">
            Items per page:
            <div  className="paginator-spacer" />
            {renderPagesSelectorDivs()}
            <div className="paginator-splitter" />
            Pages:
            <div  className="paginator-spacer" />
            {renderRepeatedDivs()}
        </div>
    )
}