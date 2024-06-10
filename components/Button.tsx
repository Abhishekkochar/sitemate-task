export default function Button({handle, name}:ButtonParams){
    return(
        <button className="mt-2 m-3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" onClick={handle}>{name}</button>
    )
}

interface ButtonParams{
    handle:any,
    name:string
}