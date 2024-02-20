import React from "react";
import WorkersRankingTable from "./WorkersRankingTable";

const RankingTable = () => {
    return (
        <div className="col-md-4 d-flex justify-content-start border-start border-end border-color">
            <table>
                <thead>
                    <tr className="mb-4">
                        <th><h3>TOP 10 TRABAJADORES DEL MES</h3></th>
                    </tr>
                </thead>
                <tbody>
                    <WorkersRankingTable />
                </tbody>
            </table>
        </div>
    );
}

export default RankingTable;