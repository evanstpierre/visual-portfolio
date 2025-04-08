import { useState } from "react";


export default function TextInput({type, placeholder, title="",}:{title:string, type:string,placeholder:string}){
    // const [val, setval] = useState(placeholder);

    return(  
    <div className="relative bg-[#F5EFE7] opacity-75 w-[200px] h-[35px] rounded-md mt-5">
       { title != "" && <div className="absolute  bottom-9 left-2">
            <span className="libre">{title}</span>
        </div>}
        <input
            type={type}
            defaultValue={placeholder}
            // onChange= {(e) => setval(e.target.value)}
            className="bg-transparent focus:outline-none ml-2  opacity-75 font-libre w-full h-30px mt-3"
        >
        </input>
    </div>    
    );
}