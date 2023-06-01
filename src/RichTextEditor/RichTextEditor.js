import React, { useRef } from 'react'
import JoditEditor from 'jodit-react'

export default function RichTextEditor({setValue}) {

    const editor = useRef(null)

  return (
    <div>
        <JoditEditor ref={editor} onChange={(event)=>{console.log(event)}}/> 
    </div>
  )
}

