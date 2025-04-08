
export default function TextInput({type, placeholder, title="",}:{title:string, type:string,placeholder:string}){
    // const [val, setval] = useState(placeholder);

    return(  
    <div className="relative bg-[#F5EFE7] opacity-75 w-[275px] 2xl:w-[300px] h-[35px] rounded-md">
       { title != "" && <div className="absolute  bottom-9 left-2">
            <span className="libre text-sm">{title}</span>
        </div>}
        <input
            type={type}
            defaultValue={placeholder}
            className="bg-transparent focus:outline-none ml-2  opacity-75 font-libre w-full h-30px mt-3 px-2 overflow-hidden  text-ellipsis whitespace-nowrap"
        >
        </input>
    </div>    
    );
}