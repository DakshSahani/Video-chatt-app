const Input = ({type, id, state, label})=>{
    return <div className='block m-4 min-w-[400px] flex justify-between'>
        <label htmlFor={id}>{label}</label>
        <input
            className="text-black min-w-[300px]" 
            type={type}
            id={id}
            value={state.value}
            onChange={(e)=>{state.set(e.target.value)}}
        />
    </div>
}

export default Input;