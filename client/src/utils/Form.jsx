
const Form = ({children, ...rest})=>{
    const h = window.innerHeight-65;
    const mainContainerClass = `flex flex-col justify-center items-center min-h-[${h}px]`;
    return <div className={mainContainerClass}>
        <form {...rest}>
            {children}
        </form>
    </div>
}

export default Form