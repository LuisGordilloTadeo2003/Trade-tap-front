import React from "react";
import ElementCard from "./ElementCard";
import BigSpinner from "../ui/BigSpinner";


const List = ({ data, tipo }) => {
    if (data == undefined) {
        return (
            <BigSpinner />
        );
    }

    console.log(data);

    return (
        <div>
            <div className="col-6">

            </div>
            <div className="col-6">

            </div>
            <div>
                {
                    data.map((item, index) => {
                        return <ElementCard key={item.id} item={item} index={index} tipo={tipo} />
                    })
                }
            </div>
        </div>
    );
}

export default List;