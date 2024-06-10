export default function Input({label, placeholder, value, handle}:InputParams){
    return(
    <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">{label}</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline0' 
        placeholder={placeholder}
        value={value}
        onChange={handle}
        required
        />
    </div>
)}

interface InputParams{
    label:string,
    placeholder:string,
    value:string,
    handle:any
}