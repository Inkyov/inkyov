import React, {KeyboardEvent, ChangeEvent, useEffect, useState} from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAuth, LoginStatus } from "../Login/authslice";
import { getNotes, postNote } from "./NoteService";

type NoteType = {
  notesData: string,
  handleKeyUp: (event: KeyboardEvent<HTMLTextAreaElement>) => void,
  onChange: (e: ChangeEvent) => void
}

export const Note = () =>{
  const [notesData, setNotesData] = useState('');
  const auth = useAppSelector(selectAuth);
  const [timer, setTimer] = useState(setTimeout(() => {}, 0));

  useEffect(() => { get() }, [auth])

  if (auth.status !== LoginStatus.LOGGED_IN) return null;

  const {
    apiToken,
    user: { id: userId },
  } = auth;

  async function get() {
    const notesData = await getNotes(userId, apiToken).then(res => {
      return res.json()
    })

    setNotesData(notesData.note);
  }

  async function post(note: string) {
    const notesData = await postNote(userId, apiToken, note).then(res => {
      return res.json()
    })

    setNotesData(notesData.note);
  }

  function handleKeyUp(e: KeyboardEvent<HTMLTextAreaElement>) {
    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      post((e.target as HTMLTextAreaElement).value);
    }, 500)

    setTimer(newTimer)
  }

  function handleChange(event: ChangeEvent) {
    setNotesData((event.target as HTMLTextAreaElement).value);
  }

  return (
    <div>
      <NoteField notesData={notesData} handleKeyUp={handleKeyUp} onChange={handleChange} />
    </div>
  );
}

function NoteField({ notesData, handleKeyUp, onChange }: NoteType) {
  return <textarea onKeyUp={handleKeyUp} value={notesData} onChange={onChange} />;
}
