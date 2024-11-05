'use client';

import Image from "next/image";
import prisma from "@/lib/prisma";
import {GetStaticProps} from "next";
import {FormEvent, useEffect, useReducer, useState} from "react";
import {renderForm, updateForm} from "@/lib/renderForm";
import {Check, checklist, fromJSONString} from "@/lib/checklist";
import {loadConfig} from "@/lib/conf";

export default function Home() {
    const [matchInfo, setMatchInfo] = useState("");
    const [checkList, setCheckList] = useState<Check[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [signed, setSigned] = useState("")

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/get-list', {
            method: 'POST',
            body: formData,
        })

        const data = await response.json()
        setMatchInfo(data.matchInfo);
        setCheckList(fromJSONString(data.checks))
        setSigned(data.signed)
        console.log(data)
    }

    useEffect(() => {
        updateForm(matchInfo, loadConfig().event!, checkList, setSubmitted);
    }, [matchInfo, checkList, submitted])

    return (
        <div>
            <h1>Pit List</h1>
            <form onSubmit={onSubmit}>
                <select name="m_type" required={true}>
                    <option value="qm">Qual</option>
                    <option value="sf">Semi</option>
                    <option value="f1m">Final</option>
                    <option value="pr">Practice</option>
                </select> <input type="number" name="m_num" required={true}/>
                <button type="submit">Set</button>
            </form>
            {renderForm(checkList, setCheckList, matchInfo, submitted, setSubmitted, signed, setSigned)}
        </div>
    );
}
