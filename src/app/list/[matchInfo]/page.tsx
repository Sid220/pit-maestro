'use client';

import {useEffect, useState} from "react";
import {renderForm, updateForm} from "@/lib/renderForm";
import {Check, fromJSONString} from "@/lib/checklist";

export default function List({params}: { params: { matchInfo: string } }) {
    const [checkList, setCheckList] = useState<Check[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [signed, setSigned] = useState("");
    let matchData = params.matchInfo.split("_");

    useEffect(() => {
        let form_data = new FormData();
        form_data.append("match_info", matchData[1]);
        form_data.append("m_event", matchData[0]);

        console.log(matchData);
        fetch('/api/get-list', {
            method: 'POST',
            body: form_data
        }).then((res) => {
            res.json().then((a) => {
                setCheckList(fromJSONString(a.checks));
                setSigned(a.signed);
            })
        })
    }, [])

    useEffect(() => {
        if (checkList.length == 0) {
            return;
        }
        updateForm(matchData[1], matchData[0], checkList, setSubmitted);
    }, [params.matchInfo, checkList, submitted, matchData])

    return (
        <div>
            <h1>Pit List</h1>
            {renderForm(checkList, setCheckList, matchData[1], submitted, setSubmitted, signed, setSigned, matchData[0])}
        </div>
    );
}