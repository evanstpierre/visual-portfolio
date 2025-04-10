

export default function DataInput({type="text", title="", locked, path, value, setValue}:{title:string, type:string; locked:boolean; path:string; value: any, setValue: (path: string, value: any) => void;}){
    return(<div className={`h-[35px] w-[275px] 2xl:w-[300px] bg-[#F5EFE7] rounded-md flex items-center  relative ${locked ? "opacity-50": "opacity-75"}` }>
        {title != "" &&
                <span className="absolute bottom-9 left-2 libre text-sm">{title}</span>
        
        }
        <input
        disabled={locked}
        type={type}
        value={value ?? ""}
        onChange={(e) => setValue(path, e.target.value)}
        className={`w-full px-2 overflow-hidden text-ellipsis whitespace-nowrap focus:outline-none libre text-md text-[#213555]`}
        />
        

        


    </div>);
}