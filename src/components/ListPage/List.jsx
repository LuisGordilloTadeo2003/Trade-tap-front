import React from "react";
import ElementCard from "./ElementCard";


const List = ({ data, tipo }) => {
    return (
        <div>
            <div className="col-6">

            </div>
            <div className="col-6">

            </div>
            <div>
                {
                    data.map((item, index) => {
                        return <ElementCard item={item} index={index} tipo={tipo} />
                    })
                }
            </div>
        </div>
    );
}

export default List;