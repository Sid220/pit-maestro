'use client';

import {useEffect, useState} from "react";
import {renderForm, updateForm} from "@/lib/renderForm";
import {Check, fromJSONString} from "@/lib/checklist";

export default function List({params}: { params: { matchInfo: string } }) {
    const [checkList, setCheckList] = useState<Check[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [signed, setSigned] = useState("")

    useEffect(() => {
        let form_data = new FormData();
        form_data.append("match_info", params.matchInfo);

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
        updateForm(params.matchInfo, checkList, setSubmitted);
    }, [params.matchInfo, checkList, submitted])

    return (
        <div>
            <h1>Pit List</h1>
            {renderForm(checkList, setCheckList, params.matchInfo, submitted, setSubmitted, signed, setSigned)}
        </div>
    );
}