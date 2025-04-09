


export default function ParagraphInput({id,text, setText, locked}:{id:number; text:string; setText: (text: string, id: number) => void; locked:boolean}){
    return(
        <div 
            key={id}
            className={`bg-[#F5EFE7] w-[275px] 2xl:w-[300px] rounded-md flex justify-center relative ${locked? "opacity-50": "opacity-75"}`}
        >
            <textarea 
            readOnly={locked}
             value={text}
             onChange={(e) => setText(e.target.value, id)}
             rows={7}
             className="w-full p-3 focus:outline-none libre text-xs resize-none "
            >   
            </textarea>
            <span className={`absolute bottom-3 right-3 libre ${(text.length > 200)? "text-[#7D0A0A]":"" }`}
            style={{ fontSize: '10px' }}>{200 - text.length}  </span>
        </div>
    );
}